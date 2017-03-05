/**
 * Add search bar in the right of facebook search bar.
 *
 * @param dom
 *
 * @returns void
 */
module.exports = dom => {
  const node = document.createElement('div')

  node.className = 'custom-search-bar'
  node.innerHTML = `
<form>
  <div>
    <input id="custom-search-input" type="text" placeholder="Search DB">
  </div>
</form>`

  dom.append(node)
}
