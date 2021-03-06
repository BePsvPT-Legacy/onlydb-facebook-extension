import posts from './hottest/posts'

/**
 * Open hottest modal.
 *
 * @param dom
 *
 * @return void
 */
module.exports = (dom) => {
  dom.innerHTML = `
<div class="hottest-section">
  <div style="margin-left: 1.5rem; margin-top: 1rem;">
    <h1 style="display: inline;">熱門動態</h1>
    <i class="fa fa-spinner fa-pulse fa-fw loading" style="color: orange; display: none;"></i>
  </div>
  
  <div class="posts"></div>
</div>
`

  posts.status.page = 1
  posts.load()

  // 瀑布流
  document.querySelector('.hottest-section .posts').addEventListener('scroll', e => {
    const target = e.target

    // scrollWidth 整體寬度
    // scrollLeft  滾動距離
    // offsetWidth 可視寬度(含 margin)
    // clientWidth 可視寬度

    if (target.scrollLeft > (target.scrollWidth - target.clientWidth * 2.5)) {
      posts.load()
    }
  })
}
