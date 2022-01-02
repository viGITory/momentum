import playlist from '../../data/playlist';

export default class AudioPlayer {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'audio-player');
    this.container.id = 'section-player';

    this.audioPlayer = new Audio();
    this.audioPlayer.volume = 0.5;
    this.currentVolume = this.audioPlayer.volume;

    this.currentTrack = 0;
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Audio-player</h2>
      <div class="audio-player__controls">
        <div class="audio-player__top">
          <div class="audio-player__description">
            <p class="audio-player__name"></p>
            <div>
              <span class="audio-player__time">00:00</span>
              /
              <span class="audio-player__duration">00:00</span>
            </div>
          </div>
          <input class="audio-player__progress" type="range" value="0" min="0" max="100" step="1" aria-label="progress">
        </div>
        <div class="audio-player__center">
          <div class="audio-player__buttons">
            <button class="audio-player__button audio-player__button--prev">
              <span class="visually-hidden">Prev</span>
            </button>
            <button class="audio-player__button audio-player__button--play">
              <span class="visually-hidden">Play/pause</span>
            </button><button class="audio-player__button audio-player__button--next">
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <div class="audio-player__volume">
            <button class="audio-player__button audio-player__button--volume">
              <span class="visually-hidden">Volume</span>
            </button>
            <input class="audio-player__volume-bar" type="range" value="50" min="0" max="100" step="1" aria-label="volume">
          </div>
        </div>
      </div>
      <ul class="audio-player__playlist"></ul>
    `;

    return this.container;
  }

  getElements() {
    this.audioDuration = this.container.querySelector(
      '.audio-player__duration'
    );
    this.progressTrackName = this.container.querySelector(
      '.audio-player__name'
    );
    this.playerPlaylist = this.container.querySelector(
      '.audio-player__playlist'
    );
    this.progressTime = this.container.querySelector('.audio-player__time');
    this.playButton = this.container.querySelector(
      '.audio-player__button--play'
    );
    this.prevButton = this.container.querySelector(
      '.audio-player__button--prev'
    );
    this.nextButton = this.container.querySelector(
      '.audio-player__button--next'
    );
    this.progressBar = this.container.querySelector('.audio-player__progress');
    this.volumeButton = this.container.querySelector(
      '.audio-player__button--volume'
    );
    this.volumeBar = this.container.querySelector('.audio-player__volume-bar');
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
    const tracks = this.container.querySelectorAll('.audio-player__track');

    this.audioDuration.textContent = playlist[this.currentTrack].duration;
    this.progressTrackName.textContent = playlist[this.currentTrack].title;

    if (this.audioPlayer.paused) {
      tracks[this.currentTrack].classList.remove('js-track-stop');
      tracks[this.currentTrack].classList.add('js-track-play');
      this.playButton.classList.add('js-play-btn');
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
      tracks[this.currentTrack].classList.add('js-track-stop');
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
    const tracks = this.container.querySelectorAll('.audio-player__track');

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
    this.getElements();
    this.createPlaylist();
    this.addListeners();
  }
}
