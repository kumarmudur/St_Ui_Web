import React from 'react';
import '../../styles/index.scss';
import { IMAGES } from '../../constants'; 
 

const LogoImage = props => {
    const { className } = props;
    return (
        <div className="logoContainer">
            <img src={ IMAGES.LOGO } className={ className }/>
        </div>
    );
};

export default LogoImage;

    