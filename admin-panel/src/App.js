import React, { useContext, useEffect, useState } from 'react'
import SelectDate from './components/Select/SelectDate';
import { SearchContext } from './context/SearchContext';
import api from './api/api'

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

  async function SearchData() {
    if(
      !startDateYear || startDateYear == false ||
      !startDateMonth || startDateMonth == false ||
      !startDateDay || startDateDay == false ||
      !endDateYear || endDateYear == false ||
      !endDateMonth || endDateMonth == false ||
      !endDateDay || endDateDay == false
      ){
        alert("date not selected")
        return
      }

      const queryStartDate = `startDateyear=${startDateYear}&startDatemonth=${startDateMonth}&startDateday=${startDateDay}`;
      const queryEndDate = `endDateyear=${endDateYear}&endDatemonth=${endDateMonth}&endDateday=${endDateDay}`;

      const response = await api.get(`/getData?${queryStartDate}&${queryEndDate}`)
      console.log(response)

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
      />
      
    </div>
  );
}

export default App;
