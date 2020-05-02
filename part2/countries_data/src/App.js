import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')


    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
              console.log(response)
                setCountries(response.data)
          })
      }, [])

    return (
        <div>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
            <Countries countries={countries} filterToUse={newFilter}/>
        </div>
    )
}

export default App