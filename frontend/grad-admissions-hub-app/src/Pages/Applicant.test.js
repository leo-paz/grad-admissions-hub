import * as React from "react";
import * as ReactDOM from "react-dom";

import Applicant from "./Applicant";
require('jest-canvas-mock');


test ("renders the correct heading on the applicant page", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect (root.querySelector("h1").textContent).toBe("Applicant Profile");
})

test ("renders an input component of type text with placeholder full name for username", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect((root.querySelector("div Input[placeholder='Full name']"))).toBeTruthy(); 
})

test ("renders an input component of type text with placeholder 'Email' for Email", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect((root.querySelector("div Input[placeholder='Email']"))).toBeTruthy(); 
})

test ("renders an input component of type Date for graduation date", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect((root.querySelector("div Input[type='Date']"))).toBeTruthy(); 
})

test ("renders a list component of type ul for our majors", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect((root.querySelector("div ul.checkbox-list"))).toBeTruthy(); 
})

test ("renders a button for sign out", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Applicant/>,root);

    expect((root.querySelector("div div.center-sign-out Button"))).toBeTruthy(); 
})

    //test to make sure button calls the right function?