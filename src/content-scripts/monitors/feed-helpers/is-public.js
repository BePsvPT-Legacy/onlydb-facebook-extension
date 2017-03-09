import upTo from '../../../utils/up-to'

/**
 * Determine the feed is public or not.
 *
 * @returns boolean
 */
export default (feed) => {
  const timeSpan = feed.querySelector('abbr.timestamp.livetimestamp')

  if (! timeSpan) {
    return false
  }

  let privacy = upTo(timeSpan, 'div').querySelector('[data-tooltip-content]')

  if (! privacy) {
    return false
  }

  privacy = privacy.getAttribute('data-tooltip-content')

  return privacy.includes('Public') || privacy.includes('公開')
}
