import React from 'react';
import './Input.scss';

const Input = props => {
    return (
        <div className="form--group">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                className={`${props.class} ${props.error && 'is-invalid'}`}
                placeholder={props.placeholder}
                ref={props.register}
                onBlur={props.onBlur}
                onChange={props.onChange}
            />
            {props.children}
        </div>
    );
};

export default Input;