
// const quoteUrl = "http://quotesondesign.com/wp-json/posts"
// const query = "?method=getQuote"

const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const quoteUrl = "http://quotesondesign.com/wp-json/posts"
const query = "?filter[orderby]=rand&filter[posts_per_page]=1&callback="
const fullUrl = `${proxyUrl}${quoteUrl}${query}`
const blockquote = document.querySelector("#quote")
const quoteAuthorDiv = document.querySelector("#quote-author")

fetch(fullUrl)
.then(res => res.json())
.then(data => {
  const quoteObj = data[0]
  console.log(quoteObj)
  const quoteBody = quoteObj.content
  const quoteAuthor = `<p>-- ${quoteObj.title}</p>`
  blockquote.insertAdjacentHTML("afterbegin", quoteBody)
  quoteAuthorDiv.insertAdjacentHTML("beforeend", quoteAuthor)
})

