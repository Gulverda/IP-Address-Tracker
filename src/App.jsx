import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from 'styled-components';
import arrow from "./images/icon-arrow.svg";
import background from "./images/bg.png";
import icon from "./components/icon";
import "./App.css";

const StyledButton = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 15px;
  background: #252525;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
`;

const ImportantText = styled.h1`
  color: #7e2121;
  font-family: Rubik;
  font-size: 31px;
  font-weight: 600;
`;

const FrontContText = styled.h2`
  color: var(--dark-gray, #969696);
  font-family: Rubik;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.3px;
`;

function App() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geo.ipify.org/api/v1?apiKey=YOUR_API_KEY"
        );
        const data = await response.json();
        setAddress(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Center>
      <div className="background">
        <img src={background} alt="" />
      </div>
      <article>
        <ImportantText>IP Address Tracker</ImportantText>
        <form className="input">
          <input
            type="text"
            name="ipaddress"
            id="ipaddress"
            placeholder="Search for any IP Address or domain"
            required
          />
          <StyledButton type="submit">
            <img src={arrow} alt="Search" />
          </StyledButton>
        </form>
      </article>
      {address && (
        <article>
          <div className="front-content">
            <div className="cont1">
              <FrontContText>IP ADDRESS</FrontContText>
              <p className="paragraph-for-front-cont">{address.ip}</p>
            </div>
            {address.location && (
              <div className="cont1">
                <FrontContText>LOCATION</FrontContText>
                <p className="paragraph-for-front-cont">
                  {address.location.city}, {address.location.region}
                </p>
              </div>
            )}
            {address.location && (
              <div className="cont1">
                <FrontContText>TIMEZONE</FrontContText>
                <p className="paragraph-for-front-cont">
                  UTC {address.location.timezone}
                </p>
              </div>
            )}
            <div className="cont1">
              <FrontContText>ISP</FrontContText>
              <p className="paragraph-for-front-cont">{address.isp}</p>
            </div>
          </div>
        </article>
      )}
      {address && address.location && (
        <MapContainer
          center={[
            address.location.lat,
            address.location.lng
          ]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100vw" }}
        >
          <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={icon}
            position={[
              address.location.lat,
              address.location.lng
            ]}
          >
            <Popup>A pretty CSS3 popup</Popup>
          </Marker>
        </MapContainer>
      )}
    </Center>
  );
}

export default App;
