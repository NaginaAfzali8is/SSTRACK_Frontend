import React from "react";
import logo from '../../images/ss-track-logo.svg';
import { useNavigate } from "react-router-dom";
import line from '../../images/line.webp';

function Header({ scrollToSection1, scrollToSection2 }) {
    const navigate = useNavigate()
    return (
        <section>
            <nav class="navbar navbar-expand-lg navbar-dark" style={{
                backgroundColor: "#0d3756",
                padding: "20px 30px",
                borderRadius: "20px",
                margin: "30px 30px 0 30px",
            }}>
                <div class="container-fluid">
                    <img onClick={() => navigate('/')} className="logo" src={logo} />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="d-flex" role="search" id="header-nav">
                        <button style={{ marginRight: 50 }} onClick={() => navigate('/download')} class="btn signUpButton" type="submit">Download</button>
                        <button onClick={() => navigate('/signin')} class="btn loginButton" type="submit">Log In</button>
                        <button onClick={() => navigate('/signup')} class="btn signUpButton" type="submit">Sign Up</button>
                    </div>
                </div>
            </nav>
            {/* <img className="line" src={line} /> */}
        </section>
    )
}

export default Header;