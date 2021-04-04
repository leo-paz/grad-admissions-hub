import React from 'react';
import './input.scss';

function Input({label, onChange, required, placeholder, type, value, readOnly=false}) {

    return (
        <div class="form__group field">
            <input
                autoComplete="off" 
                type={type} 
                class="form__field" 
                placeholder={placeholder}
                name={label} 
                id={label} 
                required={required}
                onChange={onChange}
                value={value}
                readOnly={readOnly}
            />
            <label for={label} class="form__label">{placeholder}</label>
        </div>
    )
}

export default Input;