import React, { useState } from "react";
import CompanyEmployess from "../../screen/component/companyEmployess";
import SaveChanges from "../../screen/component/button";

function ActivityLevel() {

    const [id, setId] = useState([])

    function Setting() {
        return (
            <>
                <div>
                    <p>
                        <input type="radio" id="track" name="radio-group" checked />
                        <label for="track">Track</label>
                    </p>
                </div>
                <div>
                    <p>
                        <input type="radio" id="donottrack" name="radio-group" />
                        <label for="donottrack">Do not Track</label>
                    </p>
                </div>
            </>
        )
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                    <p className="settingScreenshotHeading">Activity Level tracking</p>
                </div>
                <div>
                    <SaveChanges />
                </div>
            </div>
            <div className="settingActivityDiv">
                <p>Track mouse and keyboard Activity Level</p>
            </div>
            <div className="activityLevelDiv">
                <p>
                    <input type="radio" id="track" name="radio-group" checked />
                    <label for="track">Track</label>
                </p>
                <p>
                    <input type="radio" id="donottrack" name="radio-group" />
                    <label for="donottrack">Do not Track</label>
                </p>
            </div>
            <div className="activityLevelIndividual">
                <p className="settingScreenshotIndividual">Individual Settings</p>
                <p className="individualSettingFont">If enabled, the individual setting will be used instead of the team setting</p>
                <CompanyEmployess
                    Setting={Setting}
                    setId={setId}
                    id={id}
                />
            </div>
        </div>
    )
}

export default ActivityLevel;