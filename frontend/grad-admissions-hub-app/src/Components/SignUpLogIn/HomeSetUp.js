import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';

function HomeSetUp() {
     const goHomeContainer = useRef(null);

 useEffect(() => {
      lottie.loadAnimation({
            container: goHomeContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/go-arrow.json'),
            name: 'Home'
        })})

    return (
        <div className="Homesetup-card">
            <div className="goHomeContainer"
                        onMouseEnter={() => lottie.play('Home')}
                        onMouseLeave={() => lottie.stop('Home')}
                    >
           
            <img className="GradPhoto" src="GradHomePhoto.jpg" height={350} width ={585} />
             
            </div>
           <div className="center-card">
                
            </div>
        </div>
        
    )}
export default HomeSetUp;