import React, { useState, useEffect, useRef } from "react";

import Checkbox from '../Components/Checkbox/Checkbox';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';

import { Auth } from 'aws-amplify';

const ProfLogin = () => {

    const [state, setState] = useState({
        loggedIn: false,
        email: '',
        password: '',
        name: '',
        areasOfResearch: [],
        verifying: false,
        code: ''
    });

    useEffect(() => {
        async function getAuth() {
            let currUser;
            try {
                currUser = await Auth.currentSession().then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
            if (currUser) {
                setState({ ...state, loggedIn: true });
            }
        }
        getAuth();
    }, [])

    const checkboxes = [
        'Machine Learning',
        'RTOS',
        'Materials and Structures',
        'Biomechanics'
    ]

    const handleSubmit = async (event) => {

        const requestProf = `{
            "Professor": {
                "id": "${state.email}"
                "name": "${state.name}",
                "areasOfResearch": [${state.areasOfResearch}]
            }
        }`

        try {
            const { user } = await Auth.signUp({
                username: state.email,
                password: state.password,
                attributes: {
                    name: state.name,
                    profile: 'professor'
                    // other custom attributes 
                }
            })
            if (user) {
                const newState = { ...state, verifying: true }
                setState(newState);
                console.log(user);
                console.log("Successfully signed up!");

                fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
                    {
                        method: 'POST',
                        body: requestProf
                    })
            }
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    const handleVerify = async (event) => {
        try {
            const data = await Auth.confirmSignUp(state.email, state.code)
            if (data) {
                const newState = { ...state, verifying: false }
                setState(newState);
                console.log(data);
                console.log("Successfully verified");
            }
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    const onNameHandle = (event) => {
        const newState = { ...state, name: event.target.value };
        setState(newState);
    }

    const onCheckBoxChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked);
        if (event.target.checked) {
            const newState = { ...state, areasOfResearch: [...state.areasOfResearch, `"${event.target.name}"`] }
            const newState2 = { ...newState, areasOfResearch: Array.from(new Set(newState.areasOfResearch)) };
            setState(newState2);
        } else {
            const filtered = state.areasOfResearch.filter(function (value, index, arr) {
                return value != `"${event.target.name}"`;
            });
            const newState = { ...state, areasOfResearch: filtered };
            setState(newState);
            console.log(filtered);
        }
    }

    return (
        <div className="center-container flex-col">
            <div className="prof-sign-up-container" >
                <Input
                    placeholder="Full name"
                    onChange={onNameHandle}
                    type="text"
                    label="name"
                    value={state.name}
                />
                <Input
                    placeholder="Email"
                    onChange={(e) =>
                        setState({
                            ...state,
                            email: e.target.value
                        })
                    }
                    type="text"
                    label="email"
                    value={state.email}
                />
                <Input
                    placeholder="Password"
                    onChange={(e) =>
                        setState({
                            ...state,
                            password: e.target.value
                        })
                    }
                    type="password"
                    label="password"
                    value={state.password}
                />
                {/* <input
                    value={state.password}
                    onChange={(e) =>
                        setState({
                            ...state,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                /> */}
                <h2>Areas of Research</h2>
                <ul className="checkbox-list">
                    {checkboxes.map((elem, idx) => (
                        <li className="checkbox-item">
                            <Checkbox
                                key={idx}
                                name={elem}
                                onCheckBoxChange={onCheckBoxChange}
                            />
                        </li>
                    ))}
                </ul>
                <Button
                    onClick={handleSubmit}
                    text="Sign up"
                />
                {state.verifying && (
                    <div>
                        <Input
                            placeholder="Verification Code"
                            onChange={(e) =>
                                setState({
                                    ...state,
                                    code: e.target.value
                                })
                            }
                            type="text"
                            label="email"
                            value={state.code}
                        />
                        <Button
                            onClick={handleVerify}
                            text="Verify"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfLogin;


