import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-scanner'
import api from '../../api/api'
import { useNavigate } from "react-router-dom";
import Noty from 'noty';
import './style.css'

function LoginScanner() {
    const navigate = useNavigate()
    const [delay, setDelay] = useState(100);
    const [result, setResult] = useState();


    async function getQuery(qrID) {
        const res = await api.post(`/login`, {qrID: qrID})

        return res;
      }
    

    useEffect(() => {
      if(result){
        getQuery(result.text).then(res => {

          if(res.error){
            localStorage.clear()
            new Noty({
              text: "qrcode not exepted",
              layout: 'topRight',
              type: 'error',
              theme: 'bootstrap-v4',
              timeout: 5000
            }).show();
            // console.log(res)  
            navigate("/")
        }
        else{
            localStorage.setItem('attendanceJWT', JSON.stringify(res))
            localStorage.attendanceJWT = JSON.stringify(res)
            // console.log("navigating")
            // console.log(res)  
            navigate("/home")
            window.location.reload()
        }
  

        })

      
        // setShow(false)
      }
    }, [result])

    function handleError(err) {
        console.error(err)
      }
      function handleScan(data) {
        if(data && data !== null){
          setResult(data)
          console.log(data)
        }
      }
    
      const bodyStyle = {width: "100%", height: "100%", display:"flex", alignItems: "center", justifyContent: "center"}

      const previewStyle = {
        height: 240,
        width: 320,
        display: "block",
        opacity: "85%",
        position: "absolute",
        zIndex: 1

      }
      const lineStyle = {
        height: 2,
        width: 320,
        display: "block",
        background: "rgb(255,0,0)",
        opacity: "1",
        position: "absolute",
        zIndex: 99

      }
      return (
          <div style={bodyStyle}>


            <div className="backButton" onClick={() => {localStorage.clear(); window.location.reload()}}>

              <div className="wrapper">
                <div><span>RELOAD</span></div>
              </div>

            </div>


            {/* <button style={{position: "fixed", top:"5px", left:"5px"}} onClick={() => {localStorage.clear(); window.location.reload()}}>Go Back</button> */}
           <div className="redLine" style={lineStyle}></div>
           <QrReader
              delay={delay}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          </div>
      )
  }


export default LoginScanner;