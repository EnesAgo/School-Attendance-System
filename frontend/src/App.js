import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/HomePage/Home";
import LoginScanner from "./views/loginScanner/LoginScanner";

function App() {

  const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('attendanceJWT') ? true : false)


  return (
    <>
      <Routes>

        {/* login & signup */}

        <Route exact path="/" element={<LoginScanner />} />

        {/* Home */}

        <Route exact path="/home" element={isLogedIn ? <Home /> : <Navigate to="/" />} />

        {/* not found */}
        <Route path='*' element={<LoginScanner />} />


      </Routes>
    </>
  )
}

export default App;
