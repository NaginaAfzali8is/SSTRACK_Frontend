import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/router";
import { useSelector } from 'react-redux';
// import { SocketProvider } from './io';
import UserContext from './screen/userContext';
import React, { useEffect, useState } from "react";


function App() {
  const [user1, setUser1] = useState(null);


  return (
   
    <>
     <UserContext.Provider value={{ user1, setUser1 }}>
         {/* Your app components */}
       </UserContext.Provider>
      {/* <SocketProvider> */}
        <AppRouter />;
      {/* </SocketProvider> */}
    </>
  );
}

export default App;