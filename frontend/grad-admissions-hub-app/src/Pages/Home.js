import React, { useState, useEffect, useRef } from "react";
import Clock from '../Components/Clock'
import lottie from 'lottie-web';

const Home = () => {
  const confettiContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: confettiContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('../animations/confetti.json'),
      name: 'confetti'
    })
  }, [])
  return (
    <div className="center-container">
      <div className="home-container">
        <div style={{textAlign: 'center', flexBasis: '100%'}}>
         <h1>Welcome to the Graduate Admission Hub!</h1>
        </div>
        <div className="fifty-percent-container">
          
          <img className="grad-photo" src="GradHomePhoto.jpg" />
        </div>
        <div className="fifty-percent-container">
          <h2>A portal for students applying to a graduate program. 

          </h2>
          <div
            onMouseEnter={() => lottie.play('confetti')}
            onMouseLeave={() => lottie.stop('confetti')}
            className="confetti-animation"
            ref={confettiContainer}
          />
          
        </div>
        <div style={{textAlign: 'center', flexBasis: '100%'}}>
          <h2>Go to "Profile" to login to get started!</h2>
          <Clock></Clock>
        </div>
      </div>
    </div>
  );
};

export default Home;
