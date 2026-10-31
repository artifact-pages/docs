const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const { runInNewContext } = require('node:vm')
const test = require('node:test')

const source = readFileSync(join(__dirname, '../sites/ja/assets/site.js'), 'utf8')

function fixture({ accepted = false, nested = false, throws = false, pathname = '/_artifacts/ja/index.html' } = {}) {
  let click
  const sent = []
  const assigned = []
  const root = { lang: 'ja', dataset: {} }
  const doc = {
    documentElement: root,
    addEventListener(name, fn) { if (name === 'click') click = fn },
    querySelector() { return null },
    querySelectorAll() { return [] },
  }
  class Anchor {
    constructor(href, options = {}) { this.href = href; this.target = options.target ?? ''; this.download = options.download ?? false }
    closest() { return this }
    hasAttribute(name) { return name === 'download' && this.download }
  }
  class NavigationEvent {
    constructor(type, options) { if (throws) throw new Error('unsupported'); this.type = type; Object.assign(this, options) }
  }
  const location = new URL(`https://example.test${pathname}`)
  const top = {
    location: { origin: location.origin, pathname: '/ja', search: '?q=cost', assign: (route) => assigned.push(route) },
    document: { documentElement: { dataset: {} } },
    CustomEvent: NavigationEvent,
    dispatchEvent(event) { sent.push(event); return !accepted },
  }
  const frame = { top, parent: nested ? {} : top }
  runInNewContext(source, {
    window: frame, document: doc, location, URL, URLSearchParams, Element: Anchor,
    MutationObserver: class { observe() {} },
  })
  function activate(href, options = {}) {
    let prevented = false
    const e = {
      defaultPrevented: false, button: options.button ?? 0,
      metaKey: !!options.metaKey, ctrlKey: !!options.ctrlKey,
      shiftKey: !!options.shiftKey, altKey: !!options.altKey,
      target: new Anchor(new URL(href, location).href, options),
      preventDefault() { prevented = true },
    }
    click(e)
    return prevented
  }
  return { activate, sent, assigned, frame }
}

test('accepted reader navigation preserves query and fragment without a full navigation', () => {
  const f = fixture({ accepted: true })
  assert.equal(f.activate('next.html?tab=1#part'), true)
  assert.equal(f.assigned.length, 0)
  assert.equal(f.sent[0].type, 'artifact-pages:navigate:v1')
  assert.equal(f.sent[0].cancelable, true)
  assert.equal(f.sent[0].detail.source, f.frame)
  assert.equal(f.sent[0].detail.href, '/ja/next.html?tab=1&q=cost#part')
})

test('old or rejecting readers, constructor errors, nested frames, and other sites use ordinary navigation', () => {
  for (const options of [{}, { throws: true }, { nested: true }]) {
    const f = fixture(options)
    assert.equal(f.activate('next.html'), true)
    assert.deepEqual(f.assigned, ['/ja/next.html?q=cost'])
  }
  const other = fixture({ accepted: true })
  assert.equal(other.activate('/_artifacts/other/next.html'), true)
  assert.deepEqual(other.assigned, ['/other/next.html'])
  assert.equal(other.sent.length, 0)
})

test('fragments, modified clicks, new tabs, downloads and previews remain native', () => {
  const f = fixture({ accepted: true })
  for (const [href, options] of [
    ['#fragment', {}], ['next.html', { metaKey: true }], ['next.html', { button: 1 }],
    ['next.html', { target: '_blank' }], ['next.html', { download: true }],
  ]) assert.equal(f.activate(href, options), false)
  assert.equal(f.sent.length, 0)
  const preview = fixture({ accepted: true, pathname: '/_previews/ja/revision/index.html' })
  assert.equal(preview.activate('next.html'), false)
  assert.equal(preview.sent.length, 0)
})
