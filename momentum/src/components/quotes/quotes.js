const quoteBtn = document.querySelector('.quotes__button');
const quoteText = document.querySelector('.quotes__text');
const quoteAuthor = document.querySelector('.quotes__author');
let id;

async function getQuotes() {
  const quote = `https://genius-quotes.herokuapp.com/api/quotes/random?prev=${id}`;
  const res = await fetch(quote);
  const data = await res.json();

  id = data.id;

  quoteText.textContent = `"${data.text}"`;
  quoteAuthor.textContent = data.author;
}
getQuotes();

quoteBtn.addEventListener('click', () => {
  quoteBtn.classList.add('js-rotate-btn');
  getQuotes();
});
quoteBtn.addEventListener('animationend', () => {
  quoteBtn.classList.remove('js-rotate-btn');
});
