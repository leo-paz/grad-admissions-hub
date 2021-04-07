import React, { useState, useEffect, useRef } from "react";

import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Checkbox from '../Components/Checkbox/Checkbox';
import ProfSelectBox from '../Components/ProfSelectBox/ProfSelectBox';

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

const CreateApplication = () => {
    const [selectedProf, setSelectedProf] = useState(orgSelectedProf);
    const [profs, setProfs] = useState(orgProfs);

    const uploadResume = useRef(null);
    const uploadAudit = useRef(null);
    const uploadTranscript = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: uploadResume.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/settings.json'),
            name: 'resume'
        })
        lottie.loadAnimation({
            container: uploadAudit.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/settings.json'),
            name: 'audit'
        })
        lottie.loadAnimation({
            container: uploadTranscript.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../animations/settings.json'),
            name: 'transcript'
        })

        async function getProfessors() {
            try {
                //TODO: Make call to get professors
                // setProfs(res);
            } catch (error) {

            }
        }
        getProfessors();
    }, [])

    const checkboxes = [
        'Machine Learning',
        'RTOS',
        'Materials and Structures',
        'Biomechanics'
    ]

    const [state, setState] = useState({
        Approved: "",
        graduationDate: "",
        areasOfResearch: []
    })

    const requestBody = `{
        "Application": {
				"applicant": "2bfaa7bd-c1ba-4a06-b46a-058fc858cfee",
				"professor": "328e1dd4-7928-4d7e-a538-f7a66cff8d11",
				"dateSubmitted": "31/12/1998",
				"areasOfResearch": [${state.areasOfResearch}],
				"resumeDocumentId": "23",
				"diplomaDocumentId": "45",
				"auditDocumentId": "45",
				"reviews": []
			}
		}
    }`

    const handleSelect = (prof) => {
        setSelectedProf(prof);
    }

    const onNameChangeHandle = (event) => {
        const newState = { ...state, name: event.target.value };
        setState(newState);
    }

    const handleButton = (event) => {
        console.log("Application Sent!");
        fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql", {
            method: 'POST',
            body: requestBody

        })
    }
    const onCheckBoxChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked);
        if (event.target.checked) {
            const newState = { ...state, majors: [...state.areasOfResearch, `"${event.target.name}"`] }
            const newState2 = { ...newState, majors: Array.from(new Set(newState.majors)) };
            setState(newState2);
        } else {
            const filtered = state.areasOfResearch.filter(function (value, index, arr) {
                return value != `"${event.target.name}"`;
            });
            const newState = { ...state, majors: filtered };
            setState(newState);
            console.log(filtered);
        }
    }

    let files = [];
    const uploadButtonHandler = event => {
        //THIS HANDLER DEALS WITH THE UPLOADED FILES.
        //Currently it adds onto the already selected files object
        if (event.target && event.target.files) {
            files = [...files, event.target.files];
            console.log(files);
        }

    }

    const handleApply = (e) => {
        console.log('apply clicked');
    }

    return (
        <div className="create-application-card">
            <h1>Create An Application</h1>
            <div className="select-box-container">
                <ProfSelectBox
                    professors={profs}
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
                        onChange={uploadButtonHandler}
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
                        onChange={uploadButtonHandler}
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