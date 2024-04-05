import React from 'react';

const WeatherDataList = ({ weatherData }) => {
  return (
    <div className="weather-data-list">
      {weatherData.map((data, index) => (
        <div className="weather-card" key={index}>
          <div className="card-content">
            <h2>District: {data.district}</h2>
            <div className="divider"></div>
            <p>Temperature: {data.temperature}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Air Pressure: {data.airPressure}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDataList;
