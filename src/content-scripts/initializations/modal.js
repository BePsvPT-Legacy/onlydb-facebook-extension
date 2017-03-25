/**
 * Add modal.
 *
 * @return void
 */
module.exports = () => {
  const node = document.createElement('div')

  node.className = 'custom-modal'
  node.style.display = 'none'
  node.innerHTML = `
<div class="background"></div>

<div class="box">
  <div class="header">
    <div style="margin-left: 1rem;">
      <b id="custom-modal-title" style="font-size: 16px;"></b>
    </div>
    <div class="close-button">
      <i class="fa fa-lg fa-times" aria-hidden="true"></i>
    </div>
  </div>
  
  <div class="content"></div>
</div>`

  document.body.append(node)

  // 當 modal 關閉時，顯示 body 的滾動條以及清空 modal content
  const closeEvent = () => {
    node.style.display = 'none'

    document.body.style.overflowY = ''

    document.querySelector('.custom-modal .box .content').innerHTML = ''
  }

  document.querySelector('.custom-modal .background').onclick = closeEvent
  document.querySelector('.custom-modal .close-button i').onclick = closeEvent
}
