/**
 * Determine the feed is in screen or not.
 *
 * @returns boolean
 */
export default (feed) => {
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
