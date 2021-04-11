import React, { useState, useEffect, useRef } from "react";

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';
import ProfSelectBox from '../Components/ProfSelectBox/ProfSelectBox';

import lottie from 'lottie-web';

function DisplayProfile() {

    const handleApply = async (event) => {
        console.log("User Needs Help");
    }

    return (
        <div className="create-application-card">
            <h1>Click the Button to Request Help for your account</h1>
            
            <div className="center-apply">
                <Button
                        onClick={handleApply}
                        text="Review my Account"
                />
            </div>
        </div>
    );
};

export default DisplayProfile;