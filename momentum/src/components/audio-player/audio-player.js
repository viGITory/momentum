import playlist from './playlist';

export default class AudioPlayer {
  constructor() {
    this.playButton = document.querySelector('.audio-player__button--play');
    this.prevButton = document.querySelector('.audio-player__button--prev');
    this.nextButton = document.querySelector('.audio-player__button--next');
    this.volumeButton = document.querySelector('.audio-player__button--volume');
    this.progressBar = document.querySelector('.audio-player__progress');
    this.progressTrackName = document.querySelector('.audio-player__name');
    this.progressTime = document.querySelector('.audio-player__time');
    this.audioDuration = document.querySelector('.audio-player__duration');
    this.volumeBar = document.querySelector('.audio-player__volume-bar');
    this.playerPlaylist = document.querySelector('.audio-player__playlist');

    this.audioPlayer = new Audio();
    this.audioPlayer.volume = 0.5;
    this.currentVolume = this.audioPlayer.volume;

    this.currentTrack = 0;
  }

  createPlaylist() {
    playlist.forEach((item) => {
      const track = document.createElement('li');

      track.classList.add('audio-player__track');
      this.audioPlayer.src = playlist[this.currentTrack].src;
      this.audioDuration.textContent = playlist[this.currentTrack].duration;
      this.progressTrackName.textContent = playlist[this.currentTrack].title;

      this.playerPlaylist.append(track);
      track.textContent = item.title;
    });
  }

  playAudio() {
    const tracks = document.querySelectorAll('.audio-player__track');

    this.audioDuration.textContent = playlist[this.currentTrack].duration;
    this.progressTrackName.textContent = playlist[this.currentTrack].title;

    if (this.audioPlayer.paused) {
      tracks[this.currentTrack].classList.add('js-track-play');
      this.playButton.classList.add('js-play-btn');
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
      tracks[this.currentTrack].classList.remove('js-track-play');
      this.playButton.classList.remove('js-play-btn');
    }
  }

  showAudioProgress = () => {
    const currentMinutes =
      Math.floor(this.audioPlayer.currentTime / 60) < 10
        ? `0${Math.floor(this.audioPlayer.currentTime / 60)}`
        : Math.floor(this.audioPlayer.currentTime / 60);

    const currentSeconds =
      Math.floor(this.audioPlayer.currentTime % 60) < 10
        ? `0${Math.floor(this.audioPlayer.currentTime % 60)}`
        : Math.floor(this.audioPlayer.currentTime % 60);

    this.progressTime.textContent = `${currentMinutes}:${currentSeconds}`;
    this.progressBar.value =
      Math.floor(this.audioPlayer.currentTime) /
        (Math.floor(this.audioPlayer.duration) / 100) || 0;
    this.progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${this.progressBar.value}%, #fff ${this.progressBar.value}%, #fff 100%)`;
  };

  changeAudioTime() {
    this.audioPlayer.currentTime =
      this.audioPlayer.duration * (this.progressBar.value / 100);
  }

  сhangeVolume = () => {
    const volume = this.volumeBar.value / 100;
    this.audioPlayer.volume = volume;

    if (this.audioPlayer.volume !== 0) {
      this.currentVolume = this.audioPlayer.volume;
    }

    if (this.audioPlayer.volume === 0) {
      this.volumeButton.style.backgroundImage = 'url(assets/svg/mute.svg)';
    } else {
      this.volumeButton.style.backgroundImage =
        'url(assets/svg/volume-btn.svg)';
    }

    this.volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
      volume * 100
    }%, #ff4040 ${volume * 100}%,  #fff ${volume * 100}%, #fff 100%)`;
  };

  muteVolume = () => {
    if (this.audioPlayer.volume === 0) {
      this.audioPlayer.volume = this.currentVolume;
      this.volumeBar.value = this.audioPlayer.volume * 100;
      this.volumeButton.style.backgroundImage =
        'url(assets/svg/volume-btn.svg)';
      this.volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
        this.currentVolume * 100
      }%, #ff4040 ${this.currentVolume * 100}%,  #fff ${
        this.currentVolume * 100
      }%, #fff 100%)`;
    } else {
      this.audioPlayer.volume = 0;
      this.volumeBar.value = 0;
      this.volumeButton.style.backgroundImage = 'url(assets/svg/mute.svg)';
      this.volumeBar.style.background = `linear-gradient(to right,  #ff4040 0%, #ff4040 0%, #fff 0%, #fff 100%)`;
    }
  };

  addListeners() {
    const tracks = document.querySelectorAll('.audio-player__track');

    this.playButton.addEventListener('click', () => {
      this.playAudio();
    });

    this.prevButton.addEventListener('click', () => {
      if (this.currentTrack <= 0) {
        this.currentTrack = playlist.length - 1;
      } else {
        this.currentTrack -= 1;
      }

      this.audioPlayer.src = playlist[this.currentTrack].src;

      tracks.forEach((item) => item.classList.remove('js-track-play'));
      this.playAudio();
    });

    this.nextButton.addEventListener('click', () => {
      if (this.currentTrack === playlist.length - 1) {
        this.currentTrack = 0;
      } else {
        this.currentTrack += 1;
      }

      this.audioPlayer.src = playlist[this.currentTrack].src;

      tracks.forEach((item) => item.classList.remove('js-track-play'));
      this.playAudio();
    });

    this.audioPlayer.addEventListener('ended', () => {
      if (this.currentTrack === playlist.length - 1) {
        this.currentTrack = 0;
      } else {
        this.currentTrack += 1;
      }

      tracks.forEach((item) => item.classList.remove('js-track-play'));

      this.audioPlayer.src = playlist[this.currentTrack].src;
      this.playAudio();
    });

    this.audioPlayer.addEventListener('timeupdate', this.showAudioProgress);

    this.progressBar.addEventListener('pointerdown', () => {
      this.audioPlayer.removeEventListener(
        'timeupdate',
        this.showAudioProgress
      );
      this.progressBar.addEventListener('input', () => {
        this.progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${this.progressBar.value}%,  #fff ${this.progressBar.value}%, #fff 100%)`;
      });

      this.progressBar.addEventListener('pointerup', (event) => {
        this.changeAudioTime(event);
        this.audioPlayer.addEventListener('timeupdate', this.showAudioProgress);
      });

      this.progressBar.addEventListener('touchend', () => {
        this.changeAudioTime();
        this.audioPlayer.addEventListener('timeupdate', this.showAudioProgress);
      });
    });

    this.volumeButton.addEventListener('click', this.muteVolume);
    this.volumeBar.addEventListener('change', this.сhangeVolume);
    this.volumeBar.addEventListener('input', this.сhangeVolume);
  }

  init() {
    this.createPlaylist();
    this.addListeners();
  }
}
