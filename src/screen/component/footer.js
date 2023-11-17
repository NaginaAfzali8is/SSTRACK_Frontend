import React from "react";
import footerLogo from '../../images/FooterLogo.png';
import linkedin from '../../images/LinkdinIcon.webp';
import insta from '../../images/InstaIcon.webp';
import facebook from '../../images/FacebookIcon.webp';
import twitter from '../../images/TwiterIcon.webp';
import line from '../../images/line.webp';
import { useNavigate } from "react-router-dom";


function Footer() {

    const navigate = useNavigate()

    return (
        <div className="footer">
            <div className="footerContent">
                <div className="footerLogo">
                    <img width={70} src={footerLogo} alt="FooterLogo.png" />
                </div>
                <div className="footerLinks">
                    {/* <p>Support</p> */}
                    <p onClick={() => navigate('/')}>Home</p>
                    <p>About us</p>
                    <p>Contact</p>
                    <p onClick={() => navigate("/download")}>Download</p>
                    {/* <p>Terms</p> */}
                    {/* <p>Privacy</p> */}
                </div>
                <div>
                    <p className="text-white fs-8 mb-1">info@screenshottime.com</p>
                    <div className="footerSocialMedia">
                        <img src={linkedin} alt="LinkdinIcon.png" />
                        <img src={facebook} alt="FacebookIcon.png" />
                        <img src={insta} alt="InstaIcon.png" />
                        <img src={twitter} alt="TwiterIcon.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;