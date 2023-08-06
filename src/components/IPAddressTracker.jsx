import React, { useState } from 'react';
import './Map.css';
import Map from './Map'; // Import the Map component

function IPAddressTracker() {
  const defaultMapCenter = [37.7749, -122.4194]; // Default center for the map
  const [userIP, setUserIP] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);

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

  return (
    <div className="ip-address-tracker">
      <h1>IP Address Tracker</h1>
      <div>
        <input type="text" id="ipInput" placeholder="Search for any IP address" onChange={handleChange} />
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Map center={mapCenter} />
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
