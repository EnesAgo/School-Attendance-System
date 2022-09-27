import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'
import Noty from "noty";

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
  
    const [emailList, setEmailList] = useState(['enesago010@gmail.com', 'mertago@gmail.com'])
  
    const selectRef = useRef()
    
  
    async function submitScan(e) {
      e.preventDefault()
      console.log(typeof(email))
  
      if(!email || email===null){
        selectRef.current.focus();
  
        new Noty({
          text: "qrcode not exepted",
          layout: 'topRight',
          type: 'error',
          theme: 'bootstrap-v4',
          timeout: 5000
        }).show();
  
        return;
      }
  
      const objData = {
        email: email
      }
  
      const res = await api.post("/generatecode", objData)
  
      if(res.error){
        new Noty({
          text: res.error,
          layout: 'topRight',
          type: 'error',
          theme: 'bootstrap-v4',
          timeout: 5000
        }).show();
        return;
      }
  
      new Noty({
        text: "email has sent successfully, redirecting to home page",
        layout: 'topRight',
        type: 'success',
        theme: 'bootstrap-v4',
        timeout: 5000 
      }).show();
  
      console.log(res)
      
      localStorage.setItem('attendanceEmail', email)
      localStorage.setItem('qrID', JSON.stringify(res))
  
      navigate("/login")
      window.location.reload()
    }
  
    return (
      <div className="Login" style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100%"}}>
        <form onSubmit={submitScan} style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>
  
          <br />
          <select ref={selectRef} defaultValue={'DEFAULT'} name="emails" onChange={e => setEmail(e.target.value)}>
            <option value="DEFAULT" disabled >Choose one</option>
            
            {emailList.map(e => <option value={e} key={e}>{e}</option>)}
            
          </select>

          <br />
  
          <button>Submit</button>
        </form>
          
  
      </div>
    );
  
  }


export default Login;