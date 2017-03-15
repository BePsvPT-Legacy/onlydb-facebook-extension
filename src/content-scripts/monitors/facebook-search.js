import boolean from 'boolean'
import config from '../../utils/config'

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
      document.querySelector('#custom-search-input').value = e.target.value

      config.get('setting.sync-search', sync => {
        if (boolean(sync)) {
          //
        }
      })
    })
  }
}

module.exports = search
