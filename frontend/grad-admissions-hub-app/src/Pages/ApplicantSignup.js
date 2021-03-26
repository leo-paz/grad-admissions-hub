import React, { useState, useEffect, useRef } from "react";
import { Auth } from 'aws-amplify';

const ApplicantSignup = () => {

    const [state, setState] = useState({
        name: "",
        graduationDate:"",
        majors: []
    })

    //
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [loginUsername, setloginUsername] = useState("");
    const [loginPassword, setloginPassword] = useState("");

    const requestBody = `{
        "Applicant": {
            "name": "${state.name}",
            "graduationDate": "${state.graduationDate}",
            "majors": [${state.majors}]
        }
    }`

    //
    const onUsernameChangeHandle = (event) => {
      setUsername(event.target.value);
    }

    const onNameChangeHandle = (event) => {
        const newState = {...state, name: event.target.value};
        setState(newState);
        setFullname(event.target.value); //
    }

    //
    const onPasswordChangeHandle = (event) => {
      setPassword(event.target.value);
    }

    const onloginUsernameChangeHandle = (event) => {
      setloginUsername(event.target.value);
    }

    const onloginPasswordChangeHandle = (event) => {
      setloginPassword(event.target.value);
    }

    const onDateChangeHandler = (event) => {
        console.log(event.target.value);
        const date = new Date(event.target.value);
        const newDate = "" + (parseInt(date.getDate()) + 1) + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
        const newState = {...state, graduationDate: newDate};
        setState(newState);

    }

    const onCheckBoxChange = (event) => {
        if(event.target.checked){
          const newState = {...state, majors: [...state.majors, `"${event.target.name}"`]}
          const newState2 = { ...newState, majors: Array.from(new Set(newState.majors))};
          setState(newState2);
        }else{
            const filtered = state.majors.filter(function(value, index, arr){ 
                return value != `"${event.target.name}"`;
            });
            const newState = {...state, majors: filtered};
            setState(newState);
            console.log(filtered);
        }
    }

    const handleButton = async (event) => {

        console.log("signup is clicked!");

        console.log(requestBody);

        //
        try {
          const { user } = await Auth.signUp({
              username,
              password,
              attributes: {
                  name:fullname,
                                  // other custom attributes 
              }
          });
          console.log(user);
          console.log("Successfully signed up!");
          
          fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",{
            method: 'POST',
            body: requestBody

          })
      } catch (error) {
          console.log('error signing up:', error);
      }
    }

    const handleLogInButton = async (event) => {

      console.log("login is clicked!");

      //
      try {
        await Auth.signIn(loginUsername, loginPassword)
        .then((response) => {
          console.log("sign in successful", response);
        });
    } catch (error) {
        console.log('error signing in', error);
    }
  }

  return (
    <div className="page">
      <form>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={onUsernameChangeHandle} /> 
          (must be an email address)
        </label>
        <p>
          <label>
            Full name:
            <input type="Text" name="name" value={fullname} onChange={onNameChangeHandle} />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input type="text" name="password" value={password} onChange={onPasswordChangeHandle} />
            (must be more or equal to 6 digits)
          </label>
        </p>
        <p>
          <label>
            Expected Graduation:
            <input
              type="Date"
              name="graduationdate"
              onChange={onDateChangeHandler}
            />
          </label>
        </p>
        <p>
          <label>Majors:</label>
        </p>
        <p>
          <label>
            <input
              type="Checkbox"
              name="Engineering"
              onChange={onCheckBoxChange}
            />
            <span>Engineering</span>
          </label>
        </p>
        <p>
          <label>
            <input type="Checkbox" name="Arts" onChange={onCheckBoxChange} />
            <span>Arts</span>
          </label>
        </p>
        <p>
          <label>
            <input
              type="Checkbox"
              name="Humanities"
              onChange={onCheckBoxChange}
            />
            <span>Humanities</span>
          </label>
        </p>
        <p>
          <label>
            <input type="Checkbox" name="Science" onChange={onCheckBoxChange} />
            <span>Science</span>
          </label>
        </p>
        <input type="button" value="sign up" onClick={handleButton} />
      </form>

      <div>
      
        <h3>Log in</h3>
        <p>
        <label>
          Username:
          <input type="text" name="username" value={loginUsername} onChange={onloginUsernameChangeHandle} /> 
          (must be an email address)
        </label>
        </p>
        <p>
          <label>
            Password:
            <input type="text" name="password" value={loginPassword} onChange={onloginPasswordChangeHandle} />
            (must be more or equal to 6 digits)
          </label>
        </p>
        <input type="button" value="log in" onClick={handleLogInButton} />
      </div>

    </div>

    
  );
};



export default ApplicantSignup;
