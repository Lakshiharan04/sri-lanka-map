import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./background01.jpg"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="content">
          <h1 className="title" style={{ color: 'white' }}>Welcome To Lanka's Online Weather Station </h1>
          <p className="description2" style={{ color: 'white' }}>Introducing Real-Time Weather Mapping

            Welcome to the enhanced Sri Lankan Department of Meteorology website! We are excited to announce the launch of our real-time weather map, providing you with up-to-the-minute insights into the country's weather conditions.

            Our upgraded system utilizes data  from an extensive network of IoT weather stations strategically placed across the island. With this advanced technology, we now offer real-time updates on three crucial metrics:

            1. Temperature: Stay informed about the current temperature across different regions of Sri Lanka, helping you plan your activities accordingly.

            2. Humidity: Understand the level of moisture in the air, aiding in decisions related to outdoor events, agriculture, and more.

            3. Air Pressure: Monitor changes in atmospheric pressure, which can impact weather patterns and influence various aspects of daily life.

            Accessible directly from our homepage, this dynamic weather map empowers you to make informed decisions based on the latest meteorological data. Whether you're a resident, traveler, or weather enthusiast, our real-time updates ensure that you're always prepared for whatever Mother Nature has in store.

            Experience the power of real-time weather mapping with the Sri Lankan Department of Meteorology. Explore now and stay ahead of the weather!</p>
          <p className="description" style={{ color: 'white' }}>Click on the link below to view the Sri Lanka Map:</p>
          <Link to="/srilanka" className="map-link">
            <img src="https://doa.gov.lk/wp-content/uploads/2023/05/pH_Interpolated.png" alt="Sri Lanka Map" className="map-image" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
