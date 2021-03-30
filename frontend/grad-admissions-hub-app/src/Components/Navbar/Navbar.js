import React, { useEffect, useRef } from 'react';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as CatIcon } from '../../icons/cat.svg';
import { ReactComponent as AlienIcon } from '../../icons/alien.svg';
import { ReactComponent as PlanetIcon } from '../../icons/planet.svg';
import { ReactComponent as ShuttleIcon } from '../../icons/shuttle.svg';
import { ReactComponent as CogIcon } from '../../icons/cog.svg';

import lottie from 'lottie-web';

import { Link } from "react-router-dom";

const Navbar = () => {
    const gradContainer = useRef(null);
    const homeContainer = useRef(null);
    const profileContainer = useRef(null);
    const applicationsContainer = useRef(null);
    const settingsContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: gradContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../animations/grad-student.json'),
            name: 'grad'
        })

        lottie.loadAnimation({
            container: homeContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/home.json'),
            name: 'home'
        })

        lottie.loadAnimation({
            container: profileContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/profile.json'),
            name: 'profile'
        })

        lottie.loadAnimation({
            container: applicationsContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/applications.json'),
            name: 'applications'
        })

        lottie.loadAnimation({
            container: settingsContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/settings.json'),
            name: 'settings'
        })

    }, [])

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li class="logo">
                    <Link className="nav-link">
                        <span class="link-text logo-text">Grad Admissions</span>
                        <div className="logo-animation-size" ref={gradContainer}/>
                        {/* <ArrowIcon /> */}
                    </Link>
                </li>
                <li 
                    class="nav-item"
                    onMouseEnter={() => lottie.play('home')}
                    onMouseLeave={() => lottie.stop('home')}
                >
                    <Link className="nav-link" to="/">
                        <div className="standard-nav-animation" ref={homeContainer}/>
                        {/* <CatIcon /> */}
                        <span className="link-text">Home</span>
                    </Link>
                </li>
                <li 
                    class="nav-item"
                    onMouseEnter={() => lottie.play('profile')}
                    onMouseLeave={() => lottie.stop('profile')}
                >
                    <Link className="nav-link" to="/signup">
                        <div className="standard-nav-animation" ref={profileContainer}/>
                        {/* <CatIcon /> */}
                        <span className="link-text">Profile</span>
                    </Link>
                </li>
                <li 
                    class="nav-item"
                    onMouseEnter={() => lottie.play('applications')}
                    onMouseLeave={() => lottie.stop('applications')}
                >
                    <Link className="nav-link" to="/about">
                        <div className="standard-nav-animation" ref={applicationsContainer}/>
                        {/* <AlienIcon /> */}
                        <span className="link-text">Applications</span>
                    </Link>
                </li>
                <li 
                    class="nav-item"
                    onMouseEnter={() => lottie.play('settings')}
                    onMouseLeave={() => lottie.stop('settings')}
                >
                    <Link className="nav-link">
                        <div className="standard-nav-animation" ref={settingsContainer}/>
                        {/* <CogIcon /> */}
                        <span className="link-text">Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;