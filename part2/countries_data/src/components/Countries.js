import React from 'react'
import Country from './Country'

const Countries = ({countries, filterToUse}) => {
    const filteredCountries = countries.filter((country) => (country.name.toLowerCase().includes(filterToUse.toLowerCase())))
    
    if (filteredCountries.length > 10) {
        return <>Too many matches, specify another filter</>
    }
    else if (filteredCountries.length > 1) {
        return  <>{filteredCountries.map((country) => <div key={country.alpha3Code}>{country.name}</div>)}</>
    }
    else if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]}/>
    }
    else {
        return <>No match</>
    }
}

export default Countries