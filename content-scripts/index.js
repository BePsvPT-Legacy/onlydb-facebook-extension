// add class to navbar
const initCustomNavbar = () => {
  upTo(document.querySelector('div[role="search"]'), 'div').className += ' custom-navbar'
}

// add custom search bar in the right of facebook search bar
const initCustomSearchBar = () => {
  const customSearchBar = document.createElement('div')

  customSearchBar.className = 'custom-search-bar'
  customSearchBar.innerHTML = `
<form>
  <div>
    <input id="custom-search-input" type="text" placeholder="Search DB">
  </div>
</form>`

  upTo(document.querySelector('div[role="search"]'), 'div').append(customSearchBar)
}

// add custom button in the right of custom search bar
const initCustomButton = () => {
  const customButton = document.createElement('div')

  customButton.className = 'custom-button'
  customButton.innerHTML = `
<i class="fa fa-fw fa-fire" aria-hidden="true"></i>
<i class="fa fa-fw fa-bar-chart" aria-hidden="true"></i>`

  upTo(document.querySelector('div.custom-search-bar'), 'div').append(customButton)
}

// listen for user use fb search bar
const listenForFbSearchBar = () => {
  const fbSearchInputs = document.querySelectorAll('input[name="q"]')

  if (fbSearchInputs.length < 2) {
    window.setTimeout(listenForFbSearchBar, 1000)
  } else {
    fbSearchInputs.item(fbSearchInputs.length - 1).addEventListener('input', function(e) {
      document.querySelector('#custom-search-input').value = e.target.value
    })
  }
}

const monitorUserFeed = () => {
  const retrieveFbidFromUrl = (url) => {
    if (url.endsWith(':3') || url.includes('story_fbid')) {
      return null
    } else if (url.includes('photo.php')) {
      return queryString('fbid', url)
    }

    const queue = url.split('/')

    if (url.includes('photos') || url.endsWith('/')) {
      queue.pop()
    }

    return queue.pop()
  }
  const isFeedInScreen = (feed) => {
    const rect = feed.getBoundingClientRect()
    const screen = {
      top: window.scrollY,
      bottom: window.scrollY + document.documentElement.clientHeight
    }
    const el = {
      top: feed.offsetTop + rect.height / 3,
      bottom: feed.offsetTop + rect.height / 3 * 2
    }

    if (el.top > screen.top && el.top < screen.bottom) {
      return true
    } else if (el.bottom > screen.top && el.bottom < screen.bottom) {
      return true
    }

    return false
  }

  let lastY = 0, feeds = []

  window.onscroll = () => {
    if ('/' !== window.location.pathname) {
      lastY = 0

      return
    }

    document.querySelectorAll('div[id^="hyperfeed_story_id"]').forEach(feed => {
      const feedTime = feed.querySelector('abbr.timestamp.livetimestamp')

      if (! feedTime) {
        return
      }

      const isPublic = upTo(feedTime, 'div').querySelector('[data-tooltip-content]')

      if (isPublic && isPublic.getAttribute('data-tooltip-content').includes('Public')) {
        const fbid = retrieveFbidFromUrl(upTo(feedTime, 'a').href)

        if (fbid && ! feeds.includes(fbid)) {
          feeds.push(fbid)

          chrome.storage.local.set({ feeds })
        }

        if (isFeedInScreen(feed)) {
          console.log(fbid)
        }
      }
    })

    lastY = window.scrollY
  }
}

document.onreadystatechange = () => {
  if ('interactive' === document.readyState) {
    initCustomNavbar()
    initCustomSearchBar()
    initCustomButton()

    listenForFbSearchBar()

    monitorUserFeed()
  }
}
