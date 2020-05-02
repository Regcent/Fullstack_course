import React from 'react'
import Country from './Country'

const Countries = ({countries, setFilteredCountries}) => {  
    if (countries.length > 10) {
        return <>Too many matches, specify another filter</>
    }
    else if (countries.length > 1) {
        return countries.map((country) => <CountryShort key={country.alpha3Code} country={country} setFilteredCountries={setFilteredCountries}/>)
    }
    else if (countries.length === 1) {
        return <Country country={countries[0]}/>
    }
    else {
        return <>No match</>
    }
}

const CountryShort = ({country, setFilteredCountries}) => {

    const handleShowClick = (country) => {
        return (event) => {
            setFilteredCountries([country])
        }
    }
    return (
        <>
            <div>{country.name}</div>
            <button onClick={handleShowClick(country)}>show</button>
        </>
    )
} 
export default Countries