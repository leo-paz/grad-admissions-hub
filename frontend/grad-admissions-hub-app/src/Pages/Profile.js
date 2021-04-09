import React, { useContext } from 'react';
import SignUp from '../Components/SignUpLogIn/SignUp'

import Professor from './Professor';

import Applicant from './Applicant';
import { fromPromise } from '@apollo/client';

import { UserContext } from '../App';

function Profile() {

    const { userState, setUserState } = useContext(UserContext);

    return (
        <div className="center-container">
            {(userState.loggedIn && userState.profile === "professor") && <Professor/>}
            {(userState.loggedIn && userState.profile === "applicant") && <Applicant/>}
            {!userState.loggedIn && <SignUp />}
        </div>
    )
}

export default Profile;