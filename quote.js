
// const quoteUrl = "http://quotesondesign.com/wp-json/posts"
// const query = "?method=getQuote"
// const query = "?filter[where]=rand&filter[posts_per_page]=1&callback="
// const query = "/1385"

const blockquote = document.querySelector("#quote")
const quoteButton = document.querySelector("#btn-quote")

const fetchQuote = () => {
  blockquote.innerHTML = `<i class="fa fa-spinner fa-spin fa-3x fa-fw spinner-quote"></i>`
  const quoteSpinner = document.querySelector(".spinner-quote")
  blockquote.insertAdjacentHTML("afterbegin", '<div id="quote-author"></div>')

  const quoteAuthorDiv = document.querySelector("#quote-author")
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const quoteUrl = "http://quotesondesign.com/wp-json/posts"
  const query = "?filter[orderby]=rand&filter[posts_per_page]=1&callback="
  const fullUrl = `${proxyUrl}${quoteUrl}${query}`

  fetch(fullUrl)
  .then(res => console.log("fetch data...") || res.json())
  .then(data => {
    console.log(data)
    const quoteObj = data[0]
    let quoteAuthor
    // console.log(quoteObj)

    const quoteBody = quoteObj.content

    if (typeof quoteObj.custom_meta !== "undefined" && typeof quoteObj.custom_meta.Source !== "undefined") {
      quoteAuthor = `<p>-- ${quoteObj.title}</p>`
      const quoteOrigin = `(${quoteObj.custom_meta.Source})`
      quoteAuthor += quoteOrigin
      quoteAuthorDiv.insertAdjacentHTML("beforeend", quoteAuthor)
      const originElem = document.querySelector("#quote-author>a")
      originElem.setAttribute("target", "_blank")
    } else {
      quoteAuthor = `<p>-- ${quoteObj.title}</p>`
      quoteAuthorDiv.insertAdjacentHTML("beforeend", quoteAuthor)
      // console.log("else", quoteAuthor)
    }
    quoteSpinner.remove()
    blockquote.insertAdjacentHTML("afterbegin", quoteBody)
  })
}

quoteButton.addEventListener("click", (e) => {
  e.preventDefault()
  fetchQuote()
});

fetchQuote()


