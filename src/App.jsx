import './App.css';

function App() {
  return (
    <div className="App">
      <div className="center">
      <input id="search-input" type="text" placeholder="Search for a location" />

        <div className="content">
          <h1>IP Address Tracker</h1>
          <div className="content-data">
            <div className="ip-address"></div>
            <div className="location"></div>
            <div className="timezone"></div>
            <div className="isp"></div>
          </div>
        </div>
      </div>
      <div id="map"></div>

    </div>
  );
  
  
}

export default App;
