// insert custom search bar in the right of facebook search bar
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
    if (url.endsWith(':3')) {
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

  let lastY = 0, feeds = []

  window.onscroll = () => {
    if ('/' !== window.location.pathname) {
      lastY = 0

      return
    }

    document.querySelectorAll('div[id^="hyperfeed_story_id"]').forEach(feed => {
      const feedTime = feed.querySelector('abbr.timestamp.livetimestamp')

      if (feedTime && upTo(feedTime, 'div').querySelector('[data-tooltip-content]').getAttribute('data-tooltip-content').includes('Public')) {
        const fbid = retrieveFbidFromUrl(upTo(feedTime, 'a').href)

        if (! feeds.includes(fbid)) {
          feeds.push(fbid)

          chrome.storage.local.set({ feeds })

          console.log(fbid)
        }
      }
    })

    lastY = window.scrollY
  }
}

document.onreadystatechange = () => {
  if ('complete' === document.readyState) {
    initCustomSearchBar()
    listenForFbSearchBar()

    monitorUserFeed()
  }
}
