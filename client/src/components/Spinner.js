import React from 'react';

const Spinner = (props) => {
    return (
        <div className="spinner__wrapper">
            <div className="spinner__container">
                <span className="spinner__label">Loading...</span>
                <div className="spinner">
                    <div className="spinner__left"></div>
                    <div className="spinner__top-right"></div>
                    <div className="spinner__bottom-right"></div>
                    <div className="spinner__center"></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;