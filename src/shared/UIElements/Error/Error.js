import React from 'react';
import './Error.scss';

const Error = ({ error }) => {
    if(!error){
        return null;
    }
    
    return (
        <div className="error-message">
            <p>{error}</p>
        </div>
    );
};

export default Error;