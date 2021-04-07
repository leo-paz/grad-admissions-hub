import React from 'react';
import './button.scss';

const Button = ({text, onClick, style}) => {
    return (
      <button onClick={onClick} className="button" style={style}>
        <span>{text}</span>
      </button>
    );
}

export default Button;