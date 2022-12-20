import React from 'react'
import './style.css'

function Table({headerData, mainData}) {

      return (
        <table>
            <thead>
                <tr className='tableHeader'>

                    {
                        headerData.map((element, index) => {
                            return <td key={index} className='tableHeader'>{element}</td>
                        })
                    }
                </tr>
            </thead>
            <tbody>
            {
                mainData.map((value, index) => {
                    
                return (
                    <tr key={index}>

                        {
                            // headerData.map((keyElement, i) => {
                            //     <td key={i}>{value.keyElement}</td>
                            // })

                            headerData.map((elem, i) => <td key={`${i}-${value[elem]}`} className={`${value[elem] == 'enter' ? 'green bold' : (value[elem] == 'leave' && 'red bold')}`} >{value[elem]}</td>)

                        }
                    </tr>
                  )
                })
            }

            </tbody>
        </table>
      )
  }


export default Table;