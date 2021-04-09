import React, { useEffect, useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';

import { Auth } from 'aws-amplify';
import { UserContext } from '../App';


import { LOAD_PROFS } from "../GraphQL/Queries";
import { useQuery, gql } from '@apollo/client';
//"9cc14e72-eca7-4528-b2b8-1ab6f16ce02a"

function getProfessorQuery(id){

    const PROF_QUERY = gql`
    {
        professorById(id: "${id}") {
            id
            name
        }
    }

    `;

    return PROF_QUERY;
}

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

function Professor() {
    const { userState, setUserState } = useContext(UserContext);
    const [professor, setProfessor] = useState(professor1);
    console.log("HEEERREE");
    console.log(userState.id);
    const { loading, error, data } = useQuery(getProfessorQuery(userState.id));

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data && data.professorById.name);

    /*
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
    */

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
            <h1>Professor Profile</h1>
            <Input
                placeholder="Full name"
                type="text"
                label="name"
                value={ data && data.professorById.name}
                //value={data.professorById.name}
                readOnly={true}
            />
            <Input
                placeholder="Email"
                type="text"
                label="email"

                value={userState.id}
                readOnly={true}
            />
            <h2>Areas of Research</h2>
            <ul className="checkbox-list">
                {checkboxes.map((elem, idx) => (
                    <li className="checkbox-item">
                        <Checkbox
                            key={idx}
                            name={elem}
                            readOnly={true}
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

export default Professor;