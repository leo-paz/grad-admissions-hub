import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';
import ProfSelectBox from '../Components/ProfSelectBox/ProfSelectBox';
import { useQuery, gql } from '@apollo/client';

import lottie from 'lottie-web';

const orgProfs = [
    {
        name: 'asdfasdfasdasdfasdfasdfasdfasdfasfd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
    {
        name: 'asdfasdfasd', id: 'adsfasdfasdfasd'
    },
];

const orgSelectedProf = {
    name: 'Select Professor',
    id: ''
}

function getProfessorsQuery() {

    const PROF_QUERY = gql`
    {
        professors {
            id
            name
        }
    }
    `;

    return PROF_QUERY;
}

const CreateApplication = ({ applicantId }) => {
    const [selectedProf, setSelectedProf] = useState(orgSelectedProf);
    const [profs, setProfs] = useState(orgProfs);
    const [state, setState] = useState({
        Approved: "",
        graduationDate: "",
        areasOfInterest: []
    })

    const [upload, setUpload] = useState({
        file: '',
        resume: '',
        audit: '',
        transcript: '',
        uploadURL: '',
        viewUrl: ''
    })

    const uploadResume = useRef(null);

    const { loading, error, data } = useQuery(getProfessorsQuery());

    useEffect(() => {
        lottie.loadAnimation({
            container: uploadResume.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/document-upload.json'),
            name: 'resume'
        })
    }, [data])

    useEffect(() => {
        async function getUrl() {
            const API_ENDPOINT = 'https://0gyyyi01kf.execute-api.us-east-1.amazonaws.com/uploads';
            const response = axios({
                method: 'GET',
                url: API_ENDPOINT
            }).then((res) => {
                const uploadString = res.data.uploadURL;
                const viewString = res.data.uploadURL.split('?')[0]
                setUpload({ ...upload, uploadURL: uploadString, viewUrl: viewString });
            })
        }
        if (!upload.uploadURL) getUrl();
    }, [data, upload])

    if (loading) return (<h1>loading is true</h1>);
    if (error) return (<h1> there is error</h1>);

    const checkboxes = [
        'Machine Learning',
        'RTOS',
        'Materials and Structures',
        'Biomechanics'
    ]

    const handleSelect = (prof) => {
        setSelectedProf(prof);
    }

    const onCheckBoxChange = (event) => {
        if (event.target.checked) {
            const newState = { ...state, areasOfInterest: [...state.areasOfInterest, `"${event.target.name}"`] }
            const newState2 = { ...newState, majors: Array.from(new Set(newState.majors)) };
            setState(newState2);
        } else {
            const filtered = state.areasOfInterest.filter(function (value, index, arr) {
                return value != `"${event.target.name}"`;
            });
            const newState = { ...state, majors: filtered };
            setState(newState);
        }
    }

    const uploadButtonHandler = e => {
        
        const MAX_IMAGE_SIZE = 1000000;

        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        createFile(files[0]);

        function createFile(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                
                if (!e.target.result.includes('data:application/pdf')) {
                    return alert('Wrong file type - PDF only.');
                }
                if (e.target.result.length > MAX_IMAGE_SIZE) {
                    return alert('File is loo large.');
                }
                setUpload({ ...upload, file: e.target.result });
            }
            reader.readAsDataURL(file);
        }
    }

    const handleApply = async (event) => {

        const date = new Date();
        const newDate = "" + (parseInt(date.getDate()) + 1) + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();

        async function createBlobData(file) {
            console.log('Uploading: ', file);
            let binary = atob(file.split(',')[1]);
            let array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            let blobData = new Blob([new Uint8Array(array)], { type: 'application/pdf' });
            console.log('Uploading to: ', upload.uploadURL);

            const result = await fetch(upload.uploadURL, {
                method: 'PUT',
                body: blobData
            })
        }
        
        await createBlobData(upload.file);

        const requestBody = `{
            "Application": {
                "applicant": "${applicantId}",
                "professor": "${selectedProf.id}",
                "dateSubmitted": "${newDate}",
                "areasOfResearch": [${state.areasOfInterest}],
                "resumeDocumentId": "${upload.viewUrl}",
                "auditDocumentId": "${`dafsdfasdf`}",
                "diplomaDocumentId": "${`dafsdfasdf`}",
                "reviews": []
            }
        }`

        try {
            return fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
                {
                    method: 'POST',
                    body: requestBody
                })
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <div className="create-application-card">
            <h1>Create An Application</h1>
            <div className="select-box-container">
                <ProfSelectBox
                    professors={data.professors}
                    onSelect={handleSelect}
                    title={selectedProf.name}
                />
            </div>
            <h2>Areas of Interest</h2>
            <ul className="checkbox-list">
                {checkboxes.map((elem, idx) => (
                    <li className="checkbox-item">
                        <Checkbox
                            key={idx}
                            name={elem}
                            onCheckBoxChange={onCheckBoxChange}
                        />
                    </li>
                ))}
            </ul>
            <h2>Upload Resume</h2>
            <div className="upload-container">
                <div className="upload-button-container">
                    <label
                        onMouseEnter={() => lottie.play('resume')}
                        onMouseLeave={() => lottie.stop('resume')}
                        htmlFor="resume"
                    >
                        <p>Resume</p>
                        <div className="upload-document-animation" ref={uploadResume} />
                    </label>
                    <input
                        id="resume"
                        onChange={uploadButtonHandler}
                        type="file"
                    />
                </div>
            </div>

            <div className="center-apply">
                <Button
                    onClick={handleApply}
                    text="Apply"
                />
            </div>
        </div>
    );
};

export default CreateApplication;