interface IAudioTrack {
  title: string;
  src: string;
  duration: string;
}

const trackList: IAudioTrack[] = [
  {
    title: 'Ott - Cley Hill',
    src: './assets/sounds/Ott - Cley Hill.mp3',
    duration: '01:15',
  },
  {
    title: 'Ott - Roflcopter',
    src: './assets/sounds/Ott - Roflcopter.mp3',
    duration: '00:56',
  },
  {
    title: 'Ott - Escape From Tulse Hell',
    src: './assets/sounds/Ott - Escape From Tulse Hell.mp3',
    duration: '01:25',
  },
];
export default trackList;
