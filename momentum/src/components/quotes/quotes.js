import getQuotes from '../../api/quotes-api';

const quoteBtn = document.querySelector('.quotes__button');
const quoteText = document.querySelector('.quotes__text');
const quoteAuthor = document.querySelector('.quotes__author');
let quoteId;

async function setQuotes() {
  try {
    const quoteData = await getQuotes(quoteId);
    quoteId = quoteData.id;

    quoteText.classList.add('js-show-quote');

    quoteText.textContent = `"${quoteData.text}"`;
    quoteAuthor.textContent = quoteData.author;
  } catch (err) {
    quoteText.textContent = 'No quotes data';
  }
}
setQuotes();

quoteBtn.addEventListener('click', () => {
  quoteBtn.classList.add('js-rotate-btn');
});

quoteBtn.addEventListener('animationend', () => {
  quoteBtn.classList.remove('js-rotate-btn');
  quoteText.classList.remove('js-show-quote');
  setQuotes();
});
