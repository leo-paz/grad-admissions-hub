import React, { useState, useEffect, useRef } from "react";
import "./ProfLogin.css";
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import {useHistory} from "react-router";


const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;



const ProfLogin = () => {
    const history = useHistory();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            history.push('/');
        }
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            history.push('/');
        }
    });

    return (
        <div>
            <h4 className="mv3">
                {formState.login ? 'Professor Login' : 'Professor Sign Up'}
            </h4>
            <div className="flex flex-column">
                {!formState.login && (
                    <input className={"user"}
                        value={formState.name}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                name: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input className={"email"}
                    value={formState.email}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            email: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Your email address"
                />
                <input className={"password"}
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <button
                    className="pointermr2button"
                    onClick={formState.login ? login : signup}
                >
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button
                    className="pointerbutton"
                    onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                    }
                >
                    {formState.login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </button>
            </div>
        </div>
    );

};

export default ProfLogin;


