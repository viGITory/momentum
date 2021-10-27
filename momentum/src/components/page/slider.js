const page = document.querySelector('.page');
const arrowPrev = document.querySelector('.page__arrow--prev');
const arrowNext = document.querySelector('.page__arrow--next');
let randomNum = Math.floor(1 + Math.random() * 19);

const getTimeOfDay = () => {
  let hour = new Date().getHours();

  return (hour >= 6 && hour < 12) ? 'morning' :
         (hour >= 12 && hour < 18) ? 'afternoon' :
         (hour >= 18 && hour < 24) ? 'evening' : 'night';
};

async function getImage() {
  randomNum < 10 ? randomNum = `0${randomNum}` : randomNum;

  const result = await fetch(`https://raw.githubusercontent.com/viGITory/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`);
  const blob = await result.blob();

  page.style.backgroundImage = `url(${URL.createObjectURL(blob)}`;
}
getImage();

document.addEventListener('click', (event) => {
  if (event.target === arrowPrev) {
    (randomNum <= 1) ? randomNum = 20 : randomNum--;
    getImage();
  } else if (event.target === arrowNext) {
    (randomNum === 20) ? randomNum = 1 : randomNum++;
    getImage();
  }
});
