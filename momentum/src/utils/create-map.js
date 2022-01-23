export default function setMap(lat, lon) {
  document.querySelector('.weather__map-wrapper').innerHTML = `
    <div class="weather__map" id="map"></div>
  `;

  const map = L.map('map', {
    center: [lat, lon],
    zoom: 8,
    attributionControl: false,
    zoomControl: false,
  });

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/pantory/ckxn8k9633p8415rqenh18x11/draft/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFudG9yeSIsImEiOiJja3RvdWtrcTcwZ2JmMnVvYXhzcTJ1Ymx2In0.iHARQCH0cLkTZ2s52LQ-HQ',
    {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoicGFudG9yeSIsImEiOiJja3RvdWtrcTcwZ2JmMnVvYXhzcTJ1Ymx2In0.iHARQCH0cLkTZ2s52LQ-HQ',
    }
  ).addTo(map);
}
