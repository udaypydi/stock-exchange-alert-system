import React from 'react';
import './preLoader.css';

export default function PreLoader() {
    return (
        <div className="loader-container ">
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>
        </div>
       
    )
}