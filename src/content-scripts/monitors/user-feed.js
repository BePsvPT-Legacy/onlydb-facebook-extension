import parse from 'url-parse'
import upTo from '../../utils/up-to'

module.exports = () => {
  const retrieveFbidFromUrl = (url) => {
    if (url.endsWith(':3') || url.includes('story_fbid')) {
      return null
    } else if (url.includes('photo.php')) {
      return parse(url, true).query.fbidsss || null
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

  let lastY = 0
  const feeds = []

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
          if (0 > window.scrollY - lastY) {
            console.log('back', fbid)
          } else {
            console.log(fbid)
          }
        }
      }
    })

    lastY = window.scrollY
  }
}
