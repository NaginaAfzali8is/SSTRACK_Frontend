import React, { useRef } from "react";
import { useEffect, useState } from "react";
import logo from '../images/FooterLogo.png'
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

function CaptureScreen() {

    const [videoStream, setVideoStream] = useState(null);
    const [captureInterval, setCaptureInterval] = useState(null);
    const [type, setType] = useState("");
    const [responseType, setResponseType] = useState("");
    const location = useLocation();
    const API_URL = "https://combative-fox-jumpsuit.cyclic.app/api/v1";
    const user = JSON.parse(localStorage.getItem("items"))
    const [data, setData] = useState([])

    let token = localStorage.getItem('token');
    let headers = {
        Authorization: "Bearer " + token,
    }

    function getQueryParam(param) {
        const query = new URLSearchParams(location.search);
        return query.get(param);
    }

    const screenshotCapture = JSON.parse(getQueryParam('object'));

    useEffect(() => {
        const updateLocalStorageValue = () => {
            setType(localStorage.getItem("type"))
            setResponseType(localStorage.getItem("responseType"))
            console.log(localStorage.getItem("responseType"));
        };
        const intervalId = setInterval(updateLocalStorageValue, 1000);
        return () => clearInterval(intervalId);
    }, [type]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/superAdmin/allEmployeesworkinghour`, {
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                method: "GET",
                mode: 'cors',
            });
            const data = await response.json()
            if (data?.offlineUsers?.length > 0) {
                let obj = data?.offlineUsers.find((f) => f.userId === user._id)
                localStorage.setItem("timeEntryUser", JSON.stringify(obj))
            }
            if (data?.onlineUsers?.length > 0) {
                let obj = data?.onlineUsers.find((f) => f.userId === user._id)
                localStorage.setItem("timeEntryUser", JSON.stringify(obj))
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    async function sendScreenshot(base64) {
        const user = JSON.parse(localStorage.getItem("timeEntryUser"))
        console.log("response ================>", user);
        console.log(screenshotCapture?.timeEntryId);
        // try {
        //     const response = await fetch(`${API_URL}/timetrack/capture-screenshot/${screenshotCapture?.timeEntryId}/screenshots`, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             ...headers
        //         },
        //         method: "PATCH",
        //         mode: 'cors',
        //         body: JSON.stringify({
        //             file: base64,
        //             screenshotId: user?.recentScreenshot?._id
        //         })
        //     });
        //     console.log("capture ss response", response);
        // } catch (error) {
        //     console.error("Error in captureScreenshot:", error);
        // }
    }

    useEffect(() => {
        const token = screenshotCapture?.token;
        const decoded = jwtDecode(token);
        localStorage.setItem("items", JSON.stringify(decoded));
        localStorage.setItem("token", token);
        if (type === "startTimer") {
            fetchData()
            const startScreenCapture = () => {
                const displayMediaOptions = {
                    video: {
                        mediaSource: 'screen', // Specify that you want to capture the entire screen
                    },
                };
                if (videoStream) {
                    setCaptureInterval(
                        setInterval(() => {
                            captureFrame(videoStream)
                                .then((base64Image) => {
                                    const base64 = base64Image.split(',')[1];
                                })
                                .catch((error) => console.error('Error capturing frame:', error));
                        }, 10000)
                    );
                } else {
                    navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
                        .then((stream) => {
                            window.open(
                                user?.userType === "owner" ? "https://www.screenshottime.com/company-owner" :
                                    user?.userType === "admin" ? "https://www.screenshottime.com/admindashboard" :
                                        user?.userType === "user" ? "https://www.screenshottime.com/userdashboard" : ""
                            )
                            setVideoStream(stream);
                            setCaptureInterval(
                                setInterval(() => {
                                    captureFrame(stream)
                                        .then((base64Image) => {
                                            const base64 = base64Image.split(',')[1];
                                            if (responseType === "SUCCESS") {
                                                sendScreenshot(base64)
                                            }
                                        })
                                        .catch((error) => console.error('Error capturing frame:', error));
                                }, 10000)
                            );
                        })
                        .catch((error) => console.error('Error capturing screen:', error));
                }
            };
            const captureFrame = (stream) => {
                return new Promise((resolve, reject) => {
                    let video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();
                    video.onloadedmetadata = () => {
                        let canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        let ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob((blob) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                resolve(reader.result);
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                            // const filename = `screenshot_${Date.now() + 1}.png`;
                            // const url = URL.createObjectURL(blob);
                            // const a = document.createElement('a');
                            // a.href = url;
                            // a.download = filename;
                            // document.body.appendChild(a);
                            // a.click();
                            // a.remove();
                            // URL.revokeObjectURL(url);
                        }, 'image/jpeg');
                    };
                });
            };
            startScreenCapture()
        }
        else if (type === "stopTimer") {
            const stopScreenCapture = () => {
                clearInterval(captureInterval);
                if (videoStream) {
                    let tracks = videoStream.getTracks();
                    tracks.forEach((track) => track.stop());
                    setVideoStream(null);
                }
            };
            stopScreenCapture()
        }
    }, [type])

    console.log({responseType});

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh"
        }}>
            <div style={{ margin: "0 0 20px 0" }}>
                <img src={logo} />
            </div>
            <div>
                <p style={{ color: "white", fontSize: "35px", fontWeight: "700", margin: 0 }}>Please keep this tab open while capture screenshot</p>
            </div>
            <div>
                <p style={{ color: "white", fontSize: "28px", fontWeight: "500", margin: 0 }}>Please keep this tab open while capture screenshot</p>
            </div>
        </div>
    )
}

export default CaptureScreen;