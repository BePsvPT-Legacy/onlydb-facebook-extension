module.exports = () => {
  document.querySelectorAll('.custom-button i').forEach(node => {
    node.addEventListener('click', e => {
      document.body.style.overflowY = 'hidden'
      document.querySelector('.custom-modal').style.display = 'block'
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent

      const mapping = {
        'fire': 'hottest',
        'bar-chart': 'statistics',
        'history': 'history',
        'cog': 'setting'
      }

      let name = e.target.className

      name = name.substr(name.lastIndexOf('fa-') + 3)

      require('./modals/' + mapping[name])(document.querySelector('.custom-modal .box .content'))
    })
  })
}
