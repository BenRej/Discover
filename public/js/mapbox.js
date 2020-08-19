/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmVucmVqIiwiYSI6ImNrN240NnEyczA2dzIzZnBoOGc1cjgzcTEifQ.d5dImhLbe15PaKcpoh04Fw';

  var map = new mapboxgl.Map({
    // #map in tour
    container: 'map',
    style: 'mapbox://styles/benrej/ck7n4ywlh0oz31ip6bowx9izo',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      // Center the bottom of our el to point events
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
