import urlParse from 'url-parse'

const parsedUrls = {}

/**
 * Parse fbid from url.
 *
 * @return string|null
 */
const fromUrl = url => {
  // 已分析過的網址就直接從快取拿
  if (parsedUrls.hasOwnProperty(url)) {
    return parsedUrls[url]
  }

  const parsed = urlParse(url, true)
  const query = parsed.query
  const pathname = parsed.pathname.replace(/\/+$/, '')

  let result

  if (pathname.endsWith(':3') || pathname.endsWith(':0')) {
    result = null
  } else if (query.hasOwnProperty('story_fbid')) {
    result = query.story_fbid
  } else if (query.hasOwnProperty('fbid')) {
    result = query.fbid
  } else {
    result = pathname.slice(pathname.lastIndexOf('/') + 1)
  }

  parsedUrls[url] = result

  return result
}

/**
 * Parse fbid from given value.
 *
 * @return string|null
 */
export default val => {
  if (val.match(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
    return fromUrl(val)
  }

  console.error(`fbid unknown type: ${val}`)

  return null
}
