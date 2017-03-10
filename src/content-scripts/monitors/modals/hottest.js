import posts from './hottest/posts'

module.exports = (dom) => {
  dom.innerHTML = `
<div class="hottest-section">
  <div class="posts"></div>
</div>
`

  posts.status.page = 1
  posts.load()

  document.querySelector('.hottest-section .posts').addEventListener('scroll', e => {
    const target = e.target

    // scrollWidth 整體寬度
    // scrollLeft  滾動距離
    // offsetWidth 可視寬度(含 margin)
    // clientWidth 可視寬度

    if (target.scrollLeft > (target.scrollWidth - target.clientWidth * 2)) {
      posts.load()
    }
  })
}
