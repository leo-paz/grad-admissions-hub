import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Review from '../Components/Review/Review';
// id: ID
//   applicant: Applicant
//   professor: Professor
//   dateSubmitted: String
//   areasOfResearch: [String]

// id: ID
//   ranking: Int
//   title: String
//   body: String
//   professor: Professor
//   dateSubmitted: String
// }

const orgApplication = {
    id: 'xxx',
    applicant: {
        id: 'whatever@gmail.com',
        name: 'dude'
    },
    professor: {
        id: 'professor@gmail.com',
        name: 'professor'
    },
    dateSubmmited: new Date(),
    areasOfResearch: [
        'Engineering',
        'Arts',
        'Humanties',
        'Biology',
        'Computer Science'
    ]
}

const orgReviews = [
    {
        title: "Rubbish m8",
        body: "Bloody rubbsih",
        ranking: 1,
        dateSubmitted: new Date()
    },
    {
        title: "Great",
        body: "Great stuff",
        ranking: 4,
        dateSubmitted: new Date()
    },
    {
        title: "Good",
        body: "Good stuff",
        ranking: 3,
        dateSubmitted: new Date()
    },
    {
        title: "Bloody Brilliant m8",
        body: "This chap is phenomenal",
        ranking: 5,
        dateSubmitted: new Date()
    },
]

function Application(props) {
    const [reviews, setReviews] = useState(orgReviews);
    const [application, setApplication] = useState(orgApplication);

    const { id } = useParams();

    useEffect(() => {
        async function getApplicationById() {
            try {
                // TODO: Call backend with apollo client here
                // setApplicant(res)
            } catch (e) {
                console.log(e);
            }
        }
        getApplicationById();
    });

    return (
        <div className="center-container">
            <div className="application-info-card">
                <h1>Application</h1>

                <h3>Applicant Name</h3>
                <p>{application.applicant.name}</p>
                <h3>Applicant Email</h3>
                <p>{application.applicant.id}</p>
                <h3>Professor Name</h3>
                <p>{application.professor.name}</p>
                <h3>Professor Email</h3>
                <p>{application.professor.id}</p>
                <h3>Date Submitted</h3>
                <p>{application.dateSubmmited.toDateString()}</p>

                <h2>Reviews</h2>
                {reviews.map((elem, idx) => (
                    <Review
                        title={elem.title}
                    />
                ))}
            </div>
        </div>
    )
}
export default Application;