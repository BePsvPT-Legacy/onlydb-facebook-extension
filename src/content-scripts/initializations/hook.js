/**
 * Insert hooks.js to html dom.
 *
 * @returns void
 */
module.exports = () => {
  const js = document.createElement('script')

  js.src = 'chrome-extension://fhejeipcphchemncfcobjcaccjgjbefm/hooks.js'

  document.head.append(js)
}
