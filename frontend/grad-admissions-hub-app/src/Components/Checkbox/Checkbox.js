import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import './checkbox.scss';

function Checkbox({ onCheckBoxChange, name, checked, disabled }) {
    // const radioContainer = useRef(null);

    // useEffect(() => {
    //     professorArrow = lottie.loadAnimation({
    //         container: radioContainer.current,
    //         renderer: 'svg',
    //         loop: false,
    //         autoplay: false,
    //         animationData: require('../animations/radio-button.json'),
    //         name: 'professor'
    //     })
    // }, [])
    const style = { "margin": "2px" }

    return (
        <div>
            <input
                onChange={onCheckBoxChange}
                type="checkbox"
                id={name}
                checked={checked}
                name={name}
                disabled={disabled}
                //checked={!onCheckBoxChange && checked}
            />
            <label htmlFor={name} style={style}>{name}</label>
        </div>
    )
}

export default Checkbox;