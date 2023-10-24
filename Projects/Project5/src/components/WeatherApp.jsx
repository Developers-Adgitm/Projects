import React, { useState } from "react";
import "./WeatherApp.css";
import sicon from "../assets/search.png";
import cloudy from "../assets/cloudy.png";
import sunny from "../assets/sunny.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";
import wind from "../assets/windy.png";

const WeatherApp = () => {

    const [humidityValue, setHumidityValue] = useState('38');
    const [windValue, setWindValue] = useState('10');
    const [temperatureValue, setTemperatureValue] = useState('23');
    const [locationValue, setLocationValue] = useState('Delhi');

  let api_key = "9ef4ac9c0dea69264be4a9c5bdbbeb15";
  let [wicon, setWicon] = useState(sunny);


  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();

    // const humidity = document.getElementsByClassName("humidity-percent");
    // const wind = document.getElementsByClassName("wind-rate");
    // const temperature = document.getElementsByClassName("weather-temp");
    // const location = document.getElementsByClassName("weather-loc");

    // humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    // wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
    // temperature[0].innerHTML = data.main.temp + "°c";
    // location[0].innerHTML = data.name;
    setHumidityValue(data.main.humidity);
        setWindValue(data.wind.speed);
        setTemperatureValue(data.main.temp);
        setLocationValue(data.name);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(sunny);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudy);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow);
    } else {
      setWicon(cloudy);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon">
          <img src={sicon} alt="searchicon" onClick={search} />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" className="icon" />
      </div>
      <div className="weather-temp">{temperatureValue}°c</div>
      <div className="weather-loc">{locationValue}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-percent">{humidityValue}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{windValue}km/hr</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
