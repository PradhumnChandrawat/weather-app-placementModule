import React from "react";
import "./WeatherApp.css";

const WeatherDetails = ({ data, onDelete }) => {
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    onDelete(newData);
  };

  return (
    <>
      <div className="details-conatiner">
        <table className="weather-details">
          <thead>
            <tr>
              <th>City</th>
              <th>Description</th>
              <th>Temperature (°C)</th>
              <th>Pressure (hPa)</th>
              <th>Data age (hrs)</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item, index) => (
                <tr key={index} className={item.highlight ? "highlighted" : ""}>
                  <td>{item.city}</td>
                  <td>
                    <input type="text" value={item.description} />
                  </td>
                  <td>{item.temperature}</td>
                  <td>{item.pressure}</td>
                  <td>{item.dataAge}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="centered">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WeatherDetails;
