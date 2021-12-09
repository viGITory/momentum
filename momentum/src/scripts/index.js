import '../styles/style.scss';

// *** COMPONENTS ***
import ImageSlider from '../components/page/image-slider';
import AudioPlayer from '../components/audio-player/audio-player';
import DateWidget from '../components/date/date-widget';
import Quotes from '../components/quotes/quotes';
import '../components/weather/weather';

// *** SELF-RATE ***
import './self-rate';

new DateWidget().init();
new Quotes().init();
new AudioPlayer().init();
new ImageSlider().init();
