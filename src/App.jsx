import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import arrow from "./images/icon-arrow.svg";
import background from "./images/bg.png";
import iconImage from "./components/icon"; // Ensure this path is correct
import "./App.css";

// Styled components
const MainContainer = styled.div`
  position: relative;
  height: 100%;
  font-family: "Rubik", sans-serif;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url(${background});
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  margin-top: 20px;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const InputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: 2;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 280px;
  height: 48px;
  padding: 0 15px;
  font-size: 14px;
  border: none;
  border-radius: 15px 0 0 15px;
  outline: none;

  @media (max-width: 768px) {
    width: 70%;
    border-radius: 15px;
  }
`;

const StyledButton = styled.button`
  width: 58px;
  height: 48px;
  background-color: #7e2121;
  border: none;
  border-radius: 0 15px 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #5c1717;
  }

  img {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    border-radius: 15px;
    margin-top: 10px;
  }
`;

const ResultArticle = styled.article`
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FrontContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FrontContentBlock = styled.div`
  text-align: center;
  flex: 1;
`;

const FrontContText = styled.h2`
  color: #969696;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const MapContainerStyled = styled(MapContainer)`
  margin-top: 20px;
  height: 600px;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

// Custom Leaflet Icon
const customIcon = new L.Icon({
  iconUrl: iconImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function App() {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [ip, setIp] = useState("");

  const getPublicIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    } catch (error) {
      setError("Error fetching public IP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ip) return;

    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_u8Zdl5BouYqkrEacibXgh8FMwkUTv&ipAddress=${ip}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setAddress(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAddress(null);
    }
  };

  useEffect(() => {
    getPublicIP();
  }, []);

  useEffect(() => {
    if (ip) {
      const fetchLocationData = async () => {
        try {
          const response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_u8Zdl5BouYqkrEacibXgh8FMwkUTv&ipAddress=${ip}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          setAddress(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchLocationData();
    }
  }, [ip]);

  return (
    <MainContainer>
      <BackgroundImage />
      <Center>
        <Title>IP Address Tracker</Title>
        <InputForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="ipaddress"
            id="ipaddress"
            placeholder="Search for any IP Address or domain"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
          <StyledButton type="submit">
            <img src={arrow} alt="Search" />
          </StyledButton>
        </InputForm>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {address && (
          <ResultArticle>
            <FrontContent>
              <FrontContentBlock>
                <FrontContText>IP ADDRESS</FrontContText>
                <p>{address.ip}</p>
              </FrontContentBlock>
              {address.location && (
                <FrontContentBlock>
                  <FrontContText>LOCATION</FrontContText>
                  <p>
                    {address.location.city}, {address.location.region}
                  </p>
                </FrontContentBlock>
              )}
              {address.location && (
                <FrontContentBlock>
                  <FrontContText>TIMEZONE</FrontContText>
                  <p>UTC {address.location.timezone}</p>
                </FrontContentBlock>
              )}
              <FrontContentBlock>
                <FrontContText>ISP</FrontContText>
                <p>{address.isp}</p>
              </FrontContentBlock>
            </FrontContent>
          </ResultArticle>
        )}
        {address && address.location && (
          <MapContainerStyled
            center={[address.location.lat, address.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              icon={customIcon}
              position={[address.location.lat, address.location.lng]}
            >
              <Popup>IP Location</Popup>
            </Marker>
          </MapContainerStyled>
        )}
      </Center>
    </MainContainer>
  );
}

export default App;
