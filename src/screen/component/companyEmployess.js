import React, { useEffect, useState } from "react";
import Switch from "../../screen/component/switch";
import userIcon from '../../images/groupImg.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CompanyEmployess = ({ Setting, id, setId }) => {

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [employess, setEmployess] = useState(null);
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('items'));
    let headers = {
        Authorization: 'Bearer ' + token,
    }
    const apiUrl = process.env.REACT_APP_API_URL;

    async function getData() {
        setLoading(true)
        setLoading2(true)
        try {
            const response = await fetch(`${apiUrl}${user.userType === "admin" ? "/superAdmin/employees" : user.userType === "owner" ? "/owner/companies" : ""}`, { headers })
            const json = await response.json();
            setEmployess(() => {
                if (user.userType === "admin") {
                    const filterCompanies = json?.convertedEmployees?.filter((emp, index) => {
                        return user.company === emp.company && emp.isArchived === false && emp?.inviteStatus === false
                    })
                    return filterCompanies
                }
                else if (user.userType === "owner") {
                    const filterCompanies = json?.employees?.filter((emp, index) => {
                        return user.company === emp.company && emp.isArchived === false && emp?.inviteStatus === false
                    })
                    return filterCompanies
                }
            })
            setLoading2(false)
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        }
        catch (error) {
            setLoading2(true)
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleChange(e, employee) {
        setEmployess((prevEmp) => {
            return prevEmp.map((emp, index) => {
                if (employee._id === emp._id) {
                    return {
                        ...emp,
                        isSelected: e
                    }
                }
                else {
                    return emp
                }
            })
        })
    }

    useEffect(() => {
        if (employess?.filter((f) => f.isSelected) && employess?.filter((f) => f.isSelected).length > 0) {
            setId(() => {
                return employess?.filter((f) => f.isSelected)?.map((emp) => {
                    const matchingId = id.find((f) => f.userId === emp._id);
                    return {
                        userId: emp._id,
                        settings: {
                            screenshots: {
                                frequency: matchingId?.settings?.screenshots?.frequency === undefined ? null : matchingId?.settings?.screenshots?.frequency,
                                enabled: matchingId?.settings?.screenshots?.enabled === undefined ? null : matchingId?.settings?.screenshots?.enabled
                            }
                        }
                    }
                })
            })
        }
    }, [employess])

    console.log("id ====>", id);

    return (
        <div style={{
            height: 400,
            overflowY: "scroll",
        }}>
            {loading2 ? (
                <Skeleton count={1} height="400px" style={{ margin: "10px 0 0 0" }} />
            ) : employess && employess.length > 0 ? employess?.map((employee, index) => {
                return (
                    loading ? (
                        <Skeleton count={1} height="56px" style={{ margin: "10px 0 0 0" }} />
                    ) : (
                        <div className="newDiv">
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img width={35} src={userIcon} alt="" />
                                    <p style={{ width: "200px", marginLeft: 10 }}>{employee.name}</p>
                                </div>
                                <div style={{ marginRight: 10 }}>
                                    <Switch onChange={handleChange} employee={employee} />
                                </div>
                            </div>
                            {employee?.isSelected ? (
                                <div className="employee-individual-setting">
                                    <Setting employee={employee} index={index} employees={employess} setEmployess={setEmployess} />
                                </div>
                            ) : ""}
                        </div>
                    )
                )
            }) : null}
        </div>
    );
}

export default CompanyEmployess;