import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="side-bar__logo">
            <h1>Family Panel</h1>
        </Link>
    );
};

export default Logo;