const quoteBtn = document.querySelector('.quotes__button');
const quoteText = document.querySelector('.quotes__text');
const quoteAuthor = document.querySelector('.quotes__author');

const randomize = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

async function getQuotes() {
  const quotes = 'https://www.breakingbadapi.com/api/quotes';
  const res = await fetch(quotes);
  const data = await res.json();
  const quotesArr = [];

  data.forEach(item => quotesArr.push(item));

  randomize(quotesArr);

  quoteText.textContent = `"${quotesArr[0].quote}"`;
  quoteAuthor.textContent = quotesArr[0].author;
}
getQuotes();

document.addEventListener('onload', getQuotes);
quoteBtn.addEventListener('click', () => {
  quoteBtn.classList.add('js-rotate-btn');
  getQuotes();
});
quoteBtn.addEventListener('animationend', () => {
  quoteBtn.classList.remove('js-rotate-btn');
});
