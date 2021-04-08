import React, { useEffect, useState, useContext } from 'react';

import CreateApplication from '../Components/CreateApplication';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';

import { UserContext } from '../App';

const orgApplications = [
    {
        areasOfResearch: ['Biology', 'Neuroscience', 'Quiditch'],
        id: 'omarleopaz@hotmail.com'
    },
    {
        areasOfResearch: ['Artifical Intelligence', 'Cryptography', 'Baking'],
        id: 'omarleopaz@hotmail.com'
    },
    {
        areasOfResearch: ['Quantum Computing', 'Neuroscience', 'Bartending'],
        id: 'omarleopaz@hotmail.com'
    },
    {
        areasOfResearch: ['Cloud Computing', 'Anatomy', 'Witchcraft'],
        id: 'omarleopaz@hotmail.com'
    },
]

const Submission = () => {
    const { userState } = useContext(UserContext);
    const [applications, setApplications] = useState(orgApplications);

    useEffect(() => {
        async function getApplicationsForUser() {
            try {
                // Get current 
                // TODO: Call backend with apollo client here
                // setApplications(res)
            } catch (e) {
                console.log(e);
            }
        }
        getApplicationsForUser();
    });

    return (
        <div className="center-container">
            {userState.profile === 'applicant' && (<CreateApplication applicantId={userState.email}/>)}
            {userState.loggedIn && (
                <div className="applications">
                    <h1>Applications </h1>
                    <ul className="application-list">
                        {applications.map((elem, idx) => (
                            <li key={idx} className="application-preview">
                                <Link className="application-link" to={`/application/${elem.id}`}>
                                    <span>
                                        {elem.areasOfResearch.join(", ")}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {!userState.loggedIn && (<h1>Must be signed in to view applications</h1>)}
        </div>
    )
}

export default Submission;