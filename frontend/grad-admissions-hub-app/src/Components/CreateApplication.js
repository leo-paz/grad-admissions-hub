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

const CreateApplication = ({applicantId}) => {
    const [selectedProf, setSelectedProf] = useState(orgSelectedProf);
    const [profs, setProfs] = useState(orgProfs);
    const [state, setState] = useState({
        Approved: "",
        graduationDate: "",
        areasOfInterest: []
    })

    const [upload, setUpload] = useState({
        file: '',
        resume:'',
        audit:'',
        transcript:'',
        uploadURL: ''
    })

    const uploadResume = useRef(null);
    const uploadAudit = useRef(null);
    const uploadTranscript = useRef(null);

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
        lottie.loadAnimation({
            container: uploadAudit.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/document-upload.json'),
            name: 'audit'
        })
        lottie.loadAnimation({
            container: uploadTranscript.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/document-upload.json'),
            name: 'transcript'
        })
    }, [data])

    if (loading) return (<h1>loading is true</h1>);
    if (error) return (<h1> there is error</h1>);

    console.log(data);

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
        console.log(event.target.name);
        console.log(event.target.checked);
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
            console.log(filtered);
        }
    }

    const uploadButtonHandler = (event, document) => {
        //THIS HANDLER DEALS WITH THE UPLOADED FILES.
        //Currently it adds onto the already selected files object
        // if (event.target && event.target.files) {
        //     files = [...files, event.target.files];
        //     console.log(files);
        // }

        const MAX_IMAGE_SIZE = 1000000;

        let files = event.target.files || event.dataTransfer.files
        if (!files.length) return
        createFile(files[0]);

        function createFile(file){
            let reader = new FileReader();
            reader.onload = (e) => {
              console.log('length: ', e.target.result.includes('data:application/pdf'))
              if (!e.target.result.includes('data:application/pdf')) {
                return alert('Wrong file type - PDF only.');
              }
              if (e.target.result.length > MAX_IMAGE_SIZE) {
                return alert('File is loo large.');
              }
              upload.file = e.target.result;
            }
            reader.readAsDataURL(file);
        }
        
    }   

    const uploadFile = async (event) =>{
        const API_ENDPOINT = 'https://0gyyyi01kf.execute-api.us-east-1.amazonaws.com/uploads'
        console.log('Upload clicked');
            // Get the presigned URL
            const response = await axios({
              method: 'GET',
              url: API_ENDPOINT
            })
            console.log('Response: ', response);

            async function createBlobData (file){
                console.log('Uploading: ', file);
                let binary = atob(file.split(',')[1]);
                let array = [];
                for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
                }
                let blobData = new Blob([new Uint8Array(array)], {type: 'application/pdf'});
                console.log('Uploading to: ', response.uploadURL);

                const result = await fetch(response.uploadURL, {
                    method: 'PUT',
                    body: blobData
                })
                console.log('Result: ', result);                
            }          

            createBlobData(upload.file);

            // Final URL for the user doesn't need the query string params
            upload.uploadURL = response.uploadURL.split('?')[0];
    }

    const handleApply = async (event) => {

        const date = new Date();
        const newDate = "" + (parseInt(date.getDate()) + 1) + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();

        const requestBody = `{
            "Application": {
                "applicant": "${applicantId}",
                "professor": "${selectedProf.id}",
                "dateSubmitted": "${newDate}",
                "areasOfResearch": [${state.areasOfInterest}],
                "resumeDocumentId": "${`dafsdfasdf`}",
                "auditDocumentId": "${`dafsdfasdf`}",
                "diplomaDocumentId": "${`dafsdfasdf`}",
                "reviews": []
            }
        }`

        try {
            console.log("Successfully signed up!");

            uploadFile();

            //modify requestBody before posting
            fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
                {
                    method: 'POST',
                    body: requestBody 
                }).then(res => console.log(res))
            

            
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
            <h2>Upload Documents </h2>
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
                        onChange={(e) => uploadButtonHandler(e, "resume")}
                        type="file"
                    />
                </div>
                <div className="upload-button-container">
                    <label
                        onMouseEnter={() => lottie.play('audit')}
                        onMouseLeave={() => lottie.stop('audit')}
                        htmlFor="audit"
                    >
                        <p>Audit</p>
                        <div className="upload-document-animation" ref={uploadAudit} />
                    </label>
                    <input
                        id="audit"
                        onChange={(e) => uploadButtonHandler(e, "audit")}
                        type="file"
                    />
                </div>
                <div className="upload-button-container">
                    <label
                        onMouseEnter={() => lottie.play('transcript')}
                        onMouseLeave={() => lottie.stop('transcript')}
                        htmlFor="transcript"
                    >
                        <p>Transcript</p>
                        <div className="upload-document-animation" ref={uploadTranscript} />
                    </label>
                    <input
                        id="transcript"
                        onChange={(e) => uploadButtonHandler(e, "transcript")}
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