import React, { useRef, useEffect } from 'react';
import Iframe from 'react-iframe'

const GeoxHR = () => {

    const url = 'http://15.156.80.22:8000';

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Iframe
                url="https://ec2-15-156-80-22.ca-central-1.compute.amazonaws.com:8000/login"
                width="640px"
                height="320px"
                id=""
                className=""
                display="block"
                position="relative"
                sandbox="allow-same-origin"
            />
        </div>
    );
}

export default GeoxHR;
