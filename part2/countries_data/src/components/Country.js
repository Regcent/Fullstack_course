import React from 'react'

const Country = ({country}) => {
    return (
    <div>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div> 
        <h3>Languages</h3>
        <ul>
            {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img width="250" src={country.flag} alt={`Flag of $(country.name)`}/>
    </div>
    )
}

export default Country