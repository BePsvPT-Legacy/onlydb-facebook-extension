/**
 * Insert hooks.js to html dom.
 *
 * 因安全限制，無法直接呼叫 facebook js function，
 * 因此將 hooks.js 新增到頁面中，透過 postMessage
 * 來間接達成此目的。
 *
 * @return void
 */
module.exports = () => {
  const js = document.createElement('script')

  js.src = `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/hooks.js`

  document.head.append(js)
}
