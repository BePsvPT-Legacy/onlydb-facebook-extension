import 'whatwg-fetch'

export default {
  status: {
    loading: false,
    page: 1
  },

  /**
   * Load hottest posts.
   *
   * @param cb
   *
   * @return void
   */
  load (cb = null) {
    // 防止 race condition
    if (this.status.loading) {
      return
    }

    this.status.loading = true

    document.querySelector('.hottest-section div i.loading').style.display = ''

    fetch(`https://localhost:3000/api.php?page=${this.status.page}`).then(response => {
      response.json().then(data => {
        const postsDom = document.querySelector('.hottest-section .posts')

        postsDom.insertAdjacentHTML('beforeend', this.render(data.result.recs))
        postsDom.querySelectorAll('div.fb-post.fb_iframe_widget').forEach(node => { node.className = '' })

        if (null !== cb) {
          cb(data)
        }

        // 透過 postMessage 呼叫 facebook sdk 來渲染動態
        window.postMessage({ type: 'embed-posts' }, '*')

        document.querySelector('.hottest-section div i.loading').style.display = 'none'

        this.status.loading = false
      })

      ++this.status.page
    })
  },

  /**
   * Render hottest posts html.
   *
   * @param recs
   *
   * @return string
   */
  render (recs) {
    return recs.reduce((html, feed) => {
      return html + `<div class="fb-post" data-href="${feed.rec.url}" data-width="350"></div>`
    }, '')
  }
}
