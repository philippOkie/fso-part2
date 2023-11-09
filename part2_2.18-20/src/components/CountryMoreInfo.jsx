import axios from "axios";
import { useState, useEffect } from "react";

const CountryMoreInfo = ({ props }) => {
  const [weather, setWeather] = useState({});
  const key = "3a02ae96ff0146c4b25155226230911";
  const api = "https://api.weatherapi.com/v1/current.json?key=";
  const url = api + key + "&q=" + props.capital;

  useEffect(() => {
    getWeather(props);
  }, []);

  const getWeather = async () => {
    try {
      const res = await axios.get(url);
      setWeather({
        temp: res.data.current.temp_c,
        wind: res.data.current.wind_kph,
        text: res.data.current.condition.text,
        icon: res.data.current.condition.icon,
      });
      // console.log(res.data);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  return (
    <div>
      <ul>
        <h2>
          {props.flag} {props.name.common}
        </h2>
        <p>capital {props.capital}</p>
        <p>area {props.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.keys(props.languages).map((language) => (
            <li key={language}>{props.languages[language]}</li>
          ))}
        </ul>
        <h2>Weather in {props.capital}</h2>
        {weather ? (
          <div>
            <p>temperature {weather.temp} c</p>
            <p>wind {weather.wind} kph</p>
            <p>{weather.text}</p>
            {/* <p>{weather.icon}</p> */}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </ul>
    </div>
  );
};

export default CountryMoreInfo;
