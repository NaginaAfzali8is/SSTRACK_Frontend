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

function Setting() {

    const [settingsTabs, setSettingTabs] = useState([
        { id: 1, showSetting: <Screenshot />, name: "Screenshots", activeTab: "component1", isActive: true, icon: "12/hr" },
        { id: 2, showSetting: <ActivityLevel />, name: "Activity level tracking", activeTab: "component2", isActive: false, icon: "Yes" },
        { id: 3, showSetting: <UrlTracking />, name: "App & URL tracking", activeTab: "component3", isActive: false, icon: "Yes" },
        { id: 4, showSetting: <WeeklyLimit />, name: "Weekly time limit", activeTab: "component4", isActive: false, icon: "100 hr" },
        { id: 5, showSetting: <AutoPause />, name: "Auto pause tracking after", activeTab: "component5", isActive: false, icon: "5 min" },
        { id: 6, showSetting: <OfflineTime />, name: "Allow adding offline time", activeTab: "component6", isActive: false, icon: "Yes" },
        { id: 7, showSetting: <Notify />, name: "Notify when screeshot is taken", activeTab: "component7", isActive: false, icon: "Yes" },
        { id: 8, showSetting: <WeekStart />, name: "Week starts on", activeTab: "component8", isActive: false, icon: "Sun" },
        { id: 9, showSetting: <CurrencySymbol />, name: "Currency symbol", activeTab: "component9", isActive: false, icon: "$" },
    ]);

    return (
        <div>
            <div className="container">
                <div className="userHeader">
                    <div className="headerTop">
                        <img src={setting} />
                        <h5>Settings</h5>
                    </div>
                </div>
                <div className="mainwrapper">
                    <div className="settingContainer">
                        <div className="settingMainDiv">
                            <div>
                                {settingsTabs.map((tab) => {
                                    return (
                                        <button
                                            className={tab.isActive ? "activeButtonClass" : "screenshotButton"}
                                            onClick={() => {
                                                setSettingTabs((prevTabs) => {
                                                    return prevTabs.map((tabs, index) => {
                                                        if (tab.id === tabs.id) {
                                                            return {
                                                                ...tabs,
                                                                isActive: true
                                                            }
                                                        }
                                                        else {
                                                            return {
                                                                ...tabs,
                                                                isActive: false
                                                            }
                                                        }
                                                    })
                                                })
                                            }}>
                                            <p>{tab.name}</p>
                                            <p className="hour12">{tab.icon}</p>
                                        </button>
                                    )
                                })}
                            </div>
                            <div>
                                <img src={middleLine} />
                            </div>
                            <div className="componentScreenshot">
                                {settingsTabs.find((setting) => setting.isActive)?.showSetting}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img className="admin1Line" src={line} />
            </div>
        </div>
    );
}


export default Setting;