import React from 'react';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as CatIcon } from '../../icons/cat.svg';
import { ReactComponent as AlienIcon } from '../../icons/alien.svg';
import { ReactComponent as PlanetIcon } from '../../icons/planet.svg';
import { ReactComponent as ShuttleIcon } from '../../icons/shuttle.svg';
import { ReactComponent as CogIcon } from '../../icons/cog.svg';

import { Link } from
"react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li class="logo">
                    <Link className="nav-link">
                        <span class="link-text logo-text">Grad Admissions</span>
                        <ArrowIcon />
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/">
                        <CatIcon />
                        <span className="link-text">Home</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/applicantSignup">
                        <CatIcon />
                        <span className="link-text">Applicant Signup</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/about">
                        <AlienIcon />
                        <span className="link-text">About</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link">
                        <PlanetIcon />
                        <span className="link-text">Space</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link">
                        <ShuttleIcon />
                        <span className="link-text">Shuttle</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link">
                        <CogIcon />
                        <span className="link-text">Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;