import React from 'react'

const Country = ({country}) => {
    return (
    <div>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div> 
        <h3>Languages</h3>
        <ul>
            {country.languages.map((language) => <li>{language.name}</li>)}
        </ul>
        <img width="300" src={country.flag}/>
    </div>
    )
}

export default Country