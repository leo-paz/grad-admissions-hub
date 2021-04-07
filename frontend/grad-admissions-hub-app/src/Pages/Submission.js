import React, { useEffect, useRef, useState } from 'react';

import DataFetch from '../Components/DataFetch';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';

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

let files = [];
const uploadButtonHandler = event => {
    //THIS HANDLER DEALS WITH THE UPLOADED FILES.
    //Currently it adds onto the already selected files object
    if(event.target && event.target.files){
        files=[...files, event.target.files];
        console.log(files);
    }
    
}

const Submission = () => {
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
            <h1>Create An Application</h1>
            <DataFetch></DataFetch>
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
            <div>
            <h2>Upload Documents </h2>
            <input
            onChange={uploadButtonHandler}
            type="file"
            multiple
            style={{'marginLeft':'auto', 'marginRight':'auto'}}
            />
            </div>
        </div>
    )
}

export default Submission;