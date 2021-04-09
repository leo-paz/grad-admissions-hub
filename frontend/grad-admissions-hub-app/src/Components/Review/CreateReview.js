import React, { useState, useEffect, useRef } from "react";

import Button from '../Button/Button';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';

const CreateReview = ({ professorId, applicationId }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [ranking, setRanking] = useState(1);

    useEffect(() => {
        async function getProfessors() {
            try {
                //TODO: Make call to get professors
                // setProfs(res);
            } catch (error) {

            }
        }
        getProfessors();
    }, [])



    const handleSubmit = async (event) => {

        const date = new Date();
        const newDate = "" + (parseInt(date.getDate()) + 1) + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();

        const requestBody = `{
            "Review": {
                "ranking": ${ranking},
                "title": "${title}",
                "body": "${body}",
                "professor": "${professorId}",
                "dateSubmitted": "${newDate}",
                "application": "${applicationId}"
            }
        }`

        try {
            console.log("Successfully signed up!");

            fetch("https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
                {
                    method: 'POST',
                    body: requestBody 
                }).then(res => console.log(res))
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    const handleRating = (e) => {
        setRanking(parseInt(e.target.value));
    }

    return (
        <div className="create-review-card">
            <h2>Submit Review</h2>
            <Input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                label="title"
                value={title}
            />
            <Input
                placeholder="Body"
                onChange={(e) => setBody(e.target.value)}
                type="text"
                label="title"
                value={body}
            />

            <h2>Rating</h2>
            <div className="create-rating">
                <Rating
                    onSelect={handleRating}
                />
            </div>

            <div className="center-apply">
                <Button
                    onClick={handleSubmit}
                    text="Submit"
                />
            </div>
        </div>
    );
};

export default CreateReview;