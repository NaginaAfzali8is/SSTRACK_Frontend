import React, { useEffect, useState } from "react";
import UserHeader from "../screen/component/userHeader";
import OwnerSection from "./ownerComponent/ownerSection";
import groupCompany from "../images/Group.webp";
import search from "../images/searchIcon.webp";
import line from "../images/Line 3.webp";
import OwnerTeamComponent from "./ownerTeamComponent";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import Footer from "../screen/component/footer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useLoading from "../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import '../../node_modules/sweetalert2/src/sweetalert2.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillStar } from 'react-icons/ai'

function OwnerTeam() {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [email, setEmail] = useState("")
    const [deleteType, setDeleteType] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate()
    const { loading, setLoading, loading2, setLoading2 } = useLoading()
    const [payrate, setPayrate] = useState(null)
    const [inviteStatus, setInviteStatus] = useState("")
    const [isUserArchive, setIsUserArchive] = useState(false)
    const [isArchived, setIsArchived] = useState(true)
    const [activeId, setActiveId] = useState(null)
    const [mainId, setMainId] = useState(null)
    const [data, setData] = useState(null);
    const [searchUsers, setSearchUsers] = useState(null);
    const apiUrl = "https://combative-fox-jumpsuit.cyclic.app/api/v1";
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: "Bearer " + token,
    };
    const user = JSON.parse(localStorage.getItem("items"))

    const getData = async () => {
        setLoading(true)
        try {
            setLoading2(true)
            const response = await axios.get(`${apiUrl}/owner/companies`, { headers })
            if (response.status) {
                setLoading(false)
                setTimeout(() => {
                    setLoading2(false)
                }, 1000);
                setData(() => {
                    const filterCompanies = response?.data?.employees?.filter((employess, index) => {
                        return user.company === employess.company && employess.userType !== "owner"
                    })
                    return filterCompanies
                })
                // setFixId(response.data.employees[0]._id)
                console.log(response);
            }
        }
        catch (err) {
            console.log(err);
            setLoading(false)
            setTimeout(() => {
                setLoading2(false)
            }, 1000);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    async function archived_unarchived_users() {
        try {
            const res = await axios.patch(`${apiUrl}/superAdmin/archived/${mainId}`, {
                isArchived: isUserArchive ? false : true
            }, {
                headers: headers
            })
            if (res.status) {
                getData()
                enqueueSnackbar(res.data.message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                console.log("archived_unarchived_users RESPONSE =====>", res);
            }
        } catch (error) {
            enqueueSnackbar(error?.response?.data?.message ? error?.response?.data?.message : "Network error", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }
    }

    async function deleteUser() {
        setShow(false)
        try {
            const res = await axios.delete(`${apiUrl}/superAdmin/deleteEmp/${mainId}`)
            if (res.status === 200) {
                getData()
                enqueueSnackbar(res.data.Message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                setTimeout(() => {
                    setMainId(null)
                }, 1000);
                console.log("deleteUser RESPONSE =====>", res);
            }
        } catch (error) {
            enqueueSnackbar(error?.response?.data?.message ? error?.response?.data?.message : "Network error", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }
    }

    const handleSendInvitation = async () => {
        if (email !== "") {
            setShow3(false)
            try {
                const res = await axios.post(`${apiUrl}/superAdmin/email`, {
                    toEmail: email,
                    company: user.company,
                }, {
                    headers: headers,
                })
                if (res.status) {
                    enqueueSnackbar(res.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        }
                    })
                    getData()
                }
                console.log("invitationEmail RESPONSE =====>", res);
            } catch (error) {
                enqueueSnackbar(error?.response?.data?.message ? error?.response?.data?.message : "Network error", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                console.log("catch error =====>", error);
            }
        }
        else {
            enqueueSnackbar("Email address is required", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }
    }

    // console.log({
    //     toEmail: invitationEmail,
    //     company: user.company,
    // });

    useEffect(() => {
        if (data !== null) {
            setSearchUsers(data)
        }
    }, [data])

    console.log(selectedUser);

    return (
        <div>
            {show ? <Modal show={show} onHide={() => setShow(false)} animation={false} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "600", fontSize: "20px" }}>Are you sure want to delete {selectedUser?.name} ?</p>
                    <p>All of the time tracking data and screenshots for this employee will be lost. This can not be undone. Please type <b>DELETE</b> in the box below to acknowledge that employee will be deleted.</p>
                    <input value={deleteType} onChange={(e) => setDeleteType(e.target.value.trim())} type="text" placeholder="DELETE" style={{
                        fontSize: "18px",
                        padding: "5px 10px",
                        width: "100%",
                        border: "1px solid #cacaca"
                    }} />
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={deleteType !== "DELETE" ? true : false} className={`${deleteType !== "DELETE" ? "teamActionButtonDisabled" : "teamActionButton"}`} onClick={deleteUser}>
                        DELETE
                    </button>
                    <button className="teamActionButton" onClick={() => setShow(false)}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            {show2 ? <Modal show={show2} onHide={() => setShow2(false)} animation={false} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "600", fontSize: "20px" }}>Archive {selectedUser?.name} ?</p>
                    <p>The user:</p>
                    {isArchived ? (
                        <ul>
                            <li>Will be able to track time for your company</li>
                            <li>Will appear in the list of users on your home or timeline</li>
                            <li>Their data will not be retained and accessible in reports</li>
                            <li>You will be charged for this user</li>
                        </ul>
                    ) : (
                        <ul>
                            <li>Will not be able to track time for your company</li>
                            <li>Will not appear in the list of users on your home or timeline</li>
                            <li>Their data will be retained and accessible in reports</li>
                            <li>You will not be charged for this user</li>
                        </ul>
                    )}
                    {!isArchived && <p>You can restore this user any time</p>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={archived_unarchived_users}>
                        {isArchived ? "UN-ARCHIVE" : "ARCHIVE"}
                    </button>
                    <button className="teamActionButton" onClick={() => setShow2(false)}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            {show3 ? <Modal show={show3} onHide={() => setShow3(false)} animation={false} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "600", fontSize: "20px" }}>Invite user via email address</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter user email" style={{
                        fontSize: "18px",
                        padding: "5px 10px",
                        width: "100%",
                        border: "1px solid #cacaca"
                    }} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={handleSendInvitation}>
                        SEND
                    </button>
                    <button className="teamActionButton" onClick={() => setShow3(false)}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            <SnackbarProvider />
            <div className="container">
                <div className="userHeader">
                    <div className="d-flex align-items-center gap-3">
                        <div><img src={groupCompany} /></div>
                        <h5>Team</h5>
                    </div>
                </div>
                <div className="mainwrapper">
                    <div className="ownerTeamContainer">
                        <div className="d-flex gap-3">
                            <div style={{ width: "500px" }}>
                                <div style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    // justifyContent: "space-between"
                                }}>
                                    <button style={{ margin: "0 10px 0 0" }} className="addUserButton" onClick={() => navigate('/company-owner-user-signup')}>CREATE</button>
                                    <button className="addUserButton" onClick={() => setShow3(true)}>CREATE VIA LINK</button>
                                </div>

                                {/* <div className="searchDiv">
                                <input
                                    placeholder="Enter user email"
                                    value={invitationEmail}
                                    onChange={(e) => {
                                        setInvitationEmail(e.target.value)
                                    }}
                                />
                                <button className="send-invite-btn" onClick={() => {
                                    handleSendInvitation()
                                }}>Send invite</button>
                            </div> */}

                                {/* <div className="add-user-div">
                                <div>
                                    <img className="searchLogo" src={search} />
                                </div>
                                <input
                                    placeholder="Search"
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setLoading2(true)
                                        const filterUsers = data.filter((user) => {
                                            return user?.name?.toLowerCase().includes(value.toLowerCase())
                                        });
                                        setSearchUsers(filterUsers)
                                        setTimeout(() => {
                                            setLoading2(false)
                                        }, 1000);
                                    }}
                                />
                            </div> */}

                                <div className="companyFont">
                                    <p style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: "20px",
                                        color: "#0E4772",
                                        fontWeight: "600",
                                    }}>Total</p>
                                    <div style={{
                                        backgroundColor: "#50AA00",
                                        color: "white",
                                        fontSize: "600",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {searchUsers?.filter((d, i) => d.isArchived === false && d.inviteStatus === false)?.length}
                                    </div>
                                </div>
                                <div style={{
                                    height: searchUsers?.filter((d, i) => d.isArchived === false && d.inviteStatus === false).length >= 5 && 300,
                                    overflowY: searchUsers?.filter((d, i) => d.isArchived === false && d.inviteStatus === false).length >= 5 && "scroll",
                                    marginTop: 20
                                }}>
                                    {loading ? <Skeleton count={1} height="40vh" style={{ margin: "10px 0 0 0" }} /> : searchUsers && searchUsers?.filter((d, i) => d.isArchived === false && d.inviteStatus === false)?.map((e, i) => {
                                        return loading2 ? (
                                            <Skeleton count={1} height="56px" style={{ margin: "10px 0 0 0" }} />
                                        ) : (
                                            <div className={`adminTeamEmployess ${activeId === e._id ? "activeEmploy" : ""} align-items-center gap-1`} onClick={() => {
                                                setMainId(e._id)
                                                setActiveId(e._id)
                                                setIsUserArchive(false)
                                                setInviteStatus(false)
                                                setPayrate(e)
                                                setSelectedUser(e)
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="groupContentMainImg">
                                                        <p>{i + 1}</p>
                                                    </div>
                                                    <p className="groupContent">{e?.name}</p>
                                                </div>
                                                {e?.userType === "owner" ? <div>
                                                    <AiFillStar color="#e7c741" size={20} />
                                                </div> : null}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="archiveFont">
                                    <p style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: "20px",
                                        color: "#727272",
                                        fontWeight: "600",
                                    }}>Archive</p>
                                    <div style={{
                                        backgroundColor: "#50AA00",
                                        color: "white",
                                        fontSize: "600",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {searchUsers?.filter((d, i) => d.isArchived === true && d.inviteStatus === false)?.length}
                                    </div>
                                </div>
                                <div style={{
                                    height: searchUsers?.filter((d, i) => d.isArchived === true && d.inviteStatus === false).length >= 5 && 300,
                                    overflowY: searchUsers?.filter((d, i) => d.isArchived === true && d.inviteStatus === false).length >= 5 && "scroll",
                                    marginTop: 20
                                }}>
                                    {loading ? <Skeleton count={1} height="20vh" style={{ margin: "10px 0 0 0" }} /> : searchUsers && searchUsers?.filter((d, i) => d.isArchived === true && d.inviteStatus === false)?.map((e, i) => {
                                        return loading2 ? (
                                            <Skeleton count={1} height="56px" style={{ margin: "10px 0 0 0" }} />
                                        ) : (
                                            <div className={`adminTeamEmployess ${activeId === e._id ? "activeEmploy" : ""} align-items-center gap-1`} onClick={() => {
                                                setMainId(e._id)
                                                setActiveId(e._id)
                                                setIsUserArchive(true)
                                                setInviteStatus(false)
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="groupContentMainImg">
                                                        <p>{i + 1}</p>
                                                    </div>
                                                    <p className="groupContent archive-user">{e?.name}</p>
                                                </div>
                                                {e?.userType === "owner" ? <div>
                                                    <AiFillStar color="#e7c741" size={20} />
                                                </div> : null}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="archiveFont">
                                    <p style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: "20px",
                                        color: "#727272",
                                        fontWeight: "600",
                                    }}>Pending invite</p>
                                    <div style={{
                                        backgroundColor: "#50AA00",
                                        color: "white",
                                        fontSize: "600",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {searchUsers?.filter((d, i) => d.inviteStatus === true)?.length}
                                    </div>
                                </div>
                                <div style={{
                                    height: searchUsers?.filter((d, i) => d.inviteStatus === true).length >= 5 && 300,
                                    overflowY: searchUsers?.filter((d, i) => d.inviteStatus === true).length >= 5 && "scroll",
                                    marginTop: 20
                                }}>
                                    {loading ? <Skeleton count={1} height="20vh" style={{ margin: "10px 0 0 0" }} /> : searchUsers && searchUsers?.filter((d, i) => d.inviteStatus === true)?.map((e, i) => {
                                        return loading2 ? (
                                            <Skeleton count={1} height="56px" style={{ margin: "10px 0 0 0" }} />
                                        ) : (
                                            <div className="groupContentMain align-items-center gap-4" style={{
                                                backgroundColor: activeId === e._id ? "whitesmoke" : ""
                                            }} onClick={() => {
                                                setMainId(e._id)
                                                setActiveId(e._id)
                                                setInviteStatus(true)
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div className="groupContentMainImg">
                                                        <p>{i + 1}</p>
                                                    </div>
                                                    <p className="groupContent archive-user">{e?.email}</p>
                                                </div>
                                                {e?.userType === "owner" ? <div>
                                                    <AiFillStar color="#e7c741" size={20} />
                                                </div> : null}
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div>
                                <img src={line} />
                            </div>
                            <div style={{ width: "100%", display: mainId === null ? "flex" : "", justifyContent: mainId === null ? "center" : "", alignItems: mainId === null ? "center" : "" }}>
                                <OwnerTeamComponent
                                    fixId={mainId}
                                    archived_unarchived_users={() => setShow2(true)}
                                    deleteUser={() => setShow(true)}
                                    isArchived={isArchived}
                                    setIsArchived={setIsArchived}
                                    isUserArchive={isUserArchive}
                                    inviteStatus={inviteStatus}
                                    handleSendInvitation={handleSendInvitation}
                                    payrate={payrate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerTeam;