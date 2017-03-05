// add class to navbar
const initCustomNavbar = (dom) => {
  dom.className += ' custom-navbar'
}

// add custom search bar in the right of facebook search bar
const initCustomSearchBar = (dom) => {
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

// add custom button in the right of custom search bar
const initCustomButton = () => {
  const iconNode = (icon, name) => {
    return `<i class="fa fa-fw fa-${icon}" aria-hidden="true" data-hover="tooltip" data-tooltip-delay="350" data-tooltip-content="${name}"></i>`
  }
  const node = document.createElement('div')

  node.className = 'custom-button'
  node.innerHTML = `
${iconNode('fire', '熱門粉專')}
${iconNode('bar-chart', '個人統計')}
${iconNode('history', '歷史回顧')}
${iconNode('cog', '設定')}`

  upTo(document.querySelector('div.custom-search-bar'), 'div').append(node)

  document.querySelectorAll('.custom-button i').forEach(node => {
    node.addEventListener('click', e => {
      document.querySelector('.custom-modal').style.display = 'block'
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent
    })
  })
}

// add button modal
const initModal = () => {
  const node = document.createElement('div')

  node.className = 'custom-modal'
  node.style.display = 'none'
  node.innerHTML = `
<div class="background"></div>
<div class="box">
  <div class="header">
    <div style="margin-left: 1rem;">
      <b id="custom-modal-title"></b>
    </div>
    <div class="close-button">
      <i class="fa fa-lg fa-times" aria-hidden="true"></i>
    </div>
  </div>
  <div class="content"></div>
</div>`

  document.body.append(node)

  const closeEvent = () => {
    node.style.display = 'none'
  }

  document.querySelector('.custom-modal .background').onclick = closeEvent
  document.querySelector('.custom-modal .close-button i').onclick = closeEvent
}

// listen for user use fb search bar
const listenForFbSearchBar = () => {
  const fbSearchInputs = document.querySelectorAll('input[name="q"]')

  if (fbSearchInputs.length < 2 && ! document.querySelector('#q')) {
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
      const isSponsored = feed.querySelector('a[href^="https://l.facebook.com/l.php"]')

      if (isSponsored) {
        switch (isSponsored.innerText) {
          case 'Sponsored':
          case '贊助':
          case '広告':
            return feed.remove()
        }
      }

      const feedTime = feed.querySelector('abbr.timestamp.livetimestamp')

      if (! feedTime) {
        return
      }

      let isPublic = upTo(feedTime, 'div').querySelector('[data-tooltip-content]')

      if (! isPublic) {
        return
      }

      isPublic = isPublic.getAttribute('data-tooltip-content')

      if (isPublic.includes('Public') || isPublic.includes('公開')) {
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

// get facebook navbar dom
const navbar = () => {
  let dom = document.querySelector('div[role="search"]')

  if (! dom) {
    dom = upTo(document.querySelector('form[role="search"]'), 'div')
  }

  return upTo(dom, 'div')
}

document.onreadystatechange = () => {
  if ('interactive' === document.readyState) {
    const dom = navbar()

    initCustomNavbar(dom)
    initCustomSearchBar(dom)
    initCustomButton()
    initModal()

    listenForFbSearchBar()

    monitorUserFeed()
  }
}
