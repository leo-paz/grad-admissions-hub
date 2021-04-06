import React, { useState, useEffect, useRef } from "react";

const DataFetch = () => {

    const [state, setState] = useState({
        Approved: "",
        graduationDate: "",
        majors: []
    })

    const requestBody = `{
        "Application": {
				"applicant": "2bfaa7bd-c1ba-4a06-b46a-058fc858cfee",
				"professor": "328e1dd4-7928-4d7e-a538-f7a66cff8d11",
				"dateSubmitted": "31/12/1998",
				"areasOfResearch": [${state.majors}],
				"resumeDocumentId": "23",
				"diplomaDocumentId": "45",
				"auditDocumentId": "45",
				"reviews": []
			}
		}
    }`

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
            const newState = { ...state, majors: [...state.majors, `"${event.target.name}"`] }
            const newState2 = { ...newState, majors: Array.from(new Set(newState.majors)) };
            setState(newState2);
        } else {
            const filtered = state.majors.filter(function (value, index, arr) {
                return value != `"${event.target.name}"`;
            });
            const newState = { ...state, majors: filtered };
            setState(newState);
            console.log(filtered);
        }
    }

    return (
        <div className="">
            <form>
                <p> <label>
                    Professor:
    <input type="Text" name="name" onChange={onNameChangeHandle} />
                </label>
                </p>

                <p>
                    <label>
                        <input
                            type="Checkbox"
                            name="Machine Learning"
                            onChange={onCheckBoxChange}
                        />
                        <span>Machine Learning</span>
                    </label>
                    <label>
                        <input
                            type="Checkbox"
                            name="RTOS"
                            onChange={onCheckBoxChange}
                        />
                        <span>RTOS</span>
                    </label>
                    <label>
                        <input
                            type="Checkbox"
                            name="Materials and Structures"
                            onChange={onCheckBoxChange}
                        />
                        <span>Materials and Structures</span>
                    </label>
                    <label>
                        <input
                            type="Checkbox"
                            name="Biomechanics"
                            onChange={onCheckBoxChange}
                        />
                        <span>Biomechanics</span>
                    </label>
                </p>
                <label>
                    Press Button to Apply to Gradutate:
    <input type="button" value="Apply" onClick={handleButton} />
                </label>
            </form>
        </div>
    );
};

export default DataFetch;