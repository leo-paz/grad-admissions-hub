import React, { useState, useEffect, useRef } from "react";
import HomeSetUp from '../Components/SignUpLogIn/HomeSetUp'
import Clock from '../Components/Clock'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page">
    <h1>Welcome to the Graduate Admission Program</h1>
      <div className="login-container">
        <HomeSetUp></HomeSetUp> 
        <h2>A portal for students applying to a graduate program</h2>
        <h2>Go to "Profile" to login to get started!</h2>
        <Clock></Clock> 
      </div>
    </div>
  );
};

export default Home;
