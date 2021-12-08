import '../styles/style.scss';

// *** COMPONENTS ***
import ImageSlider from '../components/page/image-slider';
import '../components/audio-player/audio-player';
import DateWidget from '../components/date/date-widget';
import Quotes from '../components/quotes/quotes';
import '../components/weather/weather';

// *** API ***
import '../api/weather-api';
import '../api/quotes-api';

// *** SELF-RATE ***
import './self-rate';

new DateWidget().init();
new Quotes().init();
new ImageSlider().init();
