/* Git Artifact Pages — ドキュメントサイト共通スクリプト
   すべて任意の強化です。JavaScriptが無効でも、全ページと図の全要素を読めます。
   <html lang> で日本語と英語の文言を切り替えます。
   このサイトが自分の assets/ にこのファイルを持ち、直接編集します。他のサイトの assets/ とは共有しません。 */
(() => {
  'use strict';

  const inFrame = (() => { try { return window.parent !== window; } catch { return true; } })();
  const lang = (document.documentElement.lang || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
  const T = {
    ja: { copy: 'コピー', copied: 'コピーしました', selectToCopy: '選択してコピー', moreColumns: '横にスクロールすると、ほかの列を見られます →', play: '自動再生', pause: '一時停止', playOff: '自動再生（動きを減らす設定のため無効）', scene: '場面' },
    en: { copy: 'Copy', copied: 'Copied', selectToCopy: 'Select to copy', moreColumns: 'Scroll sideways to see more columns →', play: 'Play', pause: 'Pause', playOff: 'Play (off: reduced motion is on)', scene: 'Scene' },
  }[lang];

  /* ── 0. テーマ ─────────────────────────────
     閲覧アプリは <html data-theme="light|dark"> でテーマを持ちます。iframe の color-scheme は
     ブラウザによっては文書側の prefers-color-scheme に届かないため、同一オリジンで読めるときは
     アプリのテーマを写し、切り替えにも追従します。読めなければ prefers-color-scheme のままです。 */
  if (inFrame) {
    try {
      const appRoot = window.parent.document.documentElement;
      const sync = () => {
        const theme = appRoot.dataset.theme;
        if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
      };
      sync();
      new MutationObserver(sync).observe(appRoot, { attributes: true, attributeFilter: ['data-theme'] });
    } catch { /* 別オリジン：prefers-color-scheme にまかせる */ }
  }

  /* ── 1. 兄弟ページへの移動 ─────────────────────────────
     閲覧アプリでは、このページは iframe（/_artifacts/<site>/…）の中に表示されます。
     そのままリンクを辿ると、アプリのURL・サイドバー・検索対象が現在の文書とずれるため、
     同一オリジンの場合に限り、アプリ側の論理ルート（/<site>/…）へ移動します。
     単独で開いたとき（生ファイルやローカルのHTTPサーバー）は通常のリンクとして動きます。 */
  if (inFrame) {
    const marker = '/_artifacts/';
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      try {
        const to = new URL(anchor.href, location.href);
        if (to.origin !== location.origin || !location.pathname.includes(marker)) return;
        if (to.pathname === location.pathname) return; // 同じ文書内のアンカー
        const at = to.pathname.indexOf(marker);
        if (at !== 0) return;
        // 読者が確定した全文検索（?q=）は、同じサイト内の移動では引き継ぐ。
        const target = new URL('/' + to.pathname.slice(marker.length) + to.search + to.hash, window.top.location.origin);
        const query = new URLSearchParams(window.top.location.search).get('q');
        const sameSite = window.top.location.pathname.split('/')[1] === target.pathname.split('/')[1];
        if (query && sameSite && !target.searchParams.has('q')) target.searchParams.set('q', query);
        const route = target.pathname + target.search + target.hash;
        const top = window.top;
        if (sameSite && window.parent === top) {
          try {
            const navigation = new top.CustomEvent('artifact-pages:navigate:v1', {
              detail: { source: window, href: route }, cancelable: true,
            });
            if (!top.dispatchEvent(navigation)) {
              event.preventDefault();
              return;
            }
          } catch { /* 古い閲覧アプリなど：通常の遷移に戻す */ }
        }
        top.location.assign(route);
        event.preventDefault();
      } catch { /* 別オリジンなど：通常のリンク動作にまかせる */ }
    });
  }

  /* ── 2. コピー ボタン ── */
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = button.closest('.term')?.querySelector('pre');
      if (!source) return;
      const text = [...source.querySelectorAll('[data-copy]')].map((line) => line.textContent).join('\n')
        || source.textContent.replace(/^\$ /gm, '');
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = T.copied;
      } catch {
        button.textContent = T.selectToCopy;
        const range = document.createRange();
        range.selectNodeContents(source);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setTimeout(() => { button.textContent = T.copy; }, 1800);
    });
  });

  /* ── 3. 時間の帯（.bn）：実際にあふれるときだけ、図の中で横にスクロールできるようにする ──
     あふれている間は figcaption の .fg-scroll（「横にスクロール」の注記）を出し、枠をキーボードでも動かせるようにする。 */
  const bands = [...document.querySelectorAll('.fg .bn')];
  if (bands.length) {
    const update = (band) => {
      const scrollable = band.scrollWidth > band.clientWidth + 1;
      band.closest('.fg')?.classList.toggle('is-scrollable', scrollable);
      if (scrollable) band.setAttribute('tabindex', '0'); else band.removeAttribute('tabindex');
    };
    const refresh = () => bands.forEach(update);
    refresh();
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(refresh);
      bands.forEach((band) => observer.observe(band));
    } else {
      addEventListener('resize', refresh);
    }
  }

  /* ── 3a. 横にあふれる表（.table-wrap） ──
     表が幅に収まらないときだけ、端を薄くぼかして「まだ先がある」と示し、キーボードでも動かせるようにする
     （tabindex と role="region"。名前は直前の見出しから借りる）。収まるときは何もしない。 */
  const wraps = [...document.querySelectorAll('.table-wrap')];
  if (wraps.length) {
    let headingSeq = 0;
    const nameOf = (wrap) => {
      let node = wrap;
      while (node) {
        for (let sib = node.previousElementSibling; sib; sib = sib.previousElementSibling) {
          const heading = sib.matches('h2, h3, h4') ? sib : sib.querySelector(':scope > h2, :scope > h3, :scope > h4');
          if (heading) { if (!heading.id) heading.id = 'tw-h' + (++headingSeq); return heading.id; }
        }
        node = node.parentElement;
        if (!node || node === document.body) break;
      }
      return '';
    };
    const state = (wrap) => {
      const max = wrap.scrollWidth - wrap.clientWidth;
      const scrollable = max > 1;
      wrap.classList.toggle('has-l', scrollable && wrap.scrollLeft > 1);
      wrap.classList.toggle('has-r', scrollable && wrap.scrollLeft < max - 1);
      // 先に列があるあいだだけ、表の上に短い案内を出す。端まで動かすと見えなくなる（高さは保つ）。名前は表の領域が持つので、案内は読み上げない
      let hint = wrap.previousElementSibling && wrap.previousElementSibling.classList.contains('tw-hint') ? wrap.previousElementSibling : null;
      if (scrollable && !hint) {
        hint = document.createElement('div');
        hint.className = 'tw-hint';
        hint.setAttribute('aria-hidden', 'true');
        hint.textContent = T.moreColumns;
        wrap.before(hint);
      }
      if (hint) {
        hint.classList.toggle('is-on', scrollable);
        hint.classList.toggle('is-end', scrollable && !wrap.classList.contains('has-r'));
      }
      if (scrollable) {
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('role', 'region');
        const id = nameOf(wrap);
        if (id) wrap.setAttribute('aria-labelledby', id);
      } else {
        wrap.removeAttribute('tabindex');
        wrap.removeAttribute('role');
        wrap.removeAttribute('aria-labelledby');
      }
    };
    wraps.forEach((wrap) => {
      state(wrap);
      wrap.addEventListener('scroll', () => state(wrap), { passive: true });
    });
    const refreshWraps = () => wraps.forEach(state);
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(refreshWraps);
      wraps.forEach((wrap) => { observer.observe(wrap); if (wrap.firstElementChild) observer.observe(wrap.firstElementChild); });
    } else {
      addEventListener('resize', refreshWraps);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshWraps);
  }

  /* ── 3b. フローの向き（.fl） ──
     フロー全体が図の幅に収まるときは横、収まらないときは縦にする。ノードの数やラベルの長さでは決めない。
     いったん横にして実際の幅を測り、フローがあふれるか、ノードの中身があふれるか、ノードが細すぎる（MIN_NODE 未満）ときに縦にする。
     結果は data-fit に "h" か "v" で入れる。JavaScript が無効なときの縦と、読み込み直後（data-fit がまだ無いとき）の仮の向きは CSS 側にある。
     .is-v を付けたフローと、列（.bd-col）の中のフローは、いつも縦なので測らない。 */
  const flows = [...document.querySelectorAll('.fl')].filter((fl) => !fl.classList.contains('is-v') && !fl.closest('.bd-col'));
  if (flows.length) {
    const MIN_NODE = 88;
    const widths = new WeakMap();
    const fit = (fl) => {
      if (!fl.clientWidth) return; // 非表示のときは測れない
      widths.set(fl, fl.clientWidth);
      fl.dataset.fit = 'h';
      const nodes = [...fl.children].filter((child) => child.matches('.nd, .fl-stack'));
      const ok = fl.scrollWidth <= fl.clientWidth + 1
        && nodes.every((node) => node.getBoundingClientRect().width >= MIN_NODE)
        && [...fl.querySelectorAll('.nd')].every((node) => node.scrollWidth <= node.clientWidth + 1);
      fl.dataset.fit = ok ? 'h' : 'v';
    };
    const refresh = () => flows.forEach((fl) => { if (fl.dataset.fit === undefined || widths.get(fl) !== fl.clientWidth) fit(fl); });
    const refit = () => flows.forEach(fit);
    refit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
    addEventListener('load', refit);
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(refresh);
      new Set(flows.map((fl) => fl.closest('.fg') || fl.parentElement)).forEach((box) => observer.observe(box));
    } else {
      addEventListener('resize', refresh);
    }
  }

  /* ── 4. 閲覧画面のデモ（.sc-demo） ──
     中に並べた場面（.sc、data-scene-label が名前）を1つずつ見せる。自分では始まらず、再生ボタンで順に進み、
     場面ボタンで好きな場面へ移る。「動きを減らす」設定では再生ボタンを無効にし、場面ボタンだけ使える。
     JavaScript が無効なら、場面は上から順にすべて表示される。 */
  const INTERVAL = 3600;
  document.querySelectorAll('.sc-demo').forEach((demo) => {
    const scenes = [...demo.querySelectorAll(':scope > .sc')];
    if (scenes.length < 2) return;
    const motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    const bar = document.createElement('div');
    bar.className = 'sc-ctl';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', T.scene);
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'sc-play';
    const buttons = scenes.map((scene, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = scene.dataset.sceneLabel || (T.scene + ' ' + (index + 1));
      button.addEventListener('click', () => { stop(); show(index); });
      return button;
    });
    const status = document.createElement('span');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    bar.append(play, ...buttons, status);
    demo.prepend(bar);
    demo.classList.add('is-js');
    demo.style.setProperty('--sc-ms', INTERVAL + 'ms');

    let current = 0;
    let timer = 0;
    function show(index) {
      current = index;
      scenes.forEach((scene, i) => scene.classList.toggle('is-active', i === index));
      buttons.forEach((button, i) => {
        button.setAttribute('aria-pressed', String(i === index));
        button.classList.toggle('is-now', i === index);
      });
      status.textContent = buttons[index].textContent;
    }
    function setPlayLabel(playing) {
      play.setAttribute('aria-pressed', String(playing));
      play.textContent = playing ? T.pause : (motion.matches ? T.playOff : T.play);
    }
    function stop() {
      clearInterval(timer);
      timer = 0;
      demo.classList.remove('is-playing');
      setPlayLabel(false);
    }
    function start() {
      if (motion.matches) return;
      demo.classList.add('is-playing');
      setPlayLabel(true);
      timer = setInterval(() => {
        show((current + 1) % scenes.length);
        // 進み具合の線を、新しい場面のボタンでもう一度動かす
        demo.classList.remove('is-playing');
        void demo.offsetWidth;
        demo.classList.add('is-playing');
      }, INTERVAL);
    }
    play.addEventListener('click', () => { if (timer) stop(); else start(); });
    const syncMotion = () => { if (motion.matches) stop(); play.disabled = motion.matches; setPlayLabel(!!timer); };
    if (motion.addEventListener) motion.addEventListener('change', syncMotion);
    show(0);
    syncMotion();
  });

  /* ── 5. 公開の動き（.fg .tp-live） ──
     図が画面に見えている間、各列のリポジトリからばらばらの間隔で公開の点が上がり、届いたサイトだけが光る。
     自分で始まり、ボタンはない。「動きを減らす」設定のとき、JavaScript が無効なときは、矢印だけの静止状態。 */
  const motion5 = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  document.querySelectorAll('.tp-live').forEach((live) => {
    const cols = [...live.querySelectorAll('.nd[data-kind="site"][data-tp-col]')].map((site) => ({
      site,
      arrow: live.querySelector(`.fl-a[data-tp-col="${site.dataset.tpCol}"]`),
    })).filter((col) => col.arrow);
    if (!cols.length) return;

    let timers = [];
    let running = false;
    let visible = typeof IntersectionObserver !== 'function';
    const loop = (i, first) => {
      timers[i] = setTimeout(() => {
        const { arrow, site } = cols[i];
        arrow.classList.remove('is-go');
        void arrow.offsetWidth;
        arrow.classList.add('is-go');
        timers[i + cols.length] = setTimeout(() => {
          site.classList.remove('is-hit');
          void site.offsetWidth;
          site.classList.add('is-hit');
          timers[i + 2 * cols.length] = setTimeout(() => site.classList.remove('is-hit'), 500);
        }, 450);
        loop(i);
      }, first ? 150 + Math.random() * 900 : 500 + Math.random() * 1900);
    };
    function stop() {
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
      cols.forEach(({ arrow, site }) => { arrow.classList.remove('is-go'); site.classList.remove('is-hit'); });
    }
    function sync() {
      const want = visible && !motion5.matches && !document.hidden;
      if (want && !running) { running = true; cols.forEach((_, i) => loop(i, true)); }
      else if (!want && running) stop();
    }
    if (!visible) {
      new IntersectionObserver((entries) => { visible = entries.some((e) => e.isIntersecting); sync(); }).observe(live);
    }
    document.addEventListener('visibilitychange', sync);
    if (motion5.addEventListener) motion5.addEventListener('change', sync);
    sync();
  });

  /* ── 6. ここで試す（.try） ──
     このページは、説明している閲覧アプリの中で読まれるので、機能をその場で試すよう案内する。
     案内するだけで、アプリの画面を読んだり操作したりはしない（アプリのDOMは約束されたものではない）。
     使うのは、アプリのURL（論理ルート）と画面の幅だけ。幅は閲覧アプリの切り替わりに合わせる：
     620px以下は狭い画面のヘッダー（narrow）、1200px以上は右の列（column）、その間は上部のボタン（header）。
     アプリの外で開いたときは案内を隠して閲覧アプリで開くリンクを出し、プレビューでは本公開へのリンクを添える。 */
  if (document.querySelector('.try')) {
    const root = document.documentElement;
    let app = null;
    try { if (inFrame && window.top.location.origin === location.origin) app = window.top; } catch { app = null; }
    const route = app ? app.location.pathname : '';
    const previewRoute = /^\/[^/]+\/_previews\/[^/]+\//;
    root.dataset.reader = !app ? 'off' : previewRoute.test(route) ? 'preview' : 'app';
    const marker = '/_artifacts/';
    const href = root.dataset.reader === 'preview' ? route.replace(previewRoute, (prefix) => '/' + prefix.split('/')[1] + '/')
      : root.dataset.reader === 'off' && location.pathname.startsWith(marker) ? '/' + location.pathname.slice(marker.length) + location.hash
        : '';
    document.querySelectorAll('.try-open').forEach((anchor) => {
      if (href) anchor.href = href; else anchor.hidden = true;
    });
    if (app && typeof app.matchMedia === 'function') {
      const narrow = app.matchMedia('(max-width: 620px)');
      const column = app.matchMedia('(min-width: 1200px)');
      const sync = () => { root.dataset.layout = narrow.matches ? 'narrow' : column.matches ? 'column' : 'header'; };
      sync();
      [narrow, column].forEach((query) => query.addEventListener?.('change', sync));
    }
  }
})();
