export default async function getQuotes(quoteId) {
  const quoteUrl = `https://genius-quotes.herokuapp.com/api/quotes/random?prev=${quoteId}`;

  const quoteRes = await fetch(quoteUrl);
  const quoteData = await quoteRes.json();

  return quoteData;
}
