import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

import Input from '../Input/Input';
import Button from '../Button/Button';

import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const goProfessorContainer = useRef(null);
    const goApplicantContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: goProfessorContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/go-arrow.json'),
            name: 'professor'
        })

        lottie.loadAnimation({
            container: goApplicantContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/go-arrow.json'),
            name: 'applicant'
        })
    }, [login])

    const handleLogInButton = async (event) => {
        console.log("login is clicked!");
    
        try {
          await Auth.signIn(email, password)
            .then((response) => {
              console.log("sign in successful", response);
            });
        } catch (error) {
          console.log('error signing in', error);
        }
      }

    return (
        <div className="center-container">
            {login && (
                <div className="login-container" >
                    <Input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        label="email"
                        value={email}
                    />
                    <Input
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label="password"
                        value={password}
                    />
                    <Button
                        style={{"margin-top": "20px"}}
                        onClick={handleLogInButton}
                        text="Login"
                    />
                </div>
            )}
            {!login && (
                <div className="sign-up-boxes">
                    <div className="sign-up">
                        <Link to="/proflogin">
                            <img className="sign-up-img" src="professor.jpg" />
                        </Link>
                        <div className="sign-up-text">
                            <h1>I'm a Professor</h1>
                            <Link to="/proflogin">
                                <div
                                    className="sign-up-animation"
                                    ref={goProfessorContainer}
                                    onMouseEnter={() => lottie.play('professor')}
                                    onMouseLeave={() => lottie.stop('professor')}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="sign-up">
                        <Link to="/applicantSignup">
                            <img className="sign-up-img" src="students.jpg" />
                        </Link>
                        <div className="sign-up-text">
                            <h1>I'm a Student</h1>
                            <Link to="/applicantSignup">
                                <div
                                    className="sign-up-animation"
                                    ref={goApplicantContainer}
                                    onMouseEnter={() => lottie.play('applicant')}
                                    onMouseLeave={() => lottie.stop('applicant')}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div className="sign-in-login-text">
                {!login ? (
                    <h2>Already have an account? <a className="login-link" onClick={() => setLogin(true)}>Login</a></h2>
                ) : (
                    <h2>Don't have an account? <a className="login-link" onClick={() => setLogin(false)}>Sign up</a></h2>
                )}
            </div>
        </div>
    )
}

export default SignUp;