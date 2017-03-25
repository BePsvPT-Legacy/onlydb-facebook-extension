import boolean from 'boolean'
import config from '../../utils/config'
import searchApi from '../components/search'

/**
 * Listen for facebook search.
 *
 * @return void
 */
const search = () => {
  const fbSearchInputs = document.querySelectorAll('input[name="q"]')

  // facebook 頁面載入過程中，html dom 會更動，因此必須等到 length 大於 2
  // 而 #q 則是繁體中文時才會有的 id，出現時即代表頁面載入完成
  if (2 > fbSearchInputs.length && ! document.querySelector('#q')) {
    window.setTimeout(search, 1000)
  } else {
    // 監聽 facebook 自有的搜尋框
    fbSearchInputs.item(fbSearchInputs.length - 1).addEventListener('input', function (e) {
      const keyword = e.target.value

      document.querySelector('#custom-search-input').value = keyword

      if (! keyword.length) {
        return
      }

      config.get('setting.sync-search', sync => {
        if (boolean(sync)) {
          searchApi(keyword)
        }
      })
    })
  }
}

module.exports = search
