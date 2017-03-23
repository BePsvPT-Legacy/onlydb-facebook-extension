import boolean from 'boolean'
import config from '../../utils/config'
import searchApi from '../components/search'

/**
 * Listen for facebook search.
 *
 * @returns void
 */
const search = () => {
  const fbSearchInputs = document.querySelectorAll('input[name="q"]')

  if (2 > fbSearchInputs.length && ! document.querySelector('#q')) {
    window.setTimeout(search, 1000)
  } else {
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
