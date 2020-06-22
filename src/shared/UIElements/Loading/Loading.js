import React from 'react';
import './Loading.scss';

const Loading = ({ loading }) => {
    if(!loading){
        return null;
    }

    return (
       <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );
};

export default Loading;