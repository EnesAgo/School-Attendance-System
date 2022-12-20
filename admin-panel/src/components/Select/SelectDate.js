import React, { useContext, useRef } from 'react'
import { SearchContext } from '../../context/SearchContext'
import './style.css'

function SelectDate({
      setStartDateYear,
      setStartDateMonth,
      setStartDateDay,
      setEndDateYear,
      setEndDateMonth,
      setEndDateDay
}) {

  const [search, setSearch] = useContext(SearchContext)

  const searchDate = () => {
    setSearch(prev => !prev)
  }

  const startRef = useRef()
  const endRef = useRef()

  function submit() {
    const startValue = startRef.current.value;
    const endValue = endRef.current.value;

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

    searchDate()

  }

      return (
        <div className='top'>
          <div className="date">
            {/* dd.mm.yyyy       🗓️ */}
            <input ref={startRef} type={"date"} /> <p>-</p> <input ref={endRef} type={"date"} />
          </div>
          <button className='search' onClick={submit} >Search</button>

          <button className='print' onClick={() => window.print()} >Print</button>

        </div>
      )
  }


export default SelectDate;