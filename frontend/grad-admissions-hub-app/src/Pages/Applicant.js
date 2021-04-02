import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import Button from '../Components/Button/Button';

function Applicant() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function getAuth() {
            try {
                await Auth.currentSession().then((res) => {
                    console.log(res);
                    setLoggedIn(true);
                });
            } catch (e) {
                console.log(e);
            }
        }
        getAuth();
    }, [loggedIn])

    const handleLogOut = (e) => {
        Auth.signOut();
    }

    return (
        <div className="page">
            <h1>Applicant details</h1>
            <Button
                onClick={handleLogOut}
                text="Sign out"
            />
        </div>
    )
}

export default Applicant;