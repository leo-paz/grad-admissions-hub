import React, { useState, useEffect, useRef } from "react";

const ApplicantSignup = () => {

    const [state, setState] = useState({
        name: "",
        graduationDate:"",
        majors: []
    })

    const requestBody = `{
        "Applicant": {
            "name": "${state.name}",
            "graduationDate": "${state.graduationDate}",
            "majors": [${state.majors}]
        }
    }`

    const onNameChangeHandle = (event) => {
        const newState = {...state, name: event.target.value};
        setState(newState);
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

    const handleButton = (event) => {
        console.log("signup is clicked!");

        console.log(requestBody);
        fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",{
            method: 'POST',
            body: requestBody

        })
    }

  return (
    <div className="page">
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <p>
          <label>
            Full name:
            <input type="Text" name="name" onChange={onNameChangeHandle} />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input type="text" name="password" />
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
    </div>
  );
};



export default ApplicantSignup;
