import React, { useEffect, useState, useContext } from 'react';

import CreateApplication from '../Components/CreateApplication';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';

import { UserContext } from '../App';
import { useQuery, gql } from '@apollo/client';

function getUserApplicationsQuery(id, profile) {
    if (profile === 'professor') {
        const PROF_QUERY = gql`
            {
                professorById(id: "${id}") {
                    applications {
                        id
                        areasOfResearch
                    }
                }
            }`
        ;
        return PROF_QUERY;
    }

    const APPLICANT_QUERY = gql`
        {
            applicantById(id: "${id}") {
                applications {
                    id
                    areasOfResearch
                }
            }
        }`
    ;
    return APPLICANT_QUERY;
}

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
    // const [applications, setApplications] = useState(orgApplications);
    const { loading, error, data } = useQuery(getUserApplicationsQuery(userState.id,userState.profile),{returnPartialData:true});
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)

    const applications = (userState.profile === "applicant") ? data.applicantById.applications: data.professorById.applications;
    
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