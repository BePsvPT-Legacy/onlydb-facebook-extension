import searchApi from '../components/search'
import upTo from '../../utils/up-to'

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
<form class="search-form">
  <input id="custom-search-input" type="text" placeholder="Post Search">
  <i class="fa fa-fw fa-search" aria-hidden="true"></i>
</form>

<div class="result">
  <ul></ul>
</div>`

  dom.append(node)

  document.querySelector('#custom-search-input').addEventListener('input', function (e) {
    if (e.target.value) {
      searchApi(e.target.value)
    }
  })

  document.body.addEventListener('click', e => {
    const parent = upTo(e.target, 'form')

    if (! (parent && ('search-form' === parent.className))) {
      document.querySelector('div.custom-search-bar .result').style.display = 'none'
    }
  })
}
