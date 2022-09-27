import React, { useState, createContext, useEffect } from "react";

export const LoginContext = createContext()

export const LoginContextProvider = props => {
    const [loginJWT, setLoginJWT] = useState(localStorage.getItem('attendanceJWT') ? true : false)
    const [attendanceEmail, setAttendanceEmail] = useState(localStorage.getItem('attendanceEmail') ? true : false)

    return (
        <LoginContext.Provider value={{loginJWT: [loginJWT, setLoginJWT]}}>
            {props.children}
        </LoginContext.Provider>
    )
}