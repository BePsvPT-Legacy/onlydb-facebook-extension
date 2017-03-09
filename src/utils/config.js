import dotProp from 'dot-prop'

export default {
  /**
   * Get content from storage and pass the result to callback function.
   *
   * @param key
   * @param cb
   *
   * @returns void
   */
  get (key, cb = null) {
    if (null === cb) {
      [key, cb] = ['', key]
    }

    const pos = key.indexOf('.')

    const k = (-1 !== pos ? key.slice(0, pos) : key) || null

    chrome.storage.local.get(k, items => {
      if (null !== k && items.hasOwnProperty(k)) {
        items = items[k]

        if (-1 !== pos) {
          items = dotProp.get(items, key.slice(pos + 1), {})
        }
      }

      cb(items)
    })
  },

  /**
   * Store content to storage.
   *
   * @param key
   * @param val
   * @param cb
   *
   * @returns void
   */
  set (key, val, cb = null) {
    if (! key.includes('.')) {
      chrome.storage.local.set({ [key]: val }, cb)
    } else {
      const pos = key.indexOf('.')

      this.get(key.slice(0, pos), item => {
        dotProp.set(item, key.substr(pos + 1), val)

        this.set(key.slice(0, pos), item, cb)
      })
    }
  }
}
