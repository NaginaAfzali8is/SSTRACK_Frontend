import React, { useEffect, useState } from "react";
import Switch from "../../screen/component/switch";
import user from '../../images/groupImg.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CompanyEmployess from "../../screen/component/companyEmployess";
import SaveChanges from "../../screen/component/button";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function Screenshot() {

    const [id, setId] = useState([])
    let token = localStorage.getItem('token');
    let headers = {
        Authorization: 'Bearer ' + token,
    }
    const apiUrl = process.env.REACT_APP_API_URL;

    async function handleUpdateSettings() {
        if (id !== null) {
            try {
                const response = await fetch(`${apiUrl}/superAdmin/settingsE`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                    body: JSON.stringify(id),
                });
                const data = await response.json()
                if (data.success === true) {
                    enqueueSnackbar(data?.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }
                    })
                }
                else {
                    enqueueSnackbar(data?.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }
                    })
                }
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    function getMinutes() {
        let number = 0
        let arr = []
        for (let index = 0; index < 10; index++) {
            number = number + 1
            arr.push(number)
        }
        return arr
    }

    function Setting({ employee, index, employees, setEmployess }) {
        console.log(employees);
        return (
            <>
                <div>
                    <input
                        checked={id?.find(f => f.userId === employee._id)?.settings?.screenshots?.enabled === true}
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        onClick={(e) => {
                            setId((ids) => {
                                return ids.map((emp) => {
                                    if (emp.userId === employee._id) {
                                        return {
                                            ...emp,
                                            settings: {
                                                screenshots: {
                                                    frequency: emp.settings.screenshots.frequency, enabled: true
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        return emp
                                    }
                                })
                            })
                        }}
                    />
                    <label for="test1">Take</label>
                </div>
                <div>
                    <select
                        value={id?.find(f => f.userId === employee._id)?.settings?.screenshots?.frequency}
                        className="myselect"
                        onChange={(e) => {
                            setId((ids) => {
                                return ids.map((emp) => {
                                    if (emp.userId === employee._id) {
                                        return {
                                            ...emp,
                                            settings: {
                                                screenshots: {
                                                    frequency: e.target.value, enabled: emp.settings.screenshots.enabled
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        return emp
                                    }
                                })
                            })
                        }}>
                        {getMinutes().map((t) => <option value={t} key={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <p>per minute</p>
                </div>
                <div>
                    <select className="myselect">
                        <option>Allow blur</option>
                        <option>Blur</option>
                    </select>
                </div>
                <div>
                    <input
                        checked={id?.find(f => f.userId === employee._id)?.settings?.screenshots?.enabled === false}
                        type="checkbox"
                        id="html"
                        name="fav_language"
                        onClick={(e) => {
                            setId((ids) => {
                                return ids.map((emp) => {
                                    if (emp.userId === employee._id) {
                                        return {
                                            ...emp,
                                            settings: {
                                                screenshots: {
                                                    frequency: emp.settings.screenshots.frequency, enabled: false
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        return emp
                                    }
                                })
                            })
                        }}
                    />
                    <label for="test2">Do not take</label>
                </div>
            </>
        )
    }

    console.log({ body: id });

    return (
        <div>
            <SnackbarProvider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                    <p className="settingScreenshotHeading">Screenshots</p>
                </div>
                <div>
                    <SaveChanges onClick={handleUpdateSettings} />
                </div>
            </div>
            <div className="settingScreenshotDiv">
                <p>How frequently screenshots will be taken.</p>
                <p>This number is an average since screenshots are taken at random intervals.</p>
            </div>
            <div className="takeScreenShotDiv">
                <div>
                    <input type="radio" id="test1" name="radio-group" />
                    <label for="test1">Take</label>
                </div>
                <div>
                    <select className="myselect">
                        {getMinutes().map((t) => <option value={t} key={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <p>per minute</p>
                </div>
                <div>
                    <select className="myselect">
                        <option>Allow blur</option>
                        <option>Blur</option>
                    </select>
                </div>
                <div>
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Do not Take</label>
                </div>
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
        </div >
    )
}

export default Screenshot;