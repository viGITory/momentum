const quoteBtn = document.querySelector('.quotes__button');
const quoteText = document.querySelector('.quotes__text');
const quoteAuthor = document.querySelector('.quotes__author');
let quoteId;

async function getQuotes() {
  const quoteUrl = `https://genius-quotes.herokuapp.com/api/quotes/random?prev=${quoteId}`;
  const quoteRes = await fetch(quoteUrl);

  if (quoteRes.status === 200) {
    const quoteData = await quoteRes.json();
    quoteId = quoteData.id;

    quoteText.textContent = `"${quoteData.text}"`;
    quoteAuthor.textContent = quoteData.author;
  } else {
    quoteText.textContent = 'Quote';
    quoteAuthor.textContent = "Author";
  }
}
getQuotes();

quoteBtn.addEventListener('click', () => {
  quoteBtn.classList.add('js-rotate-btn');
  getQuotes();
});
quoteBtn.addEventListener('animationend', () => {
  quoteBtn.classList.remove('js-rotate-btn');
});
