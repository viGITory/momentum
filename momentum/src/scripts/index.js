import '../styles/style.scss';

// *** COMPONENTS ***
import ImageSlider from '../components/background/background';
import AudioPlayer from '../components/audio-player/audio-player';
import DateWidget from '../components/date/date-widget';
import Quotes from '../components/quotes/quotes';
import Weather from '../components/weather/weather';
import Settings from '../components/settings/settings';

// *** SELF-RATE ***
import './self-rate';

new DateWidget().init();
new Weather().init();
new Quotes().init();
new AudioPlayer().init();
new ImageSlider().init();
new Settings().init();
