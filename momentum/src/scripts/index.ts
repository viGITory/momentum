import '../styles/leaflet/leaflet.css';
import '../styles/style.scss';

import './leaflet/leaflet';
import Page from '../components/page/page';

new Page().init();

// ### PWA ###
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').catch();
}
