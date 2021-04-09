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
    const { loading, error, data } = useQuery(getUserApplicationsQuery(userState.id,userState.profile));
    const [applications, setApplications] = useState([]);
    
    console.log(data)
    useEffect(()=> {
        // setApplications((userState.profile === "applicant") ? data && data.applicantById && data.applicantById.applications: data && data.professorById && data.professorById.applications);
        if(userState.profile==="applicant"){
            if(data){
                if(data.applicantById){
                    setApplications(data.applicantById.applications);
                }
            }
        }else if(userState.profile==="professor"){
            if(data){
                if(data.professorById){
                    setApplications(data.professorById.applications);
                }
            }
        }
    },[data]);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div className="center-container">
            {userState.profile === 'applicant' && (<CreateApplication applicantId={userState.id}/>)}
            {userState.loggedIn && (
                <div className="applications">
                    <h1>Applications </h1>
                    <ul className="application-list">
                        {applications && applications.length===0 && (<h1>You currently do not have any applications</h1>)}
                        {applications && applications.map((elem, idx) => (
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