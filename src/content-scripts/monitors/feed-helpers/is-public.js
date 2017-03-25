/**
 * Determine the feed is public or not.
 *
 * @return boolean
 */
export default (feed) => {
  let privacy = feed.querySelector('a[data-hover="tooltip"][class*="Privacy"], div[data-hover="tooltip"]')

  if (! privacy) {
    return false
  }

  privacy = privacy.getAttribute('data-tooltip-content')

  return privacy.includes('Public') || privacy.includes('公開')
}
