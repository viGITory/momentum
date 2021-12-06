import trackList from './playlist';

const playBtn = document.querySelector('.audio-player__button--play');
const prevBtn = document.querySelector('.audio-player__button--prev');
const nextBtn = document.querySelector('.audio-player__button--next');
const volumeBtn = document.querySelector('.audio-player__button--volume');
const progressBar = document.querySelector('.audio-player__progress');
const progressTrackName = document.querySelector('.audio-player__name');
const progressTime = document.querySelector('.audio-player__time');
const audioDuration = document.querySelector('.audio-player__duration');

const playlist = document.querySelector('.audio-player__playlist');
const audioPlayer = new Audio();
let index = 0;

trackList.forEach((item) => {
  const track = document.createElement('li');

  track.classList.add('audio-player__track');
  audioPlayer.src = trackList[index].src;
  audioDuration.textContent = trackList[index].duration;
  progressTrackName.textContent = trackList[index].title;

  playlist.append(track);
  track.textContent = item.title;
});

const trackArr = document.querySelectorAll('.audio-player__track');

const playAudio = () => {
  audioDuration.textContent = trackList[index].duration;
  progressTrackName.textContent = trackList[index].title;

  if (audioPlayer.paused) {
    trackArr[index].classList.add('js-track-play');
    playBtn.classList.add('js-play-btn');
    audioPlayer.play();
  } else {
    audioPlayer.pause();
    trackArr[index].classList.remove('js-track-play');
    playBtn.classList.remove('js-play-btn');
  }
};

audioPlayer.addEventListener('ended', () => {
  if (index === trackList.length - 1) {
    index = 0;
  } else {
    index += 1;
  }

  trackArr.forEach((item) => item.classList.remove('js-track-play'));

  audioPlayer.src = trackList[index].src;
  playAudio();
});
playBtn.addEventListener('click', () => {
  playAudio();
});
prevBtn.addEventListener('click', () => {
  if (index <= 0) {
    index = trackList.length - 1;
  } else {
    index -= 1;
  }

  audioPlayer.src = trackList[index].src;

  trackArr.forEach((item) => item.classList.remove('js-track-play'));
  playAudio();
});
nextBtn.addEventListener('click', () => {
  if (index === trackList.length - 1) {
    index = 0;
  } else {
    index += 1;
  }

  audioPlayer.src = trackList[index].src;

  trackArr.forEach((item) => item.classList.remove('js-track-play'));
  playAudio();
});

// *** PROGRESS ***
const audioProgress = () => {
  const currentMinutes =
    Math.floor(audioPlayer.currentTime / 60) < 10
      ? `0${Math.floor(audioPlayer.currentTime / 60)}`
      : Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds =
    Math.floor(audioPlayer.currentTime % 60) < 10
      ? `0${Math.floor(audioPlayer.currentTime % 60)}`
      : Math.floor(audioPlayer.currentTime % 60);

  progressTime.textContent = `${currentMinutes}:${currentSeconds}`;
  progressBar.value =
    Math.floor(audioPlayer.currentTime) /
      (Math.floor(audioPlayer.duration) / 100) || 0;
  progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${progressBar.value}%, #fff ${progressBar.value}%, #fff 100%)`;
};

const changeAudioTime = () => {
  audioPlayer.currentTime = audioPlayer.duration * (progressBar.value / 100);
};

audioPlayer.addEventListener('timeupdate', audioProgress);
progressBar.addEventListener('pointerdown', () => {
  audioPlayer.removeEventListener('timeupdate', audioProgress);
  progressBar.addEventListener('input', () => {
    progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${progressBar.value}%,  #fff ${progressBar.value}%, #fff 100%)`;
  });

  progressBar.addEventListener('pointerup', (event) => {
    changeAudioTime(event);
    audioPlayer.addEventListener('timeupdate', audioProgress);
  });

  progressBar.addEventListener('touchend', () => {
    changeAudioTime();
    audioPlayer.addEventListener('timeupdate', audioProgress);
  });
});

// *** VOLUME ***
const volumeBar = document.querySelector('.audio-player__volume-bar');
audioPlayer.volume = 0.5;
let currentVolume = audioPlayer.volume;

const сhangeVolume = () => {
  const volume = volumeBar.value / 100;
  audioPlayer.volume = volume;

  if (audioPlayer.volume !== 0) currentVolume = audioPlayer.volume;

  volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
    volume * 100
  }%, #ff4040 ${volume * 100}%,  #fff ${volume * 100}%, #fff 100%)`;

  if (audioPlayer.volume === 0) {
    volumeBtn.style.backgroundImage = 'url(assets/svg/mute.svg)';
  } else {
    volumeBtn.style.backgroundImage = 'url(assets/svg/volume-btn.svg)';
  }
};

const muteVolume = () => {
  if (audioPlayer.volume === 0) {
    audioPlayer.volume = currentVolume;
    volumeBar.value = audioPlayer.volume * 100;
    volumeBtn.style.backgroundImage = 'url(assets/svg/volume-btn.svg)';
    volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
      currentVolume * 100
    }%, #ff4040 ${currentVolume * 100}%,  #fff ${
      currentVolume * 100
    }%, #fff 100%)`;
  } else {
    audioPlayer.volume = 0;
    volumeBar.value = 0;
    volumeBtn.style.backgroundImage = 'url(assets/svg/mute.svg)';
    volumeBar.style.background = `linear-gradient(to right,  #ff4040 0%, #ff4040 0%, #fff 0%, #fff 100%)`;
  }
};

volumeBtn.addEventListener('click', muteVolume);
volumeBar.addEventListener('change', сhangeVolume);
volumeBar.addEventListener('input', сhangeVolume);
