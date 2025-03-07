import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Pcontext } from "../contexts/Pcontext";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { currentConfig } from "../config/config";
import axios from "axios";
import Qout from "../utils/Qout";
import Loading from "../utils/Loading";
import Comments from "../utils/Comments";

// Fix for default marker icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Searcherpin() {
  const [loading, setLoading] = useState(false);
  const { results, setQout, qout, setComments } = useContext(Pcontext);
  const { spin } = useParams();

  useEffect(() => {
    setQout({});
    setComments({});
  }, []);

  const weatherinfo = {
    temp_c: 0,
    condition: {
      text: "",
      icon: "",
      code: 0,
    },
    wind_kph: 0,
    humidity: 0,
  };
  const [wdata, setWdata] = useState(weatherinfo);

  if (!results.result || results.result.length === 0) {
    return (
      <div className="text-center text-2xl font-bold mt-6">
        No results found
      </div>
    );
  }

  const kresult = results.result.filter(
    (result) => Number(result.cpin) === Number(spin)
  );

  if (kresult.length === 0) {
    return (
      <div className="text-center text-2xl font-bold mt-6">
        No matching results found for pin code: {spin}
      </div>
    );
  }

  async function getWeather(lat, lon) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${currentConfig.weatherApi.apiKey}&q=${lat},${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("weather data", data);
    const winfo = {
      temp_c: data.current.temp_c,
      condition: data.current.condition,
      wind_kph: data.current.wind_kph,
      humidity: data.current.humidity,
    };
    setWdata(winfo);
  }

  async function getMoreInfo(lat, lon) {
    const url = `${currentConfig.apiUrl}/qchat`;
    try {
      console.log("Attempting request to:", url);
      setLoading(true);
      const response = await axios.post(url, {
        aiq: `Provide me the information about the place situated in the coordinates ${lat},${lon} in the following points: About: , known for: , Main occupational industry(s):, Cuisine:, Mayor:, Governer:, famous personalities: . The information should be very short points, no sentences`,
      });
      console.log("more info", response.data);
      setLoading(false);
      setQout(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Error fetching more info:", error);
      }
    }
  }

  return (
    <>
      <div className="w-[90%] m-auto mt-2 flex flex-row gap-2 justify-center items-start flex-wrap">
        {kresult.map((result) => (
          <div
            className="flex flex-row gap-2 justify-center items-start bg-amber-300/60 rounded-lg shadow-lg"
            key={result.cpin}
          >
            <div
              className="text-center text-sm font-bold text-black p-3 flex 
            flex-col gap-2 justify-start items-start rounded-lg bshadow"
            >
              <p className="text-left">
                <span className="text-white">City:</span> {result.city}
              </p>
              <p className="text-left">
                <span className="text-white">Pin Code:</span> {result.cpin}
              </p>
              <p className="text-left">
                <span className="text-white">State:</span> {result.state_name}
              </p>
              <p className="text-left">
                <span className="text-white">State Code:</span> {result.state}
              </p>
              <p className="text-left">
                <span className="text-white">Population:</span>{" "}
                {result.pop.toLocaleString()}
              </p>
              <p className="text-left">
                <span className="text-white">Coordinates:</span> {result.loc[0]}
                ,{result.loc[1]}
              </p>
              <div className="w-full h-[300px] relative">
                <MapContainer
                  center={[Number(result.loc[1]), Number(result.loc[0])]} // Fix lat/lon order
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ width: "100%", height: "300px" }} // Ensure height is explicitly set
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[Number(result.loc[1]), Number(result.loc[0])]}
                  >
                    <Popup>
                      {result.city}, {result.state_name}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div
              className="text-center text-lg font-bold text-black p-3 flex 
            flex-col gap-2 justify-start items-start rounded-lg bshadow 
            border-2 border-sky-900/10 shadow-sky-900/10 m-2 w-[240px]"
            >
              <div
                className="text-left cursor-pointer bg-amber-300/60 rounded-lg shadow-lg"
                onClick={() =>
                  getWeather(Number(result.loc[1]), Number(result.loc[0]))
                }
              >
                <span className="link_menu_items font-bold">🌞Weather</span>
              </div>
              {wdata.condition.text && (
                <>
                  <div className="text-left text-sm font-bold">
                    <span className="text-white">©️Temperature:</span>
                    {wdata.temp_c}°C
                  </div>
                  <div className="text-left text-sm font-bold">
                    <span className="text-white">🌤️Condition:</span>{" "}
                    {wdata.condition.text}
                  </div>
                  <div className="text-left text-sm font-bold">
                    <span className="text-white">💨Wind:</span> {wdata.wind_kph}{" "}
                    km/h
                  </div>
                  <div className="text-left text-sm font-bold">
                    <span className="text-white">💧Humidity:</span>{" "}
                    {wdata.humidity}%
                  </div>
                </>
              )}
            </div>
            <div
              className="text-center text-lg font-bold text-black p-3 flex 
            flex-col gap-2 justify-start items-start rounded-lg bshadow border-2 m-2
             shadow-sky-900/10 border-sky-900/10 w-[450px] overflow-auto"
            >
              <div
                className="text-left cursor-pointer bg-amber-300/60 rounded-lg shadow-lg"
                onClick={() => {
                  getMoreInfo(Number(result.loc[1]), Number(result.loc[0]));
                }}
              >
                <span className="link_menu_items font-bold">🔍More Info</span>
              </div>
              {loading ? <Loading /> : <Qout qout={qout} />}
            </div>
            <div
              className="text-center text-lg font-bold text-black p-3 flex 
            flex-col gap-2 justify-start items-start rounded-lg bshadow border-2 m-2
             shadow-sky-900/10 border-sky-900/10 w-[450px] overflow-auto"
            >
              <div
                className="text-left cursor-pointer rounded-lg "
                onClick={() => {
                  getMoreInfo(Number(result.loc[1]), Number(result.loc[0]));
                }}
              >
                <span className="link_menu_items font-bold">🧮Comments</span>
              </div>
              <Comments pin={spin} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Searcherpin;
