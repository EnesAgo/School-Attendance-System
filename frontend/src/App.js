import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/HomePage/Home";
import Login from "./views/Login/Login";
import LoginScanner from "./views/loginScanner/LoginScanner";

function App() {

  const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('attendanceJWT') ? true : false)
  const [hasQrId, setHasQrId] = useState(localStorage.getItem('qrID') ? true : false)

  useEffect(() => {
    function checkStorage() {
      setIsLogedIn(localStorage.getItem('attendanceJWT') ? true : false)
      setHasQrId(localStorage.getItem('attendanceEmail') ? true : false)
      window.location.reload()
    }
    
    window.addEventListener('storage', checkStorage)

  }, [])


  return (
    <>
      <Routes>

        {/* login & signup */}

        <Route exact path="/" element={hasQrId ? <Navigate to="/login" /> : <Login />} />
        <Route exact path="/login" element={hasQrId ? <LoginScanner /> :  <Navigate to="/" /> } />

        {/* Home */}

        <Route exact path="/home" element={isLogedIn ? <Home /> : <Navigate to="/Login" />} />

        {/* not found */}
        <Route path='*' element={<Login />} />


      </Routes>
    </>
  )
}

export default App;
