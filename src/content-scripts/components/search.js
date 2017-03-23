import 'whatwg-fetch'

export default (keyword, page = 1) => {
  fetch(`https://www.cs.ccu.edu.tw/~cys102u/api.php?type=search&keyword=${keyword}&page=${page}`).then(response => {
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
