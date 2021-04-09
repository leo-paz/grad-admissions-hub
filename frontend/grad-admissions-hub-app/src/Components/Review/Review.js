import React, { useEffect, useRef, useState } from 'react'

import lottie from 'lottie-web';

import Accordion from '../Accordion/Accordion';
import Rating from '../Rating/Rating';
import Star from './Star';

function Review({ title, body, rating, date, id }) {

    const [ratings, setRatings] = useState(new Array(rating));

    return (
        <Accordion
            title={title}
            id={id}
        >
            <p>{body}</p>
            <h3>Date Submitted</h3>
            <p>{date.toDateString()}</p>
            <h3>Rating</h3>
            <div className="stars-container">
                {rating.map((elem, idx) => (
                    <Star id={id} key={idx} />
                ))}
            </div>
        </Accordion>
    )
}

export default Review;