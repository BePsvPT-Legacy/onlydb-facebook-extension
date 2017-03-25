/**
 * Find first ancestor of el with tagName or undefined if not found.
 *
 * @param el
 * @param tagName
 * @return {*}|null
 *
 * @reference http://stackoverflow.com/a/6857116
 */
export default (el, tagName) => {
  tagName = tagName.toLowerCase()

  while (el && el.parentNode) {
    el = el.parentNode

    if (el.tagName && el.tagName.toLowerCase() === tagName) {
      return el
    }
  }

  return null
}
