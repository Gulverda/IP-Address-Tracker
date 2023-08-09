import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import arrow from "./images/icon-arrow.svg";
import background from "./images/bg.png";
import icon from "./components/icon";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 15px;
  background: #252525;
`

const Center = styled.center`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`
const ImportantText = styled.title`
  display: flex;
  color: #7e2121;
  font-family: Rubik;
  font-size: 31px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
`

function App() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `
          https://geo.ipify.org/api/v2/country?apiKey=at_u8Zdl5BouYqkrEacibXgh8FMwkUTv&ipAddress=8.8.8.8`
        );
        const data = await res.json();
        setAddress(data);
        console.log(data);
      };

      getInitialData();
    } catch (error) {
      console.trace(error);
    }
  }, []);

  return (
    <Center className="center">
      <div className="background">
        <img src={background} alt="" />
      </div>
      <article>
        <ImportantText className="title">IP Address Tracker</ImportantText>
        <form action="" className="input">
          <input
            type="text"
            name="ipaddress"
            id="ipaddress"
            placeholder="Search for any IP Address or domain"
            required
          />
          <StyledButton type="submit">
            <img src={arrow} alt="" />
          </StyledButton>
        </form>
      </article>
      {address && (
        <article>
          <div className="front-content">
            <div className="cont1">
              <h2 className="front-cont-txt">IP ADDRESS</h2>
              <p className="paragraph-for-front-cont">{address.ip}</p>
            </div>
            {address.location && (
              <div className="cont1">
                <h2 className="front-cont-txt">LOCATION</h2>
                <p className="paragraph-for-front-cont">
                  {address.location.city}, {address.location.region}
                </p>
              </div>
            )}
            {address.location && (
              <div className="cont1">
                <h2 className="front-cont-txt">TIMEZONE</h2>
                <p className="paragraph-for-front-cont">
                  UTC {address.location.timezone}
                </p>
              </div>
            )}
            <div className="cont1">
              <h2 className="front-cont-txt">ISP</h2>
              <p className="paragraph-for-front-cont">{address.isp}</p>
            </div>
          </div>
        </article>
      )}
      {address && (
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100vw" }}
        >
          <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={icon} position={[51.505, -0.09]}>
            <Popup>A pretty CSS3 popup</Popup>
          </Marker>
        </MapContainer>
      )}
    </Center>
  );
}

export default App;
