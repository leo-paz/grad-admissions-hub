import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import DisplayProfile from '../Components/DisplayProfile';

const Settings = () => {
  return ( 
    <div className="page">
      <h1>Settings</h1>
      <DisplayProfile></DisplayProfile>
    </div>
  );
};

export default Settings;