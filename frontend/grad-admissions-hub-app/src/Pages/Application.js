import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Review from '../Components/Review/Review';
import CreateReview from '../Components/Review/CreateReview';
import { useQuery, gql } from '@apollo/client';

import { UserContext } from '../App';
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


function getApplicationQuery(id){

    const REV_QUERY = gql`
    {
        applicationById(id: "${id}") {
            applicant {
                id
                name
            }
            professor {
                id
                name
            }
            dateSubmitted
            areasOfResearch
            resumeDocumentId
            diplomaDocumentId
            auditDocumentId
            reviews {
                id
                title
                dateSubmitted
                ranking
                body
            }
        }
    }

    `;

    return REV_QUERY;
}

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
        ranking: [1],
        dateSubmitted: new Date()
    },
    {
        title: "Great",
        body: "Great stuff",
        ranking: [1, 2, 3, 4],
        dateSubmitted: new Date()
    },
    {
        title: "Good",
        body: "Good stuff",
        ranking: [1, 2, 3],
        dateSubmitted: new Date()
    },
    {
        title: "Bloody Brilliant m8",
        body: "This chap is phenomenal",
        ranking: [1, 2, 3, 4, 5, 6, 7, 5],
        dateSubmitted: new Date()
    },
]

function Application(props) {
    const { userState } = useContext(UserContext);
    const [reviews, setReviews] = useState(orgReviews);
    const [application, setApplication] = useState({});

    const { id } = useParams();
    const { loading, error, data } = useQuery(getApplicationQuery(id), {returnPartialData:true, partialRefetch: true});

    useEffect(() => {
        if(data){
            setApplication(data.applicationById);
        }
    },[data]);
    
    return (
        <div className="center-container">
            <div className="application-info-card">
                <h1>Application</h1>
                <h3>Applicant Name</h3>
                <p>{application && application.applicant && application.applicant.name}</p>
                <h3>Applicant Email</h3>
                <p>{application && application.applicant && application.applicant.id}</p>
                <h3>Professor Name</h3>
                <p>{application && application.professor && application.professor.name}</p>
                <h3>Professor Email</h3>
                <p>{application && application.professor && application.professor.id}</p>
                <h3>Date Submitted</h3>
                <p>{application && application.dateSubmitted}</p>
                <h3>Areas Of Interest</h3>
                <p>{application && application.areasOfResearch && application.areasOfResearch.join(", ")}</p>
                <h3>Resume</h3>
                <a href={application && application.resumeDocumentId}>{application && application.resumeDocumentId}</a>

                <h2>Reviews</h2>
                {application && application.reviews && application.reviews.map((elem, idx) => (
                    <Review
                        title={elem.title}
                        id={idx}
                        body={elem.body}
                        date={elem.dateSubmitted}
                        rating={elem.ranking}
                    />
                ))}
                {userState.profile === 'professor' && (
                    <CreateReview
                        applicationId={id}
                        professorId={userState.id}
                    />
                )}
            </div>
        </div>
    )
}
export default Application;
