import React, { useContext, useEffect, useState } from 'react'
import SelectDate from './components/Select/SelectDate';
import { SearchContext } from './context/SearchContext';
import api from './api/api'
import Table from './components/table/Table';
import moment from 'moment'
import Noty from 'noty';

function App() {
  const [search, setSearch] = useContext(SearchContext)

  const [head, setHead] = useState()
  const [tableData, setTableData] = useState()

  const [startDateYear, setStartDateYear] = useState(false)
  const [startDateMonth, setStartDateMonth] = useState(false)
  const [startDateDay, setStartDateDay] = useState(false)

  const [endDateYear, setEndDateYear] = useState(false)
  const [endDateMonth, setEndDateMonth] = useState(false)
  const [endDateDay, setEndDateDay] = useState(false)

  const [userEmail, setUserEmail] = useState(false)

  async function SearchData() {

    console.log(userEmail)

    if(
      !startDateYear || startDateYear == false ||
      !startDateMonth || startDateMonth == false ||
      !startDateDay || startDateDay == false ||
      !endDateYear || endDateYear == false ||
      !endDateMonth || endDateMonth == false ||
      !endDateDay || endDateDay == false
      ){
        console.log("date not selected")

        new Noty({
          text: "Please fill the dates",
          layout: 'topRight',
          type: 'error',
          theme: 'bootstrap-v4',
          timeout: 5000
        }).show();

        return
      }

      if(!userEmail || userEmail=="false"){

        console.log(`userEmail==false
        ${userEmail}`)

        const queryStartDate = `startDateyear=${startDateYear}&startDatemonth=${startDateMonth}&startDateday=${startDateDay}`;
        const queryEndDate = `endDateyear=${endDateYear}&endDatemonth=${endDateMonth}&endDateday=${endDateDay}`;
  
        const response = await api.get(`/getData?${queryStartDate}&${queryEndDate}`)
        console.log(response)
  
  
        const validData = response.map(element => {
          return {
            username: element.username,
            email: element.email,
            date: moment(element.date).format('YYYY, MMMM DD'),
            hour: moment(element.date).format('HH:mm:ss'),
            "enter/leave": element.enterLeaveSchool,
  
            // uuID: element.uuID
          }
        })
  
        setHead(Object.keys(validData[0]))
        setTableData(validData)

        return
      }

      else{


      const queryStartDate = `startDateyear=${startDateYear}&startDatemonth=${startDateMonth}&startDateday=${startDateDay}`;
      const queryEndDate = `endDateyear=${endDateYear}&endDatemonth=${endDateMonth}&endDateday=${endDateDay}`;
      const emailQuery = `email=${userEmail}`

      console.log(`userEmail==true
      ${userEmail}`)

      const response = await api.get(`/getUserData?${queryStartDate}&${queryEndDate}&${emailQuery}`)
      console.log(response)


      const validData = response.map(element => {
        return {
          username: element.username,
          email: element.email,
          date: moment(element.date).format('YYYY, MMMM DD'),
          hour: moment(element.date).format('HH:mm:ss'),
          "enter/leave": element.enterLeaveSchool,

          // uuID: element.uuID
        }
      })

      setHead(Object.keys(validData[0]))
      setTableData(validData)

      return

      }




  }

  useEffect(() => {
    SearchData()
  }, [search])

  return (
    <div className="App">
      <SelectDate 
        setStartDateYear={setStartDateYear} 
        setStartDateMonth={setStartDateMonth} 
        setStartDateDay={setStartDateDay}
        setEndDateYear={setEndDateYear}
        setEndDateMonth={setEndDateMonth}
        setEndDateDay={setEndDateDay}
        setUserEmail={setUserEmail}
      />
      
      {
        tableData && <Table headerData={head} mainData={tableData} />
      }

    </div>
  );
}

export default App;
