import React from 'react';
import SignUp from '../Components/SignUpLogIn/SignUp'
import Amplify from 'aws-amplify';

function Profile() {
    return (
        <div className="page">
            <SignUp/>
        </div>
    )
}

export default Profile;