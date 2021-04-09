import React, { useEffect, useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { Auth } from 'aws-amplify';

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';

import { UserContext } from '../App';

const majors = [
    'Engineering',
    'Arts',
    'Humanties',
    'Biology',
    'Computer Science'
]

const applicant1 = {
    name: 'donald bailey',
    email: 'waddup@fam.com',
    areasOfResearch: ['Biology', 'xxxxxx', 'xxxxxx xxxxxx', 'xxxxxxx xxxxxxxx'],
    graduationDate: '04/27/2021'
}

function Applicant() {
    const { userState, setUserState } = useContext(UserContext);
    const [applicant, setApplicant] = useState(applicant1);

    useEffect(() => {
        async function getApplicantById() {
            try {
                // TODO: Call backend with apollo client here
                // setApplicant(res)
            } catch (e) {
                console.log(e);
            }
        }
        getApplicantById();
    }, [])

    const handleLogOut = async (event) => {
        console.log("logout is clicked!");
        try {
          await Auth.signOut()
            .then((res) => {
                console.log("sign out successful", res);
                const newUser = {
                    loggedIn: false,
                    profile: '',
                    id: ''
                }
                setUserState(newUser);
            });
        } catch (error) {
          console.log('error signing in', error);
        }
    }

    return (
        <div className="profile-info-card">
            <h1>Applicant Profile</h1>
            <Input
                id="usernameField"
                placeholder="Full name"
                type="text"
                label="name"
                value={applicant.name}
                readOnly={true}
            />
            <Input
                placeholder="Email"
                type="text"
                label="email"
                value={applicant.email}
                readOnly={true}
            />
            <h2>Graduation Date</h2>
            <input
                type="Date"
                name="graduationdate"
                readOnly={true}
                value={applicant.graduationDate}
            />
            <h2>Majors</h2>
            <ul className="checkbox-list">
                {majors.map((elem, idx) => (
                    <li key= {elem} className="checkbox-item">
                        <Checkbox
                            key={idx}
                            name={elem}
                            disabled={true}
                            checked={true}
                        />
                    </li>
                ))}
            </ul>
            <div className="center-sign-out">
                <Button
                    onClick={handleLogOut}
                    text="Sign out"
                />
            </div>
        </div>
    )
}

export default Applicant;