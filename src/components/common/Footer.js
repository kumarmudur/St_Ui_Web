import React from 'react';
import '../../styles/footer.scss';
import { NavLink } from 'react-router-dom';



const Footer = () => {
    return (
        <footer className="footer">
            <div className="rights">Copyright © 2019 Solar Topps. All Rights Reserved.</div>
            <div className="policy">
                <NavLink to="/privacy" >Privacy</NavLink> &nbsp; | &nbsp;
                <NavLink to="/termsAndConditions">Terms & Conditions</NavLink>    
            </div>
        </footer>
    );
};

export default Footer;
