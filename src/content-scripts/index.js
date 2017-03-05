import upTo from '../utils/up-to'

document.onreadystatechange = () => {
  if ('interactive' === document.readyState) {
    const dom = (() => {
      let dom = document.querySelector('div[role="search"]')

      if (! dom) {
        dom = upTo(document.querySelector('form[role="search"]'), 'div')
      }

      return upTo(dom, 'div')
    })()

    require('./initializations/navbar')(dom)
    require('./initializations/search-bar')(dom)
    require('./initializations/button')()
    require('./initializations/modal')()

    require('./monitors/facebook-search')()
    require('./monitors/user-feed')()
  }
}
