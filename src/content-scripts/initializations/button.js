import upTo from '../../utils/up-to'

/**
 * Create a font awesome icon node.
 *
 * @param icon
 * @param name
 *
 * @returns string
 */
function iconNode (icon, name) {
  return `<i class="fa fa-fw fa-${icon}" aria-hidden="true" data-hover="tooltip" data-tooltip-delay="350" data-tooltip-content="${name}"></i>`
}

/**
 * Add buttons in the right of search bar.
 *
 * @returns void
 */
module.exports = () => {
  const node = document.createElement('div')

  node.className = 'custom-button'
  node.innerHTML = `
${iconNode('fire', '熱門粉專')}
${iconNode('bar-chart', '個人統計')}
${iconNode('history', '歷史回顧')}
${iconNode('cog', '設定')}`

  upTo(document.querySelector('div.custom-search-bar'), 'div').append(node)

  document.querySelectorAll('.custom-button i').forEach(node => {
    node.addEventListener('click', e => {
      document.querySelector('.custom-modal').style.display = 'block'
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent
    })
  })
}
