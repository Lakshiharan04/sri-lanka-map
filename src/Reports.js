import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemperatureChart from './TemperatureChart';
import WeatherDataList from './WeatherDataList'; 

const Reports = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, [filterOption]); 

  const fetchWeatherData = async () => {
    try {
      let url = 'https://weather-app-backend-jwdt.onrender.com/api/weather';
      if (filterOption) {
        url += `?filter=${filterOption}`;
      }
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  return (
    <div>
      <h1>Weather Reports</h1>
      <div>
        <button onClick={() => handleFilterChange('tempMoreThan32')}>Temperature more than 32°C</button>
        <button onClick={() => handleFilterChange('tempMoreThan29')}>Temperature more than 29°C</button>
        <button onClick={() => handleFilterChange('tempMoreThan21')}>Temperature more than 21°C</button>
        <button onClick={() => handleFilterChange('tempLowThan20')}>Temperature low than 20°C</button>
        <button onClick={() => handleFilterChange('')}>Clear Filter</button>
      </div>
      <div>
        <h2>Temperature Over Time</h2>
        <TemperatureChart data={weatherData} />
      </div>
      
      <WeatherDataList weatherData={weatherData} />
    </div>
  );
};

export default Reports;
