import React from 'react';
import './footer.css';

export function Footer(props) {
    let style = {
        backgroundImage: `url('./images/footer.png')`
    }
    return (<div className="footer" style={style}>
        <div className="data-container clearfix">
            <div className="container">
                <div>COMPANY</div>
                <div>About Us</div>
                <div>Contact</div>
                <div>Costs and billing</div>
            </div>
            <div className="container">
                <div>HELP</div>
                <div>How it works</div>
                <div>Support</div>
                <div>Trust and safety</div>
            </div>
            <div className="container">
                <div>LEGALITIES</div>
                <div>Privacy</div>
                <div>T & C</div>
                <div>Code Of Conduct</div>
            </div>
            <div className="social-container">
                <div>Connect with us</div>
                <div className="img-container">
                    <img alt='...' src="./images/social_facebook.png" />
                    <img alt='...' src="./images/social_linkedin.png" />
                    <img alt='...' src="./images/social_twitter.png" />
                </div>
            </div>
        </div>
    </div>);

}