import React from "react";

const CityList = ({ cities, onSelectCity, selectedCity }) => {
  return (
    <div className="city-list">
      {cities.map((city) => (
        <button
          key={city}
          className={`city-button ${selectedCity === city ? "selected" : ""}`}
          onClick={() => onSelectCity(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default CityList;
