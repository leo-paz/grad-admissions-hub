import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import { Link } from "react-router-dom";

function SignUp() {
    const goProfessorContainer = useRef(null);
    const goApplicantContainer = useRef(null);

    let professorArrow;
    let applicantArrow;

    useEffect(() => {
        professorArrow = lottie.loadAnimation({
            container: goProfessorContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/go-arrow.json'),
            name: 'professor'
        })

        applicantArrow = lottie.loadAnimation({
            container: goApplicantContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/go-arrow.json'),
            name: 'applicant'
        })
    }, [])

    return (
        <div className="center-container">
            <div className="sign-up">
                <Link to="/proflogin">
                    <img className="sign-up-img" src="professor.jpg"/>
                </Link>
                    <div className="sign-up-text">
                        <h1>I'm a Professor</h1>
                        <Link to="/proflogin">
                            <div 
                                className="sign-up-animation" 
                                ref={goProfessorContainer}
                                onMouseEnter={() => professorArrow.goToAndPlay(0, true)}
                                onMouseLeave={() => lottie.stop('professor')}
                            />
                        </Link>
                    </div>
                
            </div>
            <div className="sign-up">
                <Link to="/applicantSignup">
                    <img className="sign-up-img" src="students.jpg"/>
                </Link>
                    <div className="sign-up-text">
                        <h1>I'm a Student</h1>
                        <Link to="/applicantSignup">
                            <div 
                                className="sign-up-animation" 
                                ref={goApplicantContainer}
                                onMouseEnter={() => applicantArrow.goToAndPlay(0, true)}
                                onMouseLeave={() => lottie.stop('applicant')}
                            />
                        </Link>
                    </div>
                
            </div>
        </div>
    )
}

export default SignUp;