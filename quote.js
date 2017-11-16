
// const quoteUrl = "http://quotesondesign.com/wp-json/posts"
// const query = "?method=getQuote"

const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const quoteUrl = "http://quotesondesign.com/wp-json/posts"
const query = "?filter[orderby]=rand&filter[posts_per_page]=1&callback="
// const query = "?filter[where]=rand&filter[posts_per_page]=1&callback="
// const query = "/1385"
const fullUrl = `${proxyUrl}${quoteUrl}${query}`
const blockquote = document.querySelector("#quote")
const quoteAuthorDiv = document.querySelector("#quote-author")

fetch(fullUrl)
.then(res => res.json())
.then(data => {
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
  
  blockquote.insertAdjacentHTML("afterbegin", quoteBody)
  
})

