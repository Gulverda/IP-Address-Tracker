import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import "./Map.css"

function IPAddressTracker() {
  const defaultMapCenter = [37.7749, -122.4194]; // Default center for the map
  const [userIP, setUserIP] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const handleSearch = () => {
    // Replace this with your code to fetch data using the userIP
    // For example, you can use an IP geolocation API to get the coordinates based on the IP address
    // For now, we'll use a placeholder function to set the map center randomly
    const randomLatitude = Math.random() * 180 - 90;
    const randomLongitude = Math.random() * 360 - 180;
    setMapCenter([randomLatitude, randomLongitude]);
  };

  const handleChange = (e) => {
    setUserIP(e.target.value);
  };
  
  const MemoizedIPAddressTracker = React.memo(IPAddressTracker);

  return (
    <div className="ip-address-tracker">
      <h1>IP Address Tracker</h1>
      <div>
        <input type="text" id="ipInput" placeholder="Search for any IP address" onChange={handleChange} />
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <MapContainer center={mapCenter} zoom={13} style={{ width: '100%', height: '400px' }}>
        <ChangeView center={mapCenter} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Add a Marker at the mapCenter */}
        <Marker position={mapCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div id="results">
        <h2>Results:</h2>
        <p>
          <strong>IP Address:</strong> <span id="ipAddress">{userIP}</span>
        </p>
        <p>
          <strong>Location:</strong> <span id="location"></span>
        </p>
        <p>
          <strong>Timezone:</strong> <span id="timezone"></span>
        </p>
        <p>
          <strong>ISP:</strong> <span id="isp"></span>
        </p>
      </div>
    </div>
  );
}

export default IPAddressTracker;
