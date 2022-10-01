import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'
import Noty from "noty";

import './style.css'
import MailIcon from "./MailIcon";

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
  
    const [emailList, setEmailList] = useState(['enesago010@gmail.com', 'mertago@gmail.com'])

    const [active, setActive] = useState(false)

    const selectRef = useRef()



    
    useEffect(() => {
      async function getAllEmails() {
        try{
          const allEmails = await api.get("/allusers");
          const emailList = allEmails.map(e => e.email)
          // console.log(emailList)
          setEmailList(emailList)
        }
        catch(e){
          console.log(e)
        }
      }
      getAllEmails()

    }, [])
  
    async function submitScan(e) {
      e.preventDefault()
      // console.log(typeof(email))
      setActive(true)
  
      if(!email || email===null){
        selectRef.current.focus();
  
        new Noty({
          text: "qrcode not exepted",
          layout: 'topRight',
          type: 'error',
          theme: 'bootstrap-v4',
          timeout: 5000
        }).show();
  
        setActive(false)
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

        setActive(false)
        return;
      }
  
      new Noty({
        text: "email has sent successfully, redirecting to home page",
        layout: 'topRight',
        type: 'success',
        theme: 'bootstrap-v4',
        timeout: 5000 
      }).show();
  
      // console.log(res)
      
      localStorage.setItem('attendanceEmail', email)
      localStorage.setItem('qrID', JSON.stringify(res))
  
      navigate("/login")
      window.location.reload()
    }
  
    return (
      <div className="Login" style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100%"}}>
       {active && 
        <div className="loader">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      }
        <div className={`container ${active && 'inactive'}`}>
          <div className="row px-3">
            <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
              <div className="img-left d-none d-md-flex" />
              <div className="card-body">
                <h4 className="title text-center mt-4">Yahya Kemal College Struga <br /> Teacher Log-In Panel</h4>
                <form className="form-box px-3" onSubmit={submitScan}>
                  <div className="form-input">
                    <span style={{display: "flex", alignItems: "top", marginTop: "5px"}}><MailIcon dimensions={"16px"} /></span>
                    <select ref={selectRef} defaultValue={'DEFAULT'} name="emails" onChange={e => setEmail(e.target.value)}>
                      <option value="DEFAULT" disabled >Choose one</option>
                      {emailList.map(e => <option value={e} key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-block text-uppercase">Enter</button>
                  </div>
                  <div className="text-right">
                     <a target={"_blank"} href="mailto:info@ykc.edu.mk" className="forget-link">Need Help?</a>
                  </div>
                  <div className="text-center mb-3">Our Social Media!</div>
                  <div className="row mb-3">
                    <div className="col-4">
                       <a target={"_blank"} href="https://m.facebook.com/profile.php?id=100057597453888" className="btn btn-block btn-social btn-facebook">Facebook</a>
                    </div>
                    <div className="col-4">
                       <a target={"_blank"} href="https://www.instagram.com/ykcstruga/" className="btn btn-block btn-social btn-google" style={{width: "110px"}} >Instagram</a>
                    </div>
                    <div className="col-4">
                       <a target={"_blank"} href="https://twitter.com/ykcedumk" className="btn btn-block btn-social btn-twitter">Twitter</a>
                    </div>
                  </div>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>

  
</div>
    );
  
  }


export default Login;