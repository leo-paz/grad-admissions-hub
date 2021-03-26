import React, { useState, useEffect, useRef } from "react";
import "./ProfLogin.css";
import { useHistory } from 'react-router';



const mystyle = {
    marginLeft: "100px"
};



const ProfLogin = () => {
    const history = useHistory();
    const [state, setState] = useState({
        login: true,
        email: '',
        password: '',
        name: '',
        areasOfResearch: []
    });


    const requestProf = `{
        "Professor": {
            "name": "${state.name}",
            "areasOfResearch": [${state.areasOfResearch}]
        }
    }`

    const handleButton = (event) => {
        console.log("signup is clicked!");
        fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",{
            method: 'POST',
            body: requestProf

        })
    }

    const onNameHandle = (event) => {
        const newState = {...state, name: event.target.value};
        setState(newState);
    }

    const onCheckBoxChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked);
        if(event.target.checked){
            const newState = {...state, areasOfResearch: [...state.areasOfResearch, `"${event.target.name}"`]}
            const newState2 = { ...newState, areasOfResearch: Array.from(new Set(newState.areasOfResearch))};
            setState(newState2);
        }else{
            const filtered = state.areasOfResearch.filter(function(value, index, arr){
                return value != `"${event.target.name}"`;
            });
            const newState = {...state, areasOfResearch: filtered};
            setState(newState);
            console.log(filtered);
        }
    }

    return (
        <div>
            <h4 className="mv3">
                {state.login ? 'Professor Login' : 'Professor Sign Up'}
            </h4>
            <div className="flex flex-column" style={mystyle}>
                {!state.login && (
                    <input
                        value={state.name}
                        onChange={onNameHandle}
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    value={state.email}
                    onChange={(e) =>
                        setState({
                            ...state,
                            email: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    value={state.password}
                    onChange={(e) =>
                        setState({
                            ...state,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                />
                <p></p>
                <label>
                    <input
                        type="Checkbox"
                        name="Machine Learning"
                        onChange={onCheckBoxChange}
                    />
                    <span>Machine Learning</span>
                </label>
                <label>
                    <input
                        type="Checkbox"
                        name="RTOS"
                        onChange={onCheckBoxChange}
                    />
                    <span>RTOS</span>
                </label>
                <label>
                    <input
                        type="Checkbox"
                        name="Materials and Structures"
                        onChange={onCheckBoxChange}
                    />
                    <span>Materials and Structures</span>
                </label>
                <label>
                    <input
                        type="Checkbox"
                        name="Biomechanics"
                        onChange={onCheckBoxChange}
                    />
                    <span>Biomechanics</span>
                </label>
                <p></p>
            </div>
            <div className="flex mt3" style={mystyle}>
                <button
                    className="pointer mr2 button"
                    onClick={handleButton}
                >
                    {state.login ? 'login' : 'create account'}
                </button>
                <button
                    className="pointer button"
                    onClick={(e) =>
                        setState({
                            ...state,
                            login: !state.login
                        })
                    }
                >
                    {state.login
                        ? 'Need an Account? Sign Up'
                        : 'Have an Account? Login'}
                </button>
            </div>
        </div>
    );
};

export default ProfLogin;


