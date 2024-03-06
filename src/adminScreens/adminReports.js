import React, { useEffect, useState } from "react";
import UserHeader from "../screen/component/userHeader";
import Footer from "../screen/component/footer";
import menu from "../images/menu.webp";
import loader from "../images/Rectangle.webp";
import setting from "../images/settingIcon.webp";
import circle from "../images/circle.webp";
import middleLine from "../images/Line 3.webp";
import Screenshot from "./settingScreenComponent/screenshot";
import line from "../images/line.webp";
import ActivityLevel from "./settingScreenComponent/activitylevel";
import URL from "./settingScreenComponent/url";
import UrlTracking from "./settingScreenComponent/url";
import WeeklyLimit from "./settingScreenComponent/weeklyLimit";
import { useActionData, useLocation } from "react-router-dom";
import AutoPause from "./settingScreenComponent/autopause";
import OfflineTime from "./settingScreenComponent/offlinetime";
import Notify from "./settingScreenComponent/notify";
import WeekStart from "./settingScreenComponent/weekStart";
import CurrencySymbol from "./settingScreenComponent/currencySymbol";
import AdminHeader from "./component/adminHeader";
import AdminHead from "../screen/component/adminHeadSection";

function AdminReports() {
    
    const [activeComponent, setActiveComponent] = useState('component1');
    const location = useLocation()

    // const [componentState, setComponentState] = useState({
    //     showScreenShot: true,
    //     showActivityLevel: false,
    //     showUrlTracking: false,
    //     weeklyLimit: false,
    // });

    const handleButtonClick = (componentName) => {
        setActiveComponent(componentName)
        // const value = event.target.value;
        // setComponentState({
        //     showScreenShot: value === "screenshot",
        //     showActivityLevel: value === "activityLevel",
        //     showUrlTracking : value === "urltracking",
        //     weeklyLimit : value === "weeklylimit",
        // });
    }

    useEffect(() => {
        setActiveComponent(location.state)
    }, [location.state])

    console.log(location.state);
    return (
        <div>
            {/* <UserHeader /> */}
            <section>
                <div className="container">
                    <div className="userHeader">
                        <div className="headerTop">
                            <img src={setting} />
                            <h5>Reports</h5>
                        </div>
                    </div>
                    <div className="mainwrapper">
                        <div className="settingContainer">
                            <div className="settingMainDiv">
                                <div>
                                    <div>
                                        <button className={activeComponent == "component1" ? "activeButtonClass" : "screenshotButton"} onClick={() => handleButtonClick("component1")}>
                                            <p>Daily Reports</p>
                                        </button>
                                    </div>
                                    <div>
                                        <button className={activeComponent == "component2" ? "activeButtonClass" : "screenshotButton"} onClick={() => handleButtonClick("component2")}>
                                            <p>Monthly Reports</p>
                                        </button>
                                    </div>
                                    <div>
                                        <button className={activeComponent == "component3" ? "activeButtonClass" : "screenshotButton"} onClick={() => handleButtonClick("component3")}>
                                            <p>Yearly Reports</p>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <img src={middleLine} />
                                </div>
                                <div className="componentScreenshot">
                                    {activeComponent === "component1" && <Screenshot />}
                                    {activeComponent === "component2" && <ActivityLevel />}
                                    {activeComponent === "component3" && <UrlTracking />}
                                    {activeComponent === "component4" && <WeeklyLimit />}
                                    {activeComponent === "component5" && <AutoPause />}
                                    {activeComponent === "component6" && <OfflineTime />}
                                    {activeComponent === "component7" && <Notify />}
                                    {activeComponent === "component8" && <WeekStart />}
                                    {activeComponent === "component9" && <CurrencySymbol />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <img className="admin1Line" src={line} />
            </div>
            {/* <Footer /> */}
            {/* <button onClick={handleClick} value="hello world">Show header</button>
          <button onClick={handleClick} value="bye world">Show footer</button> */}
            {/* {componentState.showHeader && <UserHeader />}
          {componentState.showFooter && <Footer />} */}
        </div>
    );
}

export default AdminReports;