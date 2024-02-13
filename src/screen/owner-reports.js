import React, { useEffect, useState } from "react";
import UserHeader from "../screen/component/userHeader";
import menu from "../images/menu.webp";
import loader from "../images/Rectangle.webp";
import check from "../images/check.webp";
import circle from "../images/circle.webp";
import saveReport from "../images/reportImg.webp";
import blueArrow from "../images/bluearrow.webp";
import cross from "../images/cross.webp";
import downArrow from "../images/downArrow.webp";
import save from "../images/save.webp";
import excel from "../images/excel.webp";
import share from "../images/share.webp";
import reportButton from "../images/reportButton.webp";
import adminReport from "../images/adminreport4.webp";
import addButton from "../images/addButton.webp";
import line from "../images/line.webp";
import Footer from "../screen/component/footer";
import UserDashboardSection from "./component/userDashboardsection";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import blueBackground from "../images/bluebackground.png";
import ActivityChart from "../adminScreens/component/ActivityChart";
import SelectBox from "../companyOwner/ownerComponent/selectBox";
import makeAnimated from 'react-select/animated';
import axios from "axios";

function OwnerReport() {

  const year = new Date().getFullYear()
  let token = localStorage.getItem('token');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const today = startDate?.getFullYear();
  const startCurrentMonth = (startDate?.getMonth() + 1).toString().padStart(2, '0');
  const startCurrentDate = startDate?.getDate().toString().padStart(2, '0');
  const startTodayDate = `${today}-${startCurrentMonth}-${startCurrentDate}`;
  const endtoday = endDate?.getFullYear();
  const endCurrentMonth = (endDate?.getMonth() + 1).toString().padStart(2, '0');
  const endCurrentDate = endDate?.getDate().toString().padStart(2, '0');
  const endTodayDate = `${endtoday}-${endCurrentMonth}-${endCurrentDate}`;
  const [todayDate, setTodayDate] = useState("");
  const [data, setData] = useState(todayDate);
  const [yesterdayDate, setYesterdayDate] = useState('');
  const [latestDate, setLatestDate] = useState('');
  const [weekDate, setWeekDate] = useState("");
  const [monthDate, setMonthDate] = useState('');
  const [dateFilter, setDateFilter] = useState({
    today: false,
    thisWeek: false,
    thisMonth: false,
    yesterday: false,
    lastWeek: false,
    thisYear: false,
  })
  const [users, setUsers] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  let headers = {
    Authorization: 'Bearer ' + token,
  }
  const items = JSON.parse(localStorage.getItem('items'));
  const apiUrl = "https://combative-fox-jumpsuit.cyclic.app/api/v1";

  async function getSummaryData() {
    try {
      const response = await fetch(`${apiUrl}/timetrack/hours`, { headers })
      const json = await response.json();
      console.log(json);
      setData(json?.data?.totalHours?.daily)
      setLatestDate(json?.data?.totalHours?.daily)
      setYesterdayDate(json?.data?.totalHours?.yesterday)
      setWeekDate(json?.data?.totalHours?.weekly)
      setMonthDate(json?.data?.totalHours?.monthly)
    } catch (err) {
    }
  }

  useEffect(() => {
    getSummaryData();
  }, [])

  const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/timetrack/totalDate?startDate=${startTodayDate}&endDate=${endTodayDate}`, {
        method: "GET",
        headers
      })
      const json = await response.json()
      console.log(json);
      setData(json.data?.totalHours)
      if (json.message) {
        setData(json.message)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (startTodayDate != "" && endTodayDate != "") {
      getData();
    }
  }, [startTodayDate, endTodayDate]);

  const yearlyGetData = async (yearly) => {
    console.log(yearly);
    try {
      const response = await fetch(`${apiUrl}/timetrack/year?year=current`, {
        method: "GET",
        headers
      }).then((sucess) =>
        sucess.json()
      ).catch((error) => {
        error.json()
      })
      console.log(response);
    }
    catch (error) { }
  }

  const animatedComponents = makeAnimated();

  const getEmployess = async () => {
    try {
      const response = await axios.get(`${apiUrl}/owner/companies`, { headers })
      if (response.status) {
        setUsers(() => {
          const filterCompanies = response?.data?.employees?.filter((employess, index) => {
            return items.company === employess.company
          })
          return filterCompanies
        })
        console.log(response);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getReports = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/owner/year?yearSpecifier=this&userId=${id}`, { headers })
      if (response.status) {
        console.log(response);
        setReportData(response.data.data)
        setLoading(false)
      }
    }
    catch (err) {
      setLoading(false)
      console.log(err);
    }
  }

  useEffect(() => {
    getEmployess()
  }, [])

  const user = users?.map(user => ({ label: user.email, value: user.email, id: user._id }))
  const defaultValue = user.length > 0 ? [{ value: user[0].value }] : [];

  console.log(reportData);

  return (
    <div>
      <div className="container">
        <div className="userHeader">
          <div className="headerTop">
            <img src={saveReport} />
            <h5>Summary Report </h5>
          </div>
        </div>
        <div className="mainwrapper">
          <div className="summaryContainer">
            <div className="d-flex gap-5">
              <p>Start Date</p>
              <p>End Date</p>
            </div>
            <div className="calenderDiv">

              <div className="calenderInnerDiv">
                <div className="dateDiv">

                  <div> <button> <DatePicker className="bg-transparent border-0 text-center " selected={startDate} onChange={date => setStartDate(date)} /></button>
                  </div>


                  <div><img src={blueArrow} /></div>
                  <div>

                    <button>  <DatePicker className="bg-transparent border-0 text-center " selected={endDate} onChange={date => setEndDate(date)} /></button>

                  </div>
                </div>
                <div className="dayDiv">
                  <div className="summaryTodayDiv">
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: true,
                        yesterday: false,
                        thisWeek: false,
                        lastWeek: false,
                        thisMonth: false,
                        thisYear: false,
                      }
                    })} style={{ color: dateFilter.today === true && "#28659C", fontWeight: dateFilter.today === true && "600" }}>Today</p>
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: false,
                        yesterday: true,
                        thisWeek: false,
                        lastWeek: false,
                        thisMonth: false,
                        thisYear: false,
                      }
                    })} style={{ color: dateFilter.yesterday === true && "#28659C", fontWeight: dateFilter.yesterday === true && "600" }}>Yesterday</p>
                  </div>
                  <div className="summaryTodayDiv">
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: false,
                        thisWeek: true,
                        yesterday: false,
                        lastWeek: false,
                        thisMonth: false,
                        thisYear: false,
                      }
                    })} style={{ color: dateFilter.thisWeek === true && "#28659C", fontWeight: dateFilter.thisWeek === true && "600" }}>This Week</p>
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: false,
                        lastWeek: true,
                        thisWeek: false,
                        yesterday: false,
                        thisMonth: false,
                        thisYear: false,
                      }
                    })} style={{ color: dateFilter.lastWeek === true && "#28659C", fontWeight: dateFilter.lastWeek === true && "600" }}>Last Week</p>
                  </div>
                  <div className="summaryTodayDiv">
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: false,
                        thisMonth: true,
                        lastWeek: false,
                        thisWeek: false,
                        yesterday: false,
                        thisYear: false,
                      }
                    })} style={{ color: dateFilter.thisMonth === true && "#28659C", fontWeight: dateFilter.thisMonth === true && "600" }}>This Month</p>
                    <p onClick={() => setDateFilter((prevFilters) => {
                      return {
                        today: false,
                        thisMonth: false,
                        lastWeek: false,
                        thisWeek: false,
                        yesterday: false,
                        thisYear: true,
                      }
                    })} style={{ color: dateFilter.thisYear === true && "#28659C", fontWeight: dateFilter.thisYear === true && "600" }}>This Year</p>
                  </div>

                </div>
              </div>
              <div>
                <div className="dropdown">
                  <button className="btn m-0 utc5" type="button" aria-expanded="false">
                    {items?.timezone}
                  </button>
                </div>
              </div>
            </div>
            <div className="crossButtonDiv">
              <SelectBox
                onChange={(e) => {
                  getReports(e.id)
                }}
                options={user}
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={defaultValue}
                isMulti={false}
              />
            </div>
            <div>
              {/* <img className="reportButton" src={reportButton} /> */}
              {/* <SelectBox
                classNamePrefix="Select projects"
                defaultValue="Select projects"
                isDisabled={isDisabled}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                options={colourOptions}
                optionHeight={40}
                optionPadding={10}
              /> */}
              {/* <SelectBox
                defaultValue="Select projects"
                isSearchable={true}
                optionHeight={40}
                optionPadding={10}
              /> */}
            </div>
            <div className="summaryButton">
              <button className="activeButton">Show Reports</button>
            </div>
            <div className="adminReport4" style={{ height: '300px', backgroundColor: '#F5F5F5' }}>
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <div>
                    <p className="sixtyhour">{reportData?.totalHours ? reportData?.totalHours : "0h 0m"}</p>
                    <p className="report-percentage">{`${reportData?.totalActivity ? Math.ceil(reportData?.totalActivity) : 0} %`}</p>
                  </div>
                  <div className="summaryDiv">
                    <ActivityChart reportData={reportData} />
                  </div>
                </>
              )}
            </div>
            <div className="employeeDiv">
              <p>± Employees / ± Projects</p>
              <div className="durationDiv">
                <p>Duration</p>
                <p>Money</p>
                <p>Activity</p>
              </div>
            </div>
            {/* <div className="asadMehmoodDiv">
                                {console.log(data)}
                                <div>
                                    <p><img src={addButton} /><span>Fatima Zohra</span></p>
                                </div>
                                <div className="durationDiv">
                                    <p>36h 52m</p>
                                    <p>$27.64</p>
                                    <p>48 %</p>
                                </div>
                            </div> */}
          </div>
        </div>
      </div>
      <img className="admin1Line" src={line} />
    </div >
  )
}

export default OwnerReport;