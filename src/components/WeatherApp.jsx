import React, { useState } from "react";
import axios from "axios";
import CityList from "./CityList";
import WeatherDetails from "./WeatherDetails";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchWeather = async (city) => {
    const url = `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`;
    const response = await axios.get(url);
    console.log(response);
    const newWeatherData = {
      city,
      description: response.data.description,
      temperature: response.data.temp_in_celsius,
      pressure: response.data.pressure_in_hPa,
      dataAge: calculateDataAge(response.data.date_and_time),
    };
    setWeatherData([...weatherData, newWeatherData]);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    fetchWeather(city);
  };

  const calculateDataAge = (dateTime) => {
    const dataTime = new Date(dateTime);
    const now = new Date();
    return Math.floor((now - dataTime) / 3600000);
  };
  const handleSearch = () => {
    const index = weatherData.findIndex(
      (item) => item.city.toLowerCase() === searchText.toLowerCase()
    );
    if (index !== -1) {
      setTimeout(() => {
        const newData = [...weatherData];
        newData[index].highlight = false;
        setWeatherData(newData);
      }, 3000);

      const newData = [...weatherData];
      newData[index].highlight = true;
      setWeatherData(newData);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="search-div">
          <input
            type="text"
            placeholder="Search city"
            className="search"
            value={searchText}
            onChange={handleInputChange}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="weather-app">
          <CityList
            cities={["London", "New York", "Los Angeles", "Las Vegas"]}
            onSelectCity={handleSelectCity}
            selectedCity={selectedCity}
          />
          <WeatherDetails data={weatherData} onDelete={setWeatherData} />
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
