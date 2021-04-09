import React, { useState, useEffect, useRef } from "react";
import { Auth } from 'aws-amplify';

import Checkbox from '../Components/Checkbox/Checkbox';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';

const ApplicantSignup = () => {

  const [state, setState] = useState({
    graduationDate: "",
    majors: []
  })

  const majors = [
    'Engineering',
    'Arts',
    'Humanties',
    'Biology',
    'Computer Science'
  ]

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (event) => {

    const requestBody = `{
      "Applicant": {
          "id": "${email}",
          "name": "${fullname}",
          "graduationDate": "${state.graduationDate}",
          "majors": [${state.majors}]
      }
    }`

    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name: state.name,
          profile: 'applicant'
          // other custom attributes 
        }
      });
      if (user) {
        console.log(user);
        console.log("Successfully signed up!");
        setVerifying(true);

        fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
          {
            method: 'POST',
            body: requestBody
          })
      }
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  //
  const onEmailChangeHandle = (event) => {
    setEmail(event.target.value);
  }

  const onNameChangeHandle = (event) => {
    setFullname(event.target.value); //
  }

  //
  const onPasswordChangeHandle = (event) => {
    setPassword(event.target.value);
  }

  const onDateChangeHandler = (event) => {
    console.log(event.target.value);
    const date = new Date(event.target.value);
    const newDate = "" + (parseInt(date.getDate()) + 1) + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
    const newState = { ...state, graduationDate: newDate };
    setState(newState);
  }

  const onCheckBoxChange = (event) => {
    if (event.target.checked) {
      const newState = { ...state, majors: [...state.majors, `"${event.target.name}"`] }
      const newState2 = { ...newState, majors: Array.from(new Set(newState.majors)) };
      setState(newState2);
    } else {
      const filtered = state.majors.filter(function (value, index, arr) {
        return value != `"${event.target.name}"`;
      });
      const newState = { ...state, majors: filtered };
      setState(newState);
      console.log(filtered);
    }
  }

  const handleVerify = async (event) => {
    try {
      const data = await Auth.confirmSignUp(email, code)
      if (data) {
        setVerifying(false)
        console.log(data);
        console.log("Successfully verified");
      }
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  return (
    <div className="center-container flex-col">
      <div className="prof-sign-up-container" >
        <Input
          placeholder="Full name"
          onChange={onNameChangeHandle}
          type="text"
          label="name"
          value={fullname}
        />
        <Input
          placeholder="Email"
          onChange={onEmailChangeHandle}
          type="text"
          label="email"
          value={email}
        />
        <Input
          placeholder="Password"
          onChange={onPasswordChangeHandle}
          type="password"
          label="password"
          value={password}
        />
        <h2>Expected Graduation Date</h2>
        <input
          type="Date"
          name="graduationdate"
          onChange={onDateChangeHandler}
        />
        <h2>Majors</h2>
        <ul className="checkbox-list">
          {majors.map((elem, idx) => (
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
        {verifying && (
          <div>
            <Input
              placeholder="Verification Code"
              onChange={(e) => setCode(e.target.value)}
              type="text"
              label="email"
              value={code}
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



export default ApplicantSignup;
