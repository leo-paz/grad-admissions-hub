import React, {useEffect} from 'react';

import DataFetch from '../Components/DataFetch';
import Accordion from '../Components/Accordion/Accordion';

const Submission = () => {

    useEffect(() => {
        async function getApplicationsById() {
            try {
                // Get current 
                // TODO: Call backend with apollo client here
                // setApplications(res)
            } catch (e) {
                console.log(e);
            }
        }
        getApplicationsById();
    });

    return (
        <div className="center-container">
            <h1>Submission Page</h1>
            <DataFetch></DataFetch>
            <Accordion
                title="What is your return policy?"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
                title="How do I track my order?"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Accordion
                title="Can I purchase items again?"
                content="
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </br>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </br>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        "
            />
        </div>
    )
}

export default Submission;