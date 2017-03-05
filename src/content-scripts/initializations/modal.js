/**
 * Add modal.
 *
 * @returns void
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
      <b id="custom-modal-title"></b>
    </div>
    <div class="close-button">
      <i class="fa fa-lg fa-times" aria-hidden="true"></i>
    </div>
  </div>
  <div class="content"></div>
</div>`

  document.body.append(node)

  const closeEvent = () => {
    node.style.display = 'none'
  }

  document.querySelector('.custom-modal .background').onclick = closeEvent
  document.querySelector('.custom-modal .close-button i').onclick = closeEvent
}
