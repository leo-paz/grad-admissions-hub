import React from 'react';
import './button.scss';

const Button = ({text, onClick}) => {
    return (
      <button onClick={onClick} className="plan-trip-button" >
        <span>{text}</span>
      </button>
    );
}

export default Button;