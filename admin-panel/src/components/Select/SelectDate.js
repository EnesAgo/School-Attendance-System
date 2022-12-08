import React from 'react'
import './style.css'

function SelectDate() {
      return (
        <div className='top'>
          <div className="date">
            {/* dd.mm.yyyy       🗓️ */}
            <input type={"date"} /> <p>-</p> <input type={"date"} />
          </div>
          <button className='search'>Search</button>
        </div>
      )
  }


export default SelectDate;