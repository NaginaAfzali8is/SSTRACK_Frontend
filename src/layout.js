import React from 'react';
import Header from './screen/component/header';
import Footer from './screen/component/footer';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from './screen/component/userHeader';

const Layout = () => {

  const location = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      {
        location.pathname === "/" ||
          location.pathname === "/signin" ||
          location.pathname === "/signup" ||
          location.pathname === "/forgetpassword" ||
          location.pathname === "/download" ||
          location.pathname === "/systemAdminLogin" ||
          location.pathname === "/forget-password" ||
          location.pathname === "/file-upload" ||
          location.pathname === "/verification-code" ||
          location.pathname.startsWith("/update-password") ||
          location.pathname.startsWith("/create-account") ||
          location.pathname === "/download" ? (
          <Header />
        ) : (
          <UserHeader />
        )
      }
      <div>
        <Outlet />
      </div>
      <div style={{ padding: "30px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;