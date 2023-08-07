import "leaflet/dist/leaflet.css"
import arrow from "./images/icon-arrow.svg"
import background from "./images/bg.png"
import icon from "./components/icon"
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet"
function App() {
    return (
        <section>
            <div className="background">
                <img src={background} alt="" />
            </div>
            <article>
                <h1 className="title">IP Address Tracker</h1>
                <form action="" className="input">
                    <input type="text" name="ipaddress" id="ipaddress" placeholder="Search for any IP Address or domain" required/>
                    <button type="submit">
                        <img src={arrow} alt="" />
                    </button>
                </form>
            </article>
            <article>
                <div className="front-content">
                    <div className="cont1">
                        <h2 className="front-cont-txt">IP ADDRESS</h2>
                        <p className="paragraph-for-front-cont">192.212.174.101</p>
                    </div>
                    <div className="cont1">
                        <h2 className="front-cont-txt">TIMEZONE</h2>
                        <p className="paragraph-for-front-cont">192.212.174.101</p>
                    </div>
                    <div className="cont1">
                        <h2 className="front-cont-txt">LOCATION</h2>
                        <p className="paragraph-for-front-cont">192.212.174.101</p>
                    </div>
                    <div className="cont1">
                        <h2 className="front-cont-txt">ISP</h2>
                        <p className="paragraph-for-front-cont">192.212.174.101</p>
                    </div>
                </div>
            </article>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scroolWheelZoom={false}
                style={{height: "500px", width: "100vw"}}
            >
                <TileLayer attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker icon={icon} position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </section>
    )
}

export default App