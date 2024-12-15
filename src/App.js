import React, { useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// import './App.css';
const TOKEN = process.env.REACT_APP_TOKEN;
if (typeof TOKEN === 'undefined') {
  throw new Error('You need a mapBox Token');
}
function App() {
  const markers = [
    {
      description: 'San Francisco, USA',
      id: 1,
      longitude: -122.4,
      latitude: 37.8,
    },
    {
      description: 'Paris, France',
      id: 2,
      longitude: 2.3522,
      latitude: 48.8566,
    },
    {
      description: 'Tokyo, Japan',
      id: 3,
      longitude: 139.6917,
      latitude: 35.6895,
    },
    { description: 'London, UK', id: 4, longitude: -0.1276, latitude: 51.5074 },
    {
      description: 'Sydney, Australia',
      id: 5,
      longitude: 151.2093,
      latitude: -33.8688,
    },
    {
      description: 'New York, USA',
      id: 6,
      longitude: -74.006,
      latitude: 40.7128,
    },
    {
      description: 'Rome, Italy',
      id: 7,
      longitude: 12.4964,
      latitude: 41.9028,
    },
    { description: 'Dubai, UAE', id: 8, longitude: 55.2708, latitude: 25.2048 },
    {
      description: 'Bangalore, India',
      id: 9,
      longitude: 77.5946,
      latitude: 12.9716,
    },
  ];

  const [viewPort, setViewPort] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 2,
  });
  // //PopUP Hover

  // const popup = new mapboxgl.Popup({
  //   closeButton: false,
  //   closeOnClick: false,
  // });
  // mapRef.current.getCanvas().style.cursor = 'pointer';
  // const coordinates = e.features[0].geometry.coordinates.slice();
  // const description = e.features[0].properties.description;

  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <h1 className='text-3xl font-bold underline'>MY FIRST MAPBOX GL</h1>

      <Map
        mapboxAccessToken={TOKEN}
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewState)} // Mise à jour de viewPort sur les interactions
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/sofyarne/cm3rrfs0w007001r28ykqf1o4'
        doubleClickZoom={true}
        scrollZoom={true}
        interactive={true}
      >
        {markers.map((marker, index) => (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color='red'
            anchor='bottom'
            key={marker.id}
          >
            <div
              onMouseEnter={() => {
                console.log('Marker hovered:', marker);
                setPopupInfo({
                  longitude: marker.longitude,
                  latitude: marker.latitude,
                  description: marker.description,
                });
              }}
              onMouseLeave={() => setPopupInfo(null)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src='./pin.png'
                style={{ width: '30px', height: '30px' }}
                alt='marker'
              />
            </div>
          </Marker>
        ))}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor='top'
            closeButton={false}
            offset={[0, -10]}
          >
            <div>{popupInfo.description}</div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
