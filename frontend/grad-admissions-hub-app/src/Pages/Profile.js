import React, { useEffect, useState } from 'react';
import SignUp from '../Components/SignUpLogIn/SignUp'

import Professor from './Professor';

import { Redirect } from 'react-router-dom';

import { Auth } from 'aws-amplify';
import Applicant from './Applicant';
import { fromPromise } from '@apollo/client';

function Profile() {
    const [user, setUser] = useState({
        loggedIn: false,
        id: '',
        profile: ''
    });

    useEffect(() => {

        async function getAuth() {
            try {
                await Auth.currentSession().then((res) => {
                    console.log(res);
                    const payload = res.idToken.payload;

                    const newUser = {
                        loggedIn: true,
                        profile: payload.profile,
                        id: payload.email
                    }
                    setUser(newUser);
                });
            } catch (e) {
                console.log(e);
            }
        }
        getAuth();

    }, [user.loggedIn])

    return (
        <div className="center-container">
            {(user.loggedIn && user.profile === "professor") && <Professor id={user.id}/>}
            {(user.loggedIn && user.profile === "applicant") && <Applicant id={user.id}/>}
            {!user.loggedIn && <SignUp/>}
        </div>
    )
}

export default Profile;