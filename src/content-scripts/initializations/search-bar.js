import searchApi from '../components/search'
import upTo from '../../utils/up-to'

/**
 * Add search bar on the right of facebook search bar.
 *
 * @param dom
 *
 * @return void
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

  // 當搜尋框的值是 truthy 則呼叫 search api
  document.querySelector('#custom-search-input').addEventListener('input', function (e) {
    if (e.target.value) {
      searchApi(e.target.value)
    }
  })

  // 當點擊搜尋框外的區域，隱藏搜尋結果
  document.body.addEventListener('click', e => {
    const parent = upTo(e.target, 'form')

    // upTo 可能回傳 null，因此需先確保 parent 是 truthy
    if (! (parent && ('search-form' === parent.className))) {
      document.querySelector('div.custom-search-bar .result').style.display = 'none'
    }
  })
}
