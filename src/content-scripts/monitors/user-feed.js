import config from '../../utils/config'
import parseFbid from './feed-helpers/parse-fbid'
import inScreen from './feed-helpers/in-screen'
import isPublic from './feed-helpers/is-public'
import isSponsored from './feed-helpers/is-sponsored'

module.exports = () => {
  const feeds = []

  let lastY = 0

  window.onscroll = () => {
    if ('/' !== window.location.pathname) {
      lastY = 0

      return
    }

    document.querySelectorAll('div[id^="hyperfeed_story_id"]').forEach(feed => {
      if (isSponsored(feed)) {
        return config.get('setting.remove-ad', remove => {
          return remove && feed.remove()
        })
      } else if (isPublic(feed)) {
        const fbid = parseFbid(feed.querySelector('div span span a:not([data-hovercard-prefer-more-content-show])').href)

        if (fbid) {
          if (! feeds.includes(fbid)) {
            feeds.push(fbid)

            config.set('feeds', feeds)
          }

          if (inScreen(feed)) {
            console.log(0 > window.scrollY - lastY ? 'back' : '', fbid)
          }
        }
      }
    })

    lastY = window.scrollY
  }
}
