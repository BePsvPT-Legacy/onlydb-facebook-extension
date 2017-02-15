/**
 * Find first ancestor of el with tagName or undefined if not found.
 *
 * @param el
 * @param tagName
 * @returns {*}
 *
 * @reference http://stackoverflow.com/a/6857116
 */
function upTo(el, tagName) {
  tagName = tagName.toLowerCase()

  while (el && el.parentNode) {
    el = el.parentNode

    if (el.tagName && el.tagName.toLowerCase() === tagName) {
      return el
    }
  }

  return null
}

/**
 * Get url query string.
 *
 * @param name
 * @param url
 * @returns {*}
 *
 * @reference http://stackoverflow.com/a/901144
 */
function queryString(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&")

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(url)

  if (! results) {
    return null
  } else if (! results[2]) {
    return ''
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "))
}
