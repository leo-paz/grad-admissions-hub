import React from 'react';
import './input.scss';

function Input({label, onChange, required, placeholder, type, value}) {

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
            />
            <label for={label} class="form__label">{placeholder}</label>
        </div>
    )
}

export default Input;