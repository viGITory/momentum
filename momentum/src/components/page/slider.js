import getImage from '../../api/image-api';

const page = document.querySelector('.page');
const arrowPrev = document.querySelector('.page__arrow--prev');
const arrowNext = document.querySelector('.page__arrow--next');
let randomNum = Math.floor(1 + Math.random() * 19);

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour >= 6 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
  else if (hour >= 18 && hour < 24) timeOfDay = 'evening';
  else timeOfDay = 'night';

  return timeOfDay;
};

async function setImage() {
  if (randomNum < 10) {
    randomNum = `0${randomNum}`;
  }

  try {
    const imageData = await getImage(getTimeOfDay(), randomNum);

    page.style.backgroundImage = `url(${URL.createObjectURL(imageData)}`;
  } catch (err) {}
}
setImage();

document.addEventListener('click', (event) => {
  if (event.target === arrowPrev) {
    if (randomNum <= 1) {
      randomNum = 20;
    } else {
      randomNum -= 1;
    }
    setImage();
  } else if (event.target === arrowNext) {
    if (randomNum === 20) {
      randomNum = 1;
    } else {
      randomNum = +randomNum + 1;
    }
    setImage();
  }
});
