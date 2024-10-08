import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "../screen/signup";
import SignIn from "../screen/signin";
import UserDashboard from "../screen/userDashboard";
import Home from "../screen/home";
import UserDetails from "../screen/userDetails";
import Account from "../screen/account";
import Profile from "../screen/profile";
import ForgetPassword from "../screen/forgetpassword";
import Setting from "../adminScreens/setting";
import SystemAdminLogin from "../systemAdmin/systemAdminLogin";
import OwnerUserSignup from "../companyOwner/ownerUser";
import OwnerTeam from "../companyOwner/ownerTeam";
import Download from "../screen/download";
import CreateAccount from "../screen/createAccount";
import Layout from "../layout";
import UpdatePassword from "../screen/updatePassword";
import VerificationCode from "../screen/verificationCode";
import CaptureScreen from "../screen/captureScreen";
import OwnerReport from "../screen/owner-reports";
import OwnerUserTimeline from "../companyOwner/ownerUsersTimeline";
import PrivacyPolicy from "../screen/privacy-policy";
import PrivacyPolicy1 from '../screen/privacy-policy1'
import PrivacyPolicy2 from '../screen/privacy-policy2'
import Project from "../screen/Project";
import Payment from "../screen/payment";



export default function AppRouter() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Public Routes */}

            <Route path="/download" element={<Download />} />
            <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/signin" element={!token ? <SignIn /> : <Navigate to="/dashboard" />} />
            <Route path="/systemAdminLogin" element={<SystemAdminLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/capture-screen" element={<CaptureScreen />} />
            <Route path="/:token" element={<Home />} />
            <Route path="/create-account/:code/:email" element={<CreateAccount />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/update-password/:id" element={<UpdatePassword />} />
            <Route path="/verification-code" element={<VerificationCode />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy1" element={<PrivacyPolicy1 />} />
            <Route path="/privacy-policy2" element={<PrivacyPolicy2 />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={ <UserDashboard /> } />

            {/* <Route path="/dashboard" element={token ? <UserDashboard /> : <Navigate to="/" />} /> */}
            <Route path="/timeline" element={token ? <UserDetails /> : <Navigate to="/" />} />
            <Route path="/timeline/:id" element={token ? <UserDetails /> : <Navigate to="/" />} />
            <Route path="/account" element={token ? <Account /> : <Navigate to="/" />} />
            <Route path="/effective-settings" element={token ? <Setting /> : <Navigate to="/" />} />
            <Route path="/team" element={token ? <OwnerTeam /> : <Navigate to="/" />} />
            <Route path="/reports" element={token ? <OwnerReport /> : <Navigate to="/" />} />
            <Route path="/Projects" element={token ? <Project /> : <Navigate to="/" />} />
            <Route path="/company-owner-user" element={token ? <OwnerUserSignup /> : <Navigate to="/" />} />
            <Route path="/activity/:id" element={token ? <OwnerUserTimeline /> : <Navigate to="/" />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" />} />
            {/* <Route path="/privacy-policy" element={token ? <PrivacyPolicy /> : <Navigate to="/" />} /> */}
            {/* <Route path="/privacy-policy1" element={<PrivacyPolicy1/>} />
            <Route path="/privacy-policy2" element={<PrivacyPolicy2 />} /> */}

          </Route>
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </>
  );
}
