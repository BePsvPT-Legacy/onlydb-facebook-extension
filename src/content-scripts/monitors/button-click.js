/**
 * Listen for button click.
 *
 * @return void
 */
module.exports = () => {
  document.querySelectorAll('.custom-button i').forEach(node => {
    node.addEventListener('click', e => {
      // 當點擊 plugin 的按鈕時，隱藏 body 的滾動條，
      // 避免滑鼠在 modal 外滾動時捲動頁面
      document.body.style.overflowY = 'hidden'
      document.querySelector('.custom-modal').style.display = 'block'
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent

      const mapping = {
        'fire': 'hottest',
        'bar-chart': 'statistics',
        'history': 'history',
        'cog': 'setting'
      }

      // 透過 button 的 class 來判斷點擊的按鈕，載入相對的 modal
      let name = e.target.className

      name = name.substr(name.lastIndexOf('fa-') + 3)

      require('./modals/' + mapping[name])(document.querySelector('.custom-modal .box .content'))
    })
  })
}
