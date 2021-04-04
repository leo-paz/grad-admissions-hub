import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';

import { Auth } from 'aws-amplify';

const professor1 = {
    name: 'donald bailey',
    email: 'waddup@fam.com',
    areasOfResearch: ['Biology', 'xxxxxx', 'xxxxxx xxxxxx', 'xxxxxxx xxxxxxxx'],
}

const checkboxes = [
    'Machine Learning',
    'RTOS',
    'Materials and Structures',
    'Biomechanics'
]

function Professor({ id }) {
    const [professor, setProfessor] = useState(professor1);

    useEffect(() => {
        async function getProfessorById() {
            try {
                // TODO: Call backend with apollo client here
                // setProfessor(res)
            } catch (e) {
                console.log(e);
            }
        }
        getProfessorById();
    }, [])

    const handleLogOut = (e) => {
        Auth.signOut();
    }

    return (
        <div className="profile-info-card">
            <h1>Professor Profile</h1>
            <Input
                placeholder="Full name"
                type="text"
                label="name"
                value={professor.name}
                readOnly={true}
            />
            <Input
                placeholder="Email"
                type="text"
                label="email"
                value={professor.email}
                readOnly={true}
            />
            <h2>Areas of Research</h2>
            <ul className="checkbox-list">
                {checkboxes.map((elem, idx) => (
                    <li className="checkbox-item">
                        <Checkbox
                            key={idx}
                            name={elem}
                            disabled={true}
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

export default Professor;