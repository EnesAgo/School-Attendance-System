import React, { useContext, useEffect, useRef, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import './style.css'
import api from '../../api/api'

function SelectDate({
      setStartDateYear,
      setStartDateMonth,
      setStartDateDay,
      setEndDateYear,
      setEndDateMonth,
      setEndDateDay,
      setUserEmail
}) {

  const [search, setSearch] = useContext(SearchContext)
  const [emailList, setEmailList] = useState([])
  const [userNameList, setUserNameList] = useState([])
  
  

  const searchDate = () => {
    setSearch(prev => !prev)
  }

  const startRef = useRef()
  const endRef = useRef()
  const selectRef = useRef()

  useEffect(() => {
    async function getAllEmails() {
      try{
        const allEmails = await api.get("/allusers");
        const emailList = allEmails.map(e => e.email)
        setEmailList(emailList)

        const usernameList = allEmails.map(e => e.username)
        setUserNameList(usernameList)
      }
      catch(e){
        console.log(e)
      }
    }
    getAllEmails()

  }, [])

  function submit() {
    const startValue = startRef.current.value;
    const endValue = endRef.current.value;
    const selectValue = selectRef.current.value;

    if(startValue == ''){
      console.log("none")

      setStartDateYear(false);
      setStartDateMonth(false);
      setStartDateDay(false);
  
      setEndDateYear(false);
      setEndDateMonth(false);
      setEndDateDay(false);

      searchDate()

      return;
    }
    if(endValue == ''){
      console.log("none")

      setStartDateYear(false);
      setStartDateMonth(false);
      setStartDateDay(false);
  
      setEndDateYear(false);
      setEndDateMonth(false);
      setEndDateDay(false);

      searchDate()


      return;
    }
    
    const startArr = Array.from(startValue.split("-"))
    const endArr = Array.from(endValue.split("-"))

    setStartDateYear(startArr[0]);
    setStartDateMonth(startArr[1]);
    setStartDateDay(startArr[2]);

    setEndDateYear(endArr[0]);
    setEndDateMonth(endArr[1]);
    setEndDateDay(endArr[2]);

    setUserEmail(selectValue)

    searchDate()

  }

      return (
        <div className='top'>
          <div className="date">
            {/* dd.mm.yyyy       🗓️ */}
            <input ref={startRef} type={"date"} /> <p>-</p> <input ref={endRef} type={"date"} />
          </div>

          <select 
            ref={selectRef} 
            defaultValue={false} 
            name="emails" 
            style={{width: "150px", height: "50px", border: "none", borderBottom: "1px solid #000", margin: "0 10px"}}
          >
            <option value={false} >Choose E-Mail</option>
            {emailList.map((e, index) => <option value={e} key={e}>{userNameList[index]}</option>)}
          </select>


          <button className='search' onClick={submit} >Search</button>

          <button className='print' onClick={() => window.print()} >Print</button>

        </div>
      )
  }


export default SelectDate;