/**
 * Insert hooks.js to html dom.
 *
 * @returns void
 */
module.exports = () => {
  const js = document.createElement('script')

  js.src = `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/hooks.js`

  document.head.append(js)
}
