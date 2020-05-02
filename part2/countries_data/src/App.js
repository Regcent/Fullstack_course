import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
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
            <Filter countries={countries} setFilteredCountries={setFilteredCountries}/>
            <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
        </div>
    )
}

export default App