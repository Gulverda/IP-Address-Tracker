import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from 'styled-components';
import arrow from "./images/icon-arrow.svg";
import background from "./images/bg.png";
import icon from "./components/icon";
import L from 'leaflet'; // Import Leaflet for creating a custom icon
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

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  z-index: -1;
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  border-radius: 15px 0 0 15px;
  border: none;
`;

const ResultArticle = styled.article`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
`;

const FrontContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const FrontContentBlock = styled.div`
  text-align: center;
`;

const customIcon = new L.Icon({
  iconUrl: icon, // Use the path to your custom icon image
  iconSize: [32, 32], // Icon size (width, height)
  iconAnchor: [16, 32], // Position of the icon's anchor point
  popupAnchor: [0, -32] // Position of the popup relative to the icon
});

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
      <BackgroundImage />
      <article>
        <ImportantText>IP Address Tracker</ImportantText>
        <InputForm className="input">
          <Input
            type="text"
            name="ipaddress"
            id="ipaddress"
            placeholder="Search for any IP Address or domain"
            required
          />
          <StyledButton type="submit">
            <img src={arrow} alt="Search" />
          </StyledButton>
        </InputForm>
      </article>
      {address && (
        <ResultArticle>
          <FrontContent>
            <FrontContentBlock>
              <FrontContText>IP ADDRESS</FrontContText>
              <p className="paragraph-for-front-cont">{address.ip}</p>
            </FrontContentBlock>
            {address.location && (
              <FrontContentBlock>
                <FrontContText>LOCATION</FrontContText>
                <p className="paragraph-for-front-cont">
                  {address.location.city}, {address.location.region}
                </p>
              </FrontContentBlock>
            )}
            {address.location && (
              <FrontContentBlock>
                <FrontContText>TIMEZONE</FrontContText>
                <p className="paragraph-for-front-cont">
                  UTC {address.location.timezone}
                </p>
              </FrontContentBlock>
            )}
            <FrontContentBlock>
              <FrontContText>ISP</FrontContText>
              <p className="paragraph-for-front-cont">{address.isp}</p>
            </FrontContentBlock>
          </FrontContent>
        </ResultArticle>
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
            icon={customIcon} // Use the custom icon
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
