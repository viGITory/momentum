import playlist from '../../data/playlist';

export default class AudioPlayer {
  container: HTMLElement;
  audioPlayer: HTMLAudioElement;
  audioDuration!: HTMLSpanElement;
  progressTrackName!: HTMLParagraphElement;
  playerPlaylist!: HTMLUListElement;
  progressTime!: HTMLSpanElement;
  playButton!: HTMLButtonElement;
  prevButton!: HTMLButtonElement;
  nextButton!: HTMLButtonElement;
  progressBar!: HTMLInputElement;
  volumeButton!: HTMLButtonElement;
  volumeBar!: HTMLInputElement;

  currentVolume: number;
  currentTrack: number;

  playIcon: string;
  pauseIcon: string;
  volumeIcon: string;
  muteIcon: string;

  constructor() {
    this.container = document.createElement('section') as HTMLElement;
    this.container.classList.add('section', 'audio-player');
    this.container.id = 'section-player';

    this.audioPlayer = new Audio() as HTMLAudioElement;
    this.audioPlayer.volume = 0.5;
    this.currentVolume = this.audioPlayer.volume;
    this.currentTrack = 0;

    this.playIcon =
      '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M 32 0 C 14.327 0 0 14.327 0 32 s 14.327 32 32 32 s 32 -14.327 32 -32 S 49.673 0 32 0 Z m 0 58 C 17.641 58 6 46.359 6 32 S 17.641 6 32 6 s 26 11.641 26 26 s -11.641 26 -26 26 Z m -8 -40 l 24 14 l -24 14 Z" /></svg>';
    this.pauseIcon =
      '<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M 32 0 C 14.327 0 0 14.327 0 32 s 14.327 32 32 32 s 32 -14.327 32 -32 S 49.673 0 32 0 Z m 0 58 C 17.641 58 6 46.359 6 32 S 17.641 6 32 6 s 26 11.641 26 26 s -11.641 26 -26 26 Z M 20 20 h 8 v 24 h -8 Z m 16 0 h 8 v 24 h -8 Z" /></svg>';
    this.volumeIcon =
      '<svg viewBox="0 0 36 30" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M 18.333 0 c -0.451 0 -0.842 0.156 -1.173 0.47 L 8.49 8.683 H 1.666 c -0.452 0 -0.842 0.157 -1.172 0.47 c -0.33 0.312 -0.495 0.683 -0.495 1.11 v 9.472 c 0 0.427 0.165 0.798 0.495 1.11 c 0.33 0.313 0.721 0.47 1.172 0.47 H 8.49 l 8.671 8.215 c 0.33 0.313 0.72 0.469 1.173 0.469 c 0.452 0 0.842 -0.156 1.172 -0.47 c 0.33 -0.312 0.495 -0.681 0.495 -1.11 V 1.58 c 0 -0.428 -0.165 -0.798 -0.494 -1.11 c -0.33 -0.314 -0.72 -0.47 -1.172 -0.47 h -0.001 Z M 28.04 18.515 c 0.702 -1.081 1.053 -2.249 1.053 -3.505 c 0 -1.256 -0.351 -2.428 -1.053 -3.518 c -0.702 -1.09 -1.63 -1.858 -2.787 -2.304 a 1.387 1.387 0 0 0 -0.62 -0.124 c -0.428 0 -0.8 0.153 -1.114 0.458 a 1.513 1.513 0 0 0 -0.471 1.127 c 0 0.347 0.099 0.64 0.298 0.879 c 0.199 0.239 0.437 0.446 0.718 0.619 c 0.28 0.173 0.56 0.363 0.842 0.57 c 0.28 0.207 0.52 0.499 0.718 0.879 c 0.198 0.38 0.297 0.851 0.297 1.412 c 0 0.561 -0.1 1.032 -0.297 1.412 c -0.198 0.38 -0.437 0.673 -0.718 0.879 c -0.281 0.206 -0.562 0.397 -0.842 0.57 c -0.281 0.173 -0.52 0.38 -0.718 0.619 a 1.335 1.335 0 0 0 -0.298 0.879 c 0 0.446 0.158 0.821 0.47 1.127 a 1.55 1.55 0 0 0 1.116 0.459 c 0.247 0 0.454 -0.041 0.619 -0.124 c 1.156 -0.463 2.085 -1.235 2.787 -2.317 v 0.003 Z" /><path d="M 33.874 22.12 C 35.291 19.947 36 17.572 36 15 c 0 -2.571 -0.709 -4.944 -2.126 -7.122 c -1.417 -2.174 -3.292 -3.76 -5.624 -4.75 A 1.795 1.795 0 0 0 27.6 3 c -0.433 0 -0.809 0.16 -1.126 0.48 c -0.317 0.319 -0.474 0.696 -0.474 1.134 c 0 0.655 0.325 1.15 0.975 1.487 c 0.932 0.488 1.566 0.857 1.9 1.11 a 9.494 9.494 0 0 1 2.887 3.415 A 9.573 9.573 0 0 1 32.8 15 a 9.582 9.582 0 0 1 -1.038 4.375 a 9.494 9.494 0 0 1 -2.888 3.414 c -0.333 0.253 -0.966 0.622 -1.899 1.11 c -0.65 0.336 -0.975 0.83 -0.975 1.487 c 0 0.437 0.159 0.815 0.474 1.135 c 0.316 0.32 0.7 0.479 1.15 0.479 c 0.2 0 0.409 -0.043 0.625 -0.126 c 2.332 -0.992 4.208 -2.576 5.624 -4.752 l 0.001 -0.001 Z" /></svg>';
    this.muteIcon =
      '<svg viewbox="0 0 36 30" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="m 32.205 15 l 3.465 -3.465 c 0.22 -0.22 0.33 -0.488 0.33 -0.801 c 0 -0.314 -0.11 -0.582 -0.33 -0.802 L 34.068 8.33 c -0.22 -0.22 -0.488 -0.33 -0.802 -0.33 c -0.313 0 -0.581 0.11 -0.801 0.33 L 29 11.795 L 25.535 8.33 c -0.22 -0.22 -0.488 -0.33 -0.801 -0.33 c -0.314 0 -0.582 0.11 -0.802 0.33 L 22.33 9.932 c -0.22 0.22 -0.33 0.488 -0.33 0.802 c 0 0.313 0.11 0.581 0.33 0.801 L 25.795 15 l -3.465 3.465 c -0.22 0.22 -0.33 0.488 -0.33 0.801 c 0 0.314 0.11 0.582 0.33 0.802 l 1.602 1.602 c 0.22 0.22 0.488 0.33 0.802 0.33 c 0.313 0 0.581 -0.11 0.801 -0.33 L 29 18.205 l 3.465 3.465 c 0.22 0.22 0.487 0.33 0.801 0.33 c 0.315 0 0.582 -0.11 0.802 -0.33 l 1.602 -1.602 c 0.22 -0.22 0.33 -0.488 0.33 -0.802 c 0 -0.313 -0.11 -0.581 -0.33 -0.801 L 32.205 15 Z M 18.333 0 c -0.451 0 -0.842 0.156 -1.173 0.47 L 8.49 8.683 H 1.666 c -0.452 0 -0.842 0.157 -1.172 0.47 c -0.33 0.312 -0.495 0.683 -0.495 1.11 v 9.472 c 0 0.427 0.165 0.798 0.495 1.11 c 0.33 0.313 0.721 0.47 1.172 0.47 H 8.49 l 8.671 8.215 c 0.33 0.313 0.72 0.469 1.173 0.469 c 0.452 0 0.842 -0.156 1.172 -0.47 c 0.33 -0.312 0.495 -0.681 0.495 -1.11 V 1.58 c 0 -0.428 -0.165 -0.798 -0.494 -1.11 c -0.33 -0.314 -0.72 -0.47 -1.172 -0.47 h -0.001 Z" /></svg>';
  }

  public render(): HTMLElement {
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
            <button class="audio-player__button audio-player__button--prev" aria-label="player-prev">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M 32 64 c 17.673 0 32 -14.327 32 -32 S 49.673 0 32 0 S 0 14.327 0 32 s 14.327 32 32 32 Z m 0 -58 c 14.359 0 26 11.641 26 26 S 46.359 58 32 58 S 6 46.359 6 32 S 17.641 6 32 6 Z m 12 36 L 30 32 l 14 -10 Z m -16 0 L 14 32 l 14 -10 Z" /></svg>
            </button>
            <button class="audio-player__button audio-player__button--play" aria-label="player-play">
              ${this.playIcon}
            </button>
            <button class="audio-player__button audio-player__button--next" aria-label="player-next">
              <svg transform="rotate(180)" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M 32 64 c 17.673 0 32 -14.327 32 -32 S 49.673 0 32 0 S 0 14.327 0 32 s 14.327 32 32 32 Z m 0 -58 c 14.359 0 26 11.641 26 26 S 46.359 58 32 58 S 6 46.359 6 32 S 17.641 6 32 6 Z m 12 36 L 30 32 l 14 -10 Z m -16 0 L 14 32 l 14 -10 Z" /></svg>
            </button>
          </div>
          <div class="audio-player__volume">
            <button class="audio-player__button audio-player__button--volume" aria-label="player-volume">
              ${this.volumeIcon}
            </button>
            <input class="audio-player__volume-bar" type="range" value="50" min="0" max="100" step="1" aria-label="volume">
          </div>
        </div>
      </div>
      <ul class="audio-player__playlist"></ul>
    `;

    return this.container;
  }

  private getElements(): void {
    this.audioDuration = this.container.querySelector(
      '.audio-player__duration'
    ) as HTMLSpanElement;
    this.progressTrackName = this.container.querySelector(
      '.audio-player__name'
    ) as HTMLParagraphElement;
    this.playerPlaylist = this.container.querySelector(
      '.audio-player__playlist'
    ) as HTMLUListElement;
    this.progressTime = this.container.querySelector(
      '.audio-player__time'
    ) as HTMLSpanElement;
    this.playButton = this.container.querySelector(
      '.audio-player__button--play'
    ) as HTMLButtonElement;
    this.prevButton = this.container.querySelector(
      '.audio-player__button--prev'
    ) as HTMLButtonElement;
    this.nextButton = this.container.querySelector(
      '.audio-player__button--next'
    ) as HTMLButtonElement;
    this.progressBar = this.container.querySelector(
      '.audio-player__progress'
    ) as HTMLInputElement;
    this.volumeButton = this.container.querySelector(
      '.audio-player__button--volume'
    ) as HTMLButtonElement;
    this.volumeBar = this.container.querySelector(
      '.audio-player__volume-bar'
    ) as HTMLInputElement;
  }

  private createPlaylist(): void {
    playlist.forEach((item) => {
      const track = document.createElement('li') as HTMLLIElement;

      track.classList.add('audio-player__track');
      this.audioPlayer.src = playlist[this.currentTrack]!.src;
      this.audioDuration.textContent = playlist[this.currentTrack]!.duration;
      this.progressTrackName.textContent = playlist[this.currentTrack]!.title;

      this.playerPlaylist.append(track);
      track.textContent = item.title;
    });
  }

  private playAudio(): void {
    const tracks = this.container.querySelectorAll('.audio-player__track');

    this.audioDuration.textContent = playlist[this.currentTrack]!.duration;
    this.progressTrackName.textContent = playlist[this.currentTrack]!.title;

    if (this.audioPlayer.paused) {
      tracks[this.currentTrack]!.classList.remove('js-track-stop');
      tracks[this.currentTrack]!.classList.add('js-track-play');
      this.playButton.innerHTML = this.pauseIcon;
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
      tracks[this.currentTrack]!.classList.add('js-track-stop');
      tracks[this.currentTrack]!.classList.remove('js-track-play');
      this.playButton.innerHTML = this.playIcon;
    }
  }

  private showAudioProgress = (): void => {
    const currentMinutes =
      Math.floor(this.audioPlayer.currentTime / 60) < 10
        ? `0${Math.floor(this.audioPlayer.currentTime / 60)}`
        : Math.floor(this.audioPlayer.currentTime / 60);

    const currentSeconds =
      Math.floor(this.audioPlayer.currentTime % 60) < 10
        ? `0${Math.floor(this.audioPlayer.currentTime % 60)}`
        : Math.floor(this.audioPlayer.currentTime % 60);

    this.progressTime.textContent = `${currentMinutes}:${currentSeconds}`;
    this.progressBar.value = `${
      Math.floor(this.audioPlayer.currentTime) /
        (Math.floor(this.audioPlayer.duration) / 100) || 0
    }`;
    this.progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${this.progressBar.value}%, #fff ${this.progressBar.value}%, #fff 100%)`;
  };

  private changeAudioTime(): void {
    this.audioPlayer.currentTime =
      this.audioPlayer.duration * (+this.progressBar.value / 100);
  }

  private сhangeVolume = (): void => {
    const volume = +this.volumeBar.value / 100;
    this.audioPlayer.volume = volume;

    if (this.audioPlayer.volume !== 0) {
      this.currentVolume = this.audioPlayer.volume;
    }

    if (this.audioPlayer.volume === 0) {
      this.volumeButton.innerHTML = this.muteIcon;
    } else {
      this.volumeButton.innerHTML = this.volumeIcon;
    }

    this.volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
      volume * 100
    }%, #ff4040 ${volume * 100}%,  #fff ${volume * 100}%, #fff 100%)`;
  };

  private muteVolume = (): void => {
    if (this.audioPlayer.volume === 0) {
      this.audioPlayer.volume = this.currentVolume;
      this.volumeBar.value = `${this.audioPlayer.volume * 100}`;
      this.volumeButton.innerHTML = this.volumeIcon;
      this.volumeBar.style.background = `linear-gradient(to right, #ff4040 ${
        this.currentVolume * 100
      }%, #ff4040 ${this.currentVolume * 100}%,  #fff ${
        this.currentVolume * 100
      }%, #fff 100%)`;
    } else {
      this.audioPlayer.volume = 0;
      this.volumeBar.value = '0';
      this.volumeButton.innerHTML = this.muteIcon;
      this.volumeBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 0%, #fff 0%, #fff 100%)`;
    }
  };

  private addListeners(): void {
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

      this.audioPlayer.src = playlist[this.currentTrack]!.src;

      tracks.forEach((item) => item.classList.remove('js-track-play'));
      this.playAudio();
    });

    this.nextButton.addEventListener('click', () => {
      if (this.currentTrack === playlist.length - 1) {
        this.currentTrack = 0;
      } else {
        this.currentTrack += 1;
      }

      this.audioPlayer.src = playlist[this.currentTrack]!.src;

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

      this.audioPlayer.src = playlist[this.currentTrack]!.src;
      this.playAudio();
    });

    this.audioPlayer.addEventListener('timeupdate', this.showAudioProgress);

    this.progressBar.addEventListener('pointerdown', () => {
      this.audioPlayer.removeEventListener(
        'timeupdate',
        this.showAudioProgress
      );
      this.progressBar.addEventListener('input', () => {
        this.progressBar.style.background = `linear-gradient(to right, #ff4040 0%, #ff4040 ${this.progressBar.value}%, #fff ${this.progressBar.value}%, #fff 100%)`;
      });

      this.progressBar.addEventListener('pointerup', () => {
        this.changeAudioTime();
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

  public init(): void {
    this.getElements();
    this.createPlaylist();
    this.addListeners();
  }
}
