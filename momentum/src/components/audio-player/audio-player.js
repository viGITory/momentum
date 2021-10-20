import trackList from './playList.js';

const playBtn = document.querySelector('.audio-player__button--play');
const prevBtn = document.querySelector('.audio-player__button--prev');
const nextBtn = document.querySelector('.audio-player__button--next');

const playlist = document.querySelector('.audio-player__playlist');
const audioPlayer = new Audio();
let index = 0;

trackList.forEach(item => {
  const track = document.createElement('li');
  track.classList.add('audio-player__track');

  playlist.append(track);
  track.textContent = item.title;
});

const trackArr = document.querySelectorAll('.audio-player__track');

const playAudio = () => {
  if (audioPlayer.paused) {
    audioPlayer.src = trackList[index].src;
    trackArr[index].classList.add('js-track-play');
    audioPlayer.currentTime = 0;
    playBtn.classList.add('js-play-btn');
    audioPlayer.play();
  } else {
    audioPlayer.pause();
    trackArr[index].classList.remove('js-track-play');
    playBtn.classList.remove('js-play-btn');
  }
};

audioPlayer.addEventListener('ended', () => {
  index === trackList.length - 1 ? index = 0 : index++;
  trackArr.forEach(item => item.classList.remove('js-track-play'));
  playAudio();
});
playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', () => {
  index <= 0 ? index = trackList.length - 1 : index--;
  audioPlayer.src = trackList[index].src;

  trackArr.forEach(item => item.classList.remove('js-track-play'));
  playAudio();
});
nextBtn.addEventListener('click', () => {
  index === trackList.length - 1 ? index = 0 : index++;
  audioPlayer.src = trackList[index].src;

  trackArr.forEach(item => item.classList.remove('js-track-play'));
  playAudio();
});
