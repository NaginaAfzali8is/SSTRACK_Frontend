import React, { useEffect, useState } from "react";
import circle from "../images/online.webp";
import setting from "../images/setting.webp";
import left from "../images/Leftarrow.webp";
import right from "../images/Rightarrow.webp";
import circleDot from "../images/CircleDot.webp";
import edit from '../images/EditTimeZone.webp';
import historyIcon from "../images/HistoryIcon.webp";
import line from "../images/line.webp";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
// import AdminHead from "../screen/component/adminHeadSection";
// import cross from "../images/cross.webp";
// import moment from "moment-timezone";
import leftArrow from "../images/left-arrow.png"
import rightArrow from "../images/right-arrow.png"
import CircularProgressBar from "../screen/component/circularProgressBar";
import activityImage from "../images/activity-level.svg"
// import activityTracker from "../images/activityTracker.svg"
// import needle from '../images/Needle.svg'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useLoading from "../hooks/useLoading";
import axios from "axios";
import logo from '../images/app-logo-white.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import Pusher from 'pusher-js';
import deleteIcon from '../images/delete.svg'
// import TimeEntryModal from "../screen/component/timeEntryModal";
// import DeleteSSModal from "../screen/component/deleteSSModal";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import BackToTop from "../screen/component/backToTop";
import { ImCross } from "react-icons/im";
import Modal from 'react-bootstrap/Modal';
import perc_20 from "../images/Red.svg"
import perc_40 from "../images/Orange.svg"
import perc_60 from "../images/Yellow.svg"
import perc_80 from "../images/LightGreen.svg"
import perc_100 from "../images/FullGreen.svg"
// import { CaptureScreenshot } from "../screen/component/captureScreenshot";

function AdminUser() {

    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    const today = new Date().getFullYear();
    const currentMonths = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentDate = new Date().getDate().toString().padStart(2, '0');
    const todayDate = `${today}-${currentMonths}-${currentDate}`;

    // const [show2, setShow2] = useState(false);
    const [rotation, setRotation] = useState(0)
    const { loading, setLoading } = useLoading()
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [ssData, setSSData] = useState(null);
    // const currentDates = new Date();
    // const utcDate = moment.utc(currentDates).toDate();

    const [trimActivity, setTrimActivity] = useState(null)
    const [offlineTime, setOfflineTime] = useState(null)
    const [showSplitActivity, setShowSplitActivity] = useState(false)
    const [showTrimActivity, setShowTrimActivity] = useState(false)
    const [showOfflineTime, setShowOfflineTime] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)
    const [splitTime, setSplitTime] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [clickDay, setClickDay] = useState()
    const [month, setMonth] = useState()
    const [timeBill, setTimeBill] = useState({});
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    // const [changeEdit, setEdit] = useState(false);
    const [formattedDate, setFormattedDate] = useState(todayDate);
    // const [offiineTiming, setOfflineTiming] = useState(false);
    const [timeEntries, setTimeEntries] = useState([]);
    // const [lastScreenshot, setLastScreenshot] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [timeTrackingId, setTimeTrackingId] = useState(null)
    const [screenshotId, setScreenshotId] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const navigate = useNavigate("")
    const [totalPercentageByDay, setTotalPercentageByDay] = useState(null)
    const [activeMonth, setActiveMonth] = useState(new Date().toLocaleDateString())
    const [current_day, set_current_day] = useState(null)
    const [current_month, set_current_month] = useState(null)
    const items = JSON.parse(localStorage.getItem('items'));
    const location = useLocation();
    const userId = location?.state;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let token = localStorage.getItem('token');
    let headers = {
        Authorization: "Bearer " + token,
    }
    const apiUrl = "https://combative-fox-jumpsuit.cyclic.app/api/v1";

    // var pusher = new Pusher('334425b3c859ed2f1d2b', {
    //     cluster: 'ap2'
    // });

    // var channel = pusher.subscribe('ss-track');

    // channel.bind('my-user', function (data) {
    //     console.log(data.data);
    // });

    // useEffect(() => {
    //     var channel = pusher.subscribe('ss-track');
    //     channel.bind("new-ss", (data) => {
    //         setLastScreenshot(data?.data)
    //         setData((prevData) => {
    //             return {
    //                 ...prevData,
    //                 groupedScreenshots: prevData?.groupedScreenshots?.map((groupeScreenshot) => {
    //                     if (data?.data?.timeEntryId === groupeScreenshot?.timeentryId && !groupeScreenshot?.screenshots?.find(screenshot => screenshot.trackingId === data?.data?.timeEntryId)) {
    //                         return {
    //                             ...groupeScreenshot,
    //                             screenshots: [...groupeScreenshot?.screenshots, data?.data]
    //                         }
    //                     }
    //                     else {
    //                         return groupeScreenshot
    //                     }
    //                 })
    //             }
    //         })
    //         console.log("new ss ===>", data);
    //     });
    //     return () => {
    //         channel.unbind("new-ss");
    //     };
    // }, []);

    // channel.bind('my-event', function (data) {
    //     console.log(JSON.stringify(data));
    // });

    const prevMonth = () => {
        setDate((prevDate) => {
            const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
            setActiveMonth(prevMonthDate.toLocaleDateString())
            setTotalPercentageByDay(null)
            return prevMonthDate;
        });
    };

    const nextMonth = () => {
        setDate((prevDate) => {
            const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
            setActiveMonth(nextMonthDate.toLocaleDateString())
            setTotalPercentageByDay(null)
            return nextMonthDate;
        });
    };

    const renderCalendar = () => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const weeks = [];
        let days = [];
        let currentDay = new Date(firstDayOfMonth);

        const handleClick = (key) => {
            setSelectedDate(key);
            const clickDay = new Date(key).getFullYear();
            const clickMonth = (new Date(key).getMonth() + 1).toString().padStart(2, '0');
            const clickDate = new Date(key).getDate().toString().padStart(2, '0');
            const clickDa = new Date(key).getDay();
            const clickMon = new Date(key).getMonth();
            // console.log(clickDa);
            setClickDay(clickDa)
            setMonth(clickMon)
            const formattedsDate = `${clickDay}-${clickMonth}-${clickDate}`;
            setFormattedDate(formattedsDate);
            setActiveButton(key)
        };

        // Generate cells for each day in the current month
        // ...

        // Generate cells for each day in the current month
        for (let i = 0; i < daysInMonth; i++) {
            const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;
            const isFirstDayOfWeek = currentDay.getDay() === 1;
            const isLastDayOfWeek = currentDay.getDay() === 0 || i === daysInMonth - 1;
            const dayKey = currentDay.toString();
            const isCurrentDate = currentDay.getDate() === new Date().getDate() && currentDay.getMonth() === new Date().getMonth();

            const dayFormatted = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1).toString().padStart(2, '0')}-${currentDay.getDate().toString().padStart(2, '0')}`;

            // Generate a unique key using the string representation of the date
            days.push(
                <div
                    style={{ cursor: "pointer", border: "1px solid #ebeaea" }}
                    className={`col cell ${isWeekend ? "week day week first" : "day"} ${dayKey === activeButton ? "active" : isCurrentDate ? "active2" : ""}`}
                    key={dayKey}
                    onClick={() => handleClick(dayKey)}
                >
                    <p className="weekName">{currentDay.toLocaleString("en-US", { weekday: "short" })}</p>
                    <p className="Weekdate">{currentDay.getDate()}</p>
                    {/* <p className="nonetaken">{currentDay.toLocaleString("en-US", { weekday: "short" })}</p> */}
                    <div style={{ padding: "2px" }}>
                        <div style={{ width: `${totalPercentageByDay === null ? 0 : totalPercentageByDay[i]?.percentage}%`, background: 'linear-gradient(180deg,#cdeb8e 0,#a5c956)', height: '10px' }}></div>
                    </div>
                </div>
            );

            currentDay.setDate(currentDay.getDate() + 1);
        }

        weeks.push(<div className="days" key={currentDay}>{days}</div>);
        return weeks;
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/superAdmin/sorted-datebased/${userId}?date=${encodeURIComponent(formattedDate)}`, { headers });
            setLoading(true)
            if (response.data) {
                setData(response.data.data);
                setTimeBill(response.data.data.timeBill);
                setTimeEntries(response?.data?.data?.groupedScreenshots || []);
                setTimeTrackingId(response.data.data.TimeTrackingId)
                setTrimActivity({ ...trimActivity, totalHours: response?.data?.data?.totalHours.daily })
                setTimeout(() => {
                    setLoading(false)
                }, 100);
                console.log(response);
            }
        }
        catch (error) {
            setTimeout(() => {
                setLoading(false)
            }, 100);
            console.log(error);
        }
    };

    async function getAllDays() {
        try {
            const response = await axios.get(`${apiUrl}/superAdmin/hoursbyday/${userId}?date=${activeMonth}`, { headers });
            const totalHours = response.data.data.totalHoursByDay;
            console.log("totalHours of active month", response.data);
            const currentDate = new Date();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const currentYear = currentDate.getFullYear();
            const maxHours = 6;
            let percentagesByDay = [];
            const processMonth = (totalHours, month, year) => {
                const filteredHours = totalHours.filter(th => {
                    const dateParts = th.date.split('-').map(part => part);
                    return dateParts[1] === month && dateParts[2] == year;
                });

                console.log(`filteredHoursss for ${month}-${year}`, filteredHours);

                filteredHours.forEach(th => {
                    const timeMatches = th.totalHours.match(/(\d+)h\s*(\d*)m/);
                    let totalMinutes = 0;

                    if (timeMatches) {
                        const hours = parseInt(timeMatches[1], 10) || 0;
                        const minutes = parseInt(timeMatches[2], 10) || 0;
                        totalMinutes = hours * 60 + minutes;
                    }

                    const totalHoursDecimal = totalMinutes / 60;
                    const widthPercentage = (totalMinutes / (maxHours * 60)) * 100;
                    const widthPercentageExact = (totalHoursDecimal / maxHours) * 100;

                    percentagesByDay.push({
                        date: th.date,
                        totalMinutes: totalMinutes,
                        percentage: Math.min(widthPercentage, 100),
                        percentageExact: Math.min(widthPercentageExact, 100),
                    });
                });
            };
            // Assuming you have the totalHours data available
            // Process data for the first month of the new year
            let isFirstMonthProcessed = false;

            for (let year = currentDate.getFullYear(); year >= 2022; year--) {
                for (let month = 12; month >= 1; month--) {
                    processMonth(totalHours, month.toString().padStart(2, '0'), year.toString());

                    // Break out of the loop after processing the first month
                    if (month === 1 && !isFirstMonthProcessed) {
                        isFirstMonthProcessed = true;
                        break;
                    }
                }
            }

            console.log({ percentagesByDay });
            setTotalPercentageByDay(percentagesByDay);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [formattedDate]);

    useEffect(() => {
        getAllDays()
    }, [activeMonth]);

    const goBackToPreviousImage = () => {
        if (selectedImageIndex >= 0) {
            setSelectedImageIndex(selectedImageIndex - 1)
        }
        else {
            setSelectedImage(null);
            setSelectedImageIndex(null)
            setSSData(null)
        }
    };

    const goToNextImage = () => {
        if (selectedImageIndex < ssData?.screenshots?.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1)
        }
        else {
            setSelectedImage(null);
            setSelectedImageIndex(null)
            setSSData(null)
        }
    };

    const openModal = (element, imageSrc, index) => {
        setSelectedImage(imageSrc);
        setSelectedImageIndex(index)
        setSSData(element)
        console.log(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSSData(null)
        setSelectedImageIndex(null)
    };

    useEffect(() => {
        if (selectedImageIndex) {
            setSelectedImage(ssData?.screenshots[selectedImageIndex]?.key)
        }
        if (selectedImageIndex === 0) {
            setSelectedImage(ssData?.screenshots[0]?.key)
        }
    }, [selectedImageIndex])

    useEffect(() => {
        const keyPressHandler = (event) => {
            if (event.key === 'ArrowLeft') {
                console.log(event);
                goBackToPreviousImage();
            }
            else if (event.key === 'ArrowRight') {
                console.log(event);
                goToNextImage();
            }
            else if (event.key === 'Escape') {
                setSelectedImage(null);
                setSSData(null)
                setSelectedImageIndex(null)
            }
        }
        window.addEventListener('keydown', keyPressHandler);
        return () => window.removeEventListener('keydown', keyPressHandler);
    }, [selectedImageIndex]);

    const getColorForTimeRange = (hoursWorked) => {
        // Define your color thresholds based on hours worked
        const colorThresholds = [
            { minHours: 0, maxHours: 4, color: '#EFF9EC' },   // Color for 0-4 hours
            { minHours: 4, maxHours: 8, color: '#A8C96A' },   // Color for 4-8 hours
            { minHours: 8, maxHours: 12, color: '#FF5733' },  // Color for 8-12 hours
        ];
        // Find the first color threshold that matches the hours worked
        const matchedThreshold = colorThresholds.find(threshold => hoursWorked >= threshold.minHours && hoursWorked < threshold.maxHours);
        // Return the color of the matched threshold or a default color
        return matchedThreshold ? matchedThreshold.color : 'transparent';
    };

    const renderMinuteContainers = (hour, totalHoursWorked, startHour) => {
        const maxWorkingHoursInDay = 8;

        return (
            <div className="minute-container">
                {Array.from({ length: 60 }, (_, minute) => {
                    const hoursWorked = totalHoursWorked + hour + minute / 60;
                    const color = getColorForTimeRange(hoursWorked);
                    const totalMinutes = hoursWorked * 60;

                    // Use the totalMinutes directly for widthPercentage calculation
                    const widthPercentage = totalMinutes >= startHour
                        ? ((totalMinutes - startHour) / (maxWorkingHoursInDay * 60)) * 100
                        : 0;

                    const style = color !== 'transparent' ? { background: color } : {};

                    return (
                        <div
                            key={minute}
                            className={`time-interval ${color !== 'transparent' ? 'colored' : ''}`}
                            style={{ width: `${widthPercentage}%`, ...style }}
                        >
                            {minute}
                        </div>
                    );
                })}
            </div>
        );
    };


    const getHourAndMinuteFromTime = (time) => {
        const timeRangeMatch = time.match(/(\d{1,2}:\d{2})\s([APMapm]{2})\s-\s(\d{1,2}:\d{2})\s([APMapm]{2})/);

        if (timeRangeMatch) {
            const [, start, startPeriod, end, endPeriod] = timeRangeMatch;

            const parseTime = (time, period) => {
                let [hour, minute] = time.split(":").map(part => parseInt(part, 10));

                if (isNaN(hour) || isNaN(minute)) {
                    return null;
                }

                if (period.toLowerCase() === 'pm' && hour !== 12) {
                    hour += 12;
                }

                return { hour, minute };
            };

            const startTime = parseTime(start, startPeriod);
            const endTime = parseTime(end, endPeriod);

            if (!startTime || !endTime) {
                return {};
            }

            return { startTime, endTime };
        }

        return {};
    };

    const renderTimeIntervals = () => {
        const intervals = [];
        let totalHoursWorked = 0;

        for (let hour = 0; hour <= 23; hour++) {
            const isPM = hour >= 12;
            const formattedHour = hour <= 12 ? hour : hour - 12;

            intervals.push(
                <div key={hour} className="time-slot">
                    <div className="hour-color">
                        {formattedHour === 0 ? 12 : formattedHour} {isPM ? 'pm' : 'am'}
                        {renderMinuteContainers(hour, totalHoursWorked, 0)}
                    </div>
                </div>
            );

            totalHoursWorked += 1;
        }

        data?.groupedScreenshots?.forEach((timeRange) => {
            const { startTime, endTime } = getHourAndMinuteFromTime(timeRange.time);

            if (startTime && endTime) {
                for (let hour = startTime.hour; hour <= endTime.hour; hour++) {
                    const isPM = hour >= 12;
                    const formattedHour = hour <= 12 ? hour : hour - 12;
                    const index = hour % 24;

                    intervals[index] = (
                        <div key={hour} className="time-slot">
                            <div className="hour-color">
                                {formattedHour === 0 ? 12 : formattedHour} {isPM ? 'pm' : 'am'}
                                {renderMinuteContainers(hour, totalHoursWorked, startTime.hour * 60 + startTime.minute)}
                            </div>
                        </div>
                    );
                }
            }
        });

        return intervals;
    };

    const handleOpenDeleteModal = (element, elements) => {
        setShowDeleteModal(true)
        setScreenshotId(elements._id)
    }

    const handleDeleteSS = async () => {
        setShowDeleteModal(false)
        try {
            const response = await axios.delete(`${apiUrl}/superAdmin/deleteScreenshot/${screenshotId}/TimeTracking/${timeTrackingId}`, {
                headers: headers
            })
            if (response.status === 200) {
                console.log(response);
                enqueueSnackbar("Screenshot deleted", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
            }
            fetchData()
        } catch (error) {
            console.log(error);
            enqueueSnackbar("network error", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }
    }

    const handleTrimActivity = async () => {
        setShowOfflineTime(false)
        setShowTrimActivity(false)
        setShowSplitActivity(false)
        const formattedStartTime = formattedDate + " " + trimActivity?.startTime;
        const formattedEndTime = formattedDate + " " + trimActivity?.endTime;
        const timeEntryId = trimActivity?.timeentryId

        try {
            const response = await axios.patch(`${apiUrl}/superAdmin/trim-activity/${userId}/${timeEntryId}`, {
                startTime: formattedStartTime,
                endTime: formattedEndTime,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                enqueueSnackbar(response.data.data.message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                fetchData()
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddOfflineTime = async () => {
        setShowTrimActivity(false)
        setShowOfflineTime(false)
        setShowSplitActivity(false)
        console.log({
            startTime: formattedDate + " " + offlineTime?.startTime,
            endTime: formattedDate + " " + offlineTime?.endTime,
            notes: "Offline activity description",
        });
        try {
            const response = await axios.post(`${apiUrl}/superAdmin/offline-time/${userId}`, {
                startTime: formattedDate + " " + offlineTime?.startTime,
                endTime: formattedDate + " " + offlineTime?.endTime,
                notes: "Offline activity description",
                projectId: "643fb528272a1877e4fcf30e",
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 200) {
                enqueueSnackbar("offline time added", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                fetchData()
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSplitActivity = async () => {
        setShowSplitActivity(false)
        setShowTrimActivity(false)
        setShowOfflineTime(false)
        try {
            const response = await axios.post(`${apiUrl}/superAdmin/split-activity`, {
                timeEntryId: trimActivity?.timeentryId,
                userId: userId,
                splitTime: formattedDate + " " + splitTime?.splitTime
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.status === 200) {
                enqueueSnackbar(response.data.message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                })
                fetchData()
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setRotation(rotation + 1)
        }, 10);
        if (rotation >= 190) {
            setRotation(0)
        }
        return () => clearInterval(timer)
    }, [rotation])

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                setShowScrollButton(true)
            }
            else {
                setShowScrollButton(false)
            }
        })
    }, [])

    useEffect(() => {
        set_current_day(days[currentDay])
        set_current_month(months[currentMonth])
    }, [])

    console.log({ activeMonth })

    return (
        <div>

            {showScrollButton === true ? <BackToTop /> : null}
            {showDeleteModal ? <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} animation={true} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Delete screenshot</p>
                    <p>Are you sure want to delete this screenshot? This will also cut time from your timeline.</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={handleDeleteSS}>
                        DELETE
                    </button>
                    <button className="teamActionButton" onClick={() => setShowDeleteModal(false)}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            {showTrimActivity ? <Modal show={showTrimActivity} onHide={() => {
                setShowOfflineTime(true)
                setShowTrimActivity(false)
                setShowSplitActivity(false)
            }} animation={true} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Edit time</p>
                    <div className="editBoxLowerDiv">
                        <p>You can trim activity time, or edit activity note. <br />
                            If you need add time, then <span style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }} onClick={() => {
                                setShowOfflineTime(true)
                                setShowTrimActivity(false)
                                setShowSplitActivity(false)
                            }}>Add Offline Time </span> instead
                        </p>

                        {trimActivity?.startTime < startTime || trimActivity?.endTime > endTime ? (
                            <p style={{ color: "red" }}>`From` and `To` must be within current bounds. <br /> To add extra time, Add Offline Time instead.</p>
                        ) : null}

                        <div className="editboxinputdiv">
                            <input onChange={(e) => setTrimActivity({ ...trimActivity, startTime: e.target.value })} value={trimActivity?.startTime} />
                            -
                            <input onChange={(e) => setTrimActivity({ ...trimActivity, endTime: e.target.value })} value={trimActivity?.endTime} />
                            <p>-{trimActivity?.totalHours ? trimActivity?.totalHours : "0h 0m"}</p>
                        </div>
                        <p className="sevenAm">eg 7am to 9:10am or 17:30 to 22:00</p>
                        <div>
                            <select className="projectOption" defaultValue="">
                                <option>Infiniti Solutions</option>
                                <option>Y8HR</option>
                                <option>Peel HR</option>
                                <option>Geox HR</option>
                                <option>Click HR</option>
                            </select>
                        </div>
                        <textarea placeholder="Note (optional)" rows="5" ></textarea>
                        <div className="deleteActivityPart">
                            <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <input id="editcheck" type="checkbox" />
                                <p style={{ margin: "0 0 0 10px", padding: 0 }}>Delete this activity</p>
                            </div>
                            <p style={{ margin: 0, cursor: "pointer" }} onClick={() => {
                                setShowSplitActivity(true)
                                setShowTrimActivity(false)
                            }}>Split Activity</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={handleTrimActivity}>
                        SAVE CHANGES
                    </button>
                    <button className="teamActionButton" onClick={() => {
                        setShowOfflineTime(false)
                        setShowTrimActivity(false)
                        setShowSplitActivity(false)
                    }}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            {showSplitActivity ? <Modal show={showSplitActivity} onHide={() => {
                setShowSplitActivity(false)
                setShowTrimActivity(false)
                setShowOfflineTime(false)
            }} animation={true} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Edit time</p>
                    <div className="editBoxLowerDiv">
                        <div className="editboxinputdiv">
                            <input disabled={true} value={splitTime?.startTime} />
                            -<input value={splitTime?.splitTime} onChange={(e) => setSplitTime({ ...splitTime, splitTime: e.target.value })} placeholder="split" />-
                            <input disabled={true} value={splitTime?.endTime} /> <p>-0h 40m</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={handleSplitActivity}>
                        SAVE CHANGES
                    </button>
                    <button className="teamActionButton" onClick={() => {
                        setShowSplitActivity(false)
                        setShowTrimActivity(false)
                        setShowOfflineTime(false)
                    }}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            {showOfflineTime ? <Modal show={showOfflineTime} onHide={() => {
                setShowOfflineTime(false)
                setShowSplitActivity(false)
                setShowTrimActivity(false)
            }} animation={true} centered>
                <Modal.Body>
                    <p style={{ marginBottom: "20px", fontWeight: "700", fontSize: "20px" }}>Add Offline Time</p>
                    <div className="editBoxLowerDiv">
                        <p>Offline time range will appear on your timeline <br />
                            You will able to edit or delete from there
                        </p>
                        <div className="editboxinputdiv">
                            <input onChange={(e) => setOfflineTime({ ...offlineTime, startTime: e.target.value })} value={offlineTime?.startTime} />
                            -
                            <input onChange={(e) => setOfflineTime({ ...offlineTime, endTime: e.target.value })} value={offlineTime?.endTime} />
                            <p>-{offlineTime?.totalHours ? offlineTime?.totalHours : "0h 0m"}</p>
                        </div>
                        <p className="sevenAm">eg 7am to 9:10am or 17:30 to 22:00</p>
                        <div>
                            <select className="projectOption">
                                <option>Infiniti Solutions</option>
                                <option>Y8HR</option>
                                <option>Peel HR</option>
                                <option>Geox HR</option>
                                <option>Click HR</option>
                            </select>
                        </div>
                        <textarea placeholder="Note (optional)" rows="5" ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="teamActionButton" onClick={handleAddOfflineTime}>
                        SAVE CHANGES
                    </button>
                    <button className="teamActionButton" onClick={() => {
                        setShowOfflineTime(false)
                        setShowSplitActivity(false)
                        setShowTrimActivity(false)
                    }}>
                        CANCEL
                    </button>
                </Modal.Footer>
            </Modal> : null}
            <SnackbarProvider />
            <div className="container">
                <div className="mainwrapper">

                    <div className="userHeader">
                        <div className="headerTop">
                            <h5><img src={circle} alt="" /> {data?.name}</h5>
                        </div>
                        <div className="headerTop">
                            <p>All times are UTC + {items.timezoneOffset}</p>
                            <img src={setting} alt="setting.png" style={{ cursor: "pointer" }} onClick={() => navigate("/adminaccount")} />
                        </div>
                    </div>

                    <div className="userMainContent">
                        <div>
                            <div className="calendar-container">
                                <div className="header">
                                    <img src={left} onClick={prevMonth} alt="Previous Month" />
                                    <h2 className="monthName">{date.toLocaleString("en-US", { month: "long" })}</h2>
                                    <img src={right} onClick={nextMonth} alt="Next Month" />
                                </div>
                            </div>
                            <div className="days-weeks">{renderCalendar()}</div>
                            <div className="timerAndTracking">
                                <div style={{ margin: "0 10px 0 0" }} className="timerLeft">
                                    <div>
                                        <img width={120} src={logo} alt="" />
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                        <p className="weekDayTimer">{formattedDate == todayDate ? days[currentDay] : days[clickDay]} </p>
                                        <p className="weekDayTimer">{formattedDate && formattedDate.split('-')[2]}</p>
                                        <p className="weekDateTimer">{formattedDate == todayDate ? months[currentMonth] : months[month]}</p>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>{Math.floor(data?.totalactivity)} %</Tooltip>}>
                                            <div className="circular-progress" style={{
                                                cursor: "pointer"
                                            }}>
                                                <CircularProgressBar activityPercentage={data?.totalactivity} size={30} />
                                            </div>
                                        </OverlayTrigger>
                                        <p className="timerClock">{data?.totalHours?.daily}</p>
                                        <p className="weekTimer">Week</p>
                                        <p className="weekTimerDigit">{data?.totalHours?.weekly}</p>
                                        <img src={circleDot} alt="CircleDot.png" />
                                        <p className="weekTimer">Month</p>
                                        <p className="monthTimerDigit">{data?.totalHours?.monthly}</p>
                                    </div>
                                </div>
                                <div className="activity-image-container">
                                    <div className="activityMainHeading">
                                        <h4 className="activityMainHeadingContent">Activity Tracker</h4>
                                        <p className="activityMainContent">Activity Level</p>
                                    </div>
                                    <div className="activityMeternContent">
                                        <div className="activityMeterContentMain">
                                            <div className="activityMeterContent">
                                                <img src={perc_20} alt="" />
                                                <p className="activityMeterContentPercent">0 - 20 %</p>
                                            </div>
                                            <div className="activityMeterContent">
                                                <img src={perc_40} alt="" />
                                                <p className="activityMeterContentPercent">21 - 40 %</p>
                                            </div>
                                            <div className="activityMeterContent">
                                                <img src={perc_60} alt="" />
                                                <p className="activityMeterContentPercent">41 - 60 %</p>
                                            </div>
                                            <div className="activityMeterContent">
                                                <img src={perc_80} alt="" />
                                                <p className="activityMeterContentPercent">61 - 80 %</p>
                                            </div>
                                            <div className="activityMeterContent">
                                                <img src={perc_100} alt="" />
                                                <p className="activityMeterContentPercent">81 - 100 %</p>
                                            </div>
                                        </div>
                                        <div className="activityMeterMain">
                                            <div className="activityMeterMainContainer">
                                                <img className="activityMeterMainImage" src={activityImage} alt="" />
                                                <div className="needleContainerMain">
                                                    <div
                                                        className="needleContainerMainAlingment"
                                                        style={{
                                                            transform: `translateY(-50%) rotate(${Math.floor(data?.totalactivity) <= 20 ? -75 :
                                                                Math.floor(data?.totalactivity) > 20 && Math.floor(data?.totalactivity) <= 40 ? -38 :
                                                                    Math.floor(data?.totalactivity) > 40 && Math.floor(data?.totalactivity) <= 60 ? 0 :
                                                                        Math.floor(data?.totalactivity) > 60 && Math.floor(data?.totalactivity) <= 80 ? 35 :
                                                                            Math.floor(data?.totalactivity) > 80 ? 75 : -108
                                                                }deg)`
                                                        }}>
                                                        <div className="needleContainerAlingment">
                                                            <div className="diamond"></div>
                                                            <div className="needlePointerMain"></div>
                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>{Math.floor(data?.totalactivity)} %</Tooltip>}>
                                                                <div className="needleScrewMain"></div>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="time-scale" style={{ display: "flex" }}>
                                {renderTimeIntervals()}
                            </div>

                            <div>
                                {data && (data?.groupedScreenshots?.map((element) => {
                                    return (
                                        <div>
                                            {loading ? <Skeleton count={1} width="300px" height="34.5px" style={{ margin: "40px 0 0 0" }} /> : <div className="timeZone" onMouseOver={() => setShowEditButton(true)} onMouseOut={() => setShowEditButton(false)}>
                                                <p className="timeDuration">{element.time}</p>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>{Math.floor(element?.totalactivity)} %</Tooltip>}>
                                                    <div className="circular-progress" style={{ margin: "0 20px", cursor: "pointer" }}>
                                                        <CircularProgressBar activityPercentage={element?.totalactivity} size={30} />
                                                    </div>
                                                </OverlayTrigger>
                                                {showEditButton && <img onClick={() => {
                                                    setShowTrimActivity(true)
                                                    setTrimActivity({
                                                        ...trimActivity,
                                                        timeentryId: element.timeentryId,
                                                        startTime: element.time.split(" ")[0] + " " + element.time.split(" ")[1],
                                                        endTime: element.time.split(" ")[3] + " " + element.time.split(" ")[4]
                                                    })
                                                    setSplitTime({
                                                        ...splitTime,
                                                        timeentryId: element.timeentryId,
                                                        startTime: element.time.split(" ")[0] + " " + element.time.split(" ")[1],
                                                        endTime: element.time.split(" ")[3] + " " + element.time.split(" ")[4]
                                                    })
                                                    setOfflineTime({
                                                        ...offlineTime,
                                                        timeentryId: element.timeentryId,
                                                        startTime: element.time.split(" ")[0] + " " + element.time.split(" ")[1],
                                                        endTime: element.time.split(" ")[3] + " " + element.time.split(" ")[4]
                                                    })
                                                    setStartTime(element.time.split(" ")[0] + " " + element.time.split(" ")[1])
                                                    setEndTime(element.time.split(" ")[3] + " " + element.time.split(" ")[4])
                                                }} src={edit} alt="EditTimeZone.png" style={{ cursor: "pointer" }} />}
                                            </div>}
                                            <div style={{
                                                display: "grid",
                                                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                                                gap: "20px",
                                            }}>
                                                {element?.screenshots && (element?.screenshots?.map((elements, index) => {
                                                    return loading ? (
                                                        <Skeleton count={1} width="364px" height="248.44px" style={{ margin: "20px 0 12px 0" }} />
                                                    ) : (
                                                        <div className="projectAdd" onMouseOver={() => setShowDeleteButton(true)} onMouseOut={() => setShowDeleteButton(false)}>
                                                            <div className="timelineDiv">
                                                                <OverlayTrigger placement="top" overlay={<Tooltip>{elements?.description}</Tooltip>}>
                                                                    <p className="notes">
                                                                        {elements?.time}
                                                                        <a className="websiteLink" href="#">{elements?.description}</a>
                                                                    </p>
                                                                </OverlayTrigger>
                                                                <img src={deleteIcon} alt="" style={{ marginRight: 15 }} onClick={() => handleOpenDeleteModal(element, elements)} />
                                                                {elements?.visitedUrls?.length === 0 ?
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>0 %</Tooltip>}>
                                                                        <div className="circular-progress">
                                                                            <CircularProgressBar activityPercentage={100} size={30} emptyUrl={0} />
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                    :
                                                                    elements?.visitedUrls?.map((e) => {
                                                                        return e?.activityPercentage === 0 ? (
                                                                            <OverlayTrigger placement="top" overlay={<Tooltip>0 %</Tooltip>}>
                                                                                <div className="circular-progress">
                                                                                    <CircularProgressBar activityPercentage={100} size={30} emptyUrl={0} />
                                                                                </div>
                                                                            </OverlayTrigger>
                                                                        ) : (
                                                                            <OverlayTrigger placement="top" overlay={<Tooltip>{Math.floor(e?.activityPercentage)} %</Tooltip>}>
                                                                                <div className="circular-progress">
                                                                                    <CircularProgressBar activityPercentage={e?.activityPercentage} size={30} />
                                                                                </div>
                                                                            </OverlayTrigger>
                                                                        )
                                                                    })}
                                                            </div>
                                                            <div className="screenShotImg">
                                                                <img className="screenshotiimage" onClick={() => openModal(element, elements?.key, index)} src={elements?.key} alt="ScreenShotImg.png" />
                                                            </div>
                                                        </div>
                                                    )
                                                }))}

                                                {selectedImage && (
                                                    <div className="fullscreen-screenshot-model">
                                                        <div style={{ margin: "20px 20px 0 20px", textAlign: "right" }}>
                                                            <ImCross size={20} color="white" onClick={closeModal} />
                                                        </div>
                                                        <div className="ss-image">
                                                            <div className="d-flex align-items-center gap-5">
                                                                <div
                                                                    onClick={() => {
                                                                        goBackToPreviousImage(element.screenshots)
                                                                    }}>
                                                                    <img width={40} src={leftArrow} />
                                                                </div>
                                                                <div>
                                                                    <img className="modalImage" src={selectedImage} alt="Pop-up Image" />
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        goToNextImage(element.screenshots)
                                                                    }}>
                                                                    <img width={40} src={rightArrow} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }))}
                            </div>

                            <div className="historyButton">
                                <img className="historyImg" src={historyIcon} alt="HistoryIcon.png" />
                                <p className="historyOfChanges">History of Changes</p>
                            </div>

                            {/* <div className="editBoxMainDiv">
                                {changeEdit && <TimeEntryModal edit={edit} setEdit={setEdit} splitsActivity={splitsActivity} changeOffline={changeOffline} />}
                            </div> */}

                        </div>

                    </div>
                </div>
                <img className="userDetailLine" src={line} />
            </div>
        </div>
    )
}

export default AdminUser;