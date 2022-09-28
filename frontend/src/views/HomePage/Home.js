import React from 'react'
import CheckMark from './CheckMark';
import CloseCircle from './CloseCircle';
import api from '../../api/api'
import Noty from 'noty'
import { useNavigate } from "react-router-dom";
import './style.css'

function Home() {
    const navigate = useNavigate()

    async function enterSchool() {
        const userdata = JSON.parse(localStorage.getItem("attendanceJWT"))

        const objData = {
            username: userdata.username,
            email: userdata.email,
            uuID: userdata.uuID,
        }

        const res = await api.post("/enterschool", objData)

        console.log(res);
        if(res){
            new Noty({
                text: "officially entered to the school",
                layout: 'topRight',
                type: 'success',
                theme: 'bootstrap-v4',
                timeout: 5000
              }).show();

            localStorage.clear();
            navigate("/")
            window.location.reload()


        }
    }

    async function leaveShool() {
        const userdata = JSON.parse(localStorage.getItem("attendanceJWT"))

        const objData = {
            username: userdata.username,
            email: userdata.email,
            uuID: userdata.uuID,
        }

        const res = await api.post("/leaveschool", objData)

        console.log(res);
        if(res){
            new Noty({
                text: "officially entered to the school",
                layout: 'topRight',
                type: 'success',
                theme: 'bootstrap-v4',
                timeout: 5000
              }).show();

            localStorage.clear();
            navigate("/")
            window.location.reload()


        }
    }

      return (
          <div style={{width: "100%", height:"100%"}}>
            <div className="button-place">
            <button type="button" className="button1" onClick={enterSchool}>
                <span className="button1__text">I'm Entering To School</span>
                <span className="button1__icon">
                    <CheckMark dimensions={"50px"} />
                </span>
            </button>
            <button type="button" className="button2" onClick={leaveShool}>
                <span className="button2__text">I'm Leaving The School</span>
                <span className="button2__icon">
                    <CloseCircle dimensions={"50px"} />
                </span>
            </button>
        </div>

    
          </div>
      )
  }


export default Home;