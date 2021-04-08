import React, {useRef, useEffect} from 'react';

import lottie from 'lottie-web';


function Star({id}) {
    const starContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: starContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../animations/rating.json'),
            name: `star${id}`
        })
    },[])

    return (
        <div 
            onMouseEnter={() => lottie.play(`star${id}`)}
            onMouseLeave={() => lottie.stop(`star${id}`)}
            className="star-animation" ref={starContainer} />
    )
}

export default Star;