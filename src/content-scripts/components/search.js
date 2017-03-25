import 'whatwg-fetch'

/**
 * Fetch search api.
 *
 * @param keyword
 * @param page
 *
 * @return void
 */
export default (keyword, page = 1) => {
  fetch(`https://localhost:3000/api.php?type=search&keyword=${keyword}&page=${page}`).then(response => {
    response.json().then(data => {
      const resultDom = document.querySelector('div.custom-search-bar .result')

      resultDom.querySelector('ul').innerHTML = data.result.recs.reduce((acc, rec) => {
        rec = rec.rec

        const content = rec.description || rec.body || rec.page_name

        return `${acc}<li><a href="${rec.url}">${content.substr(0, 30)}</a></li>`
      }, '')

      resultDom.style.display = 'block'
    })
  })
}
