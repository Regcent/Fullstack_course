import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {

    const [weatherData, setWeatherData] = useState({weather_icons:['']})
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
          .then(response => {
                setWeatherData(response.data.current)
          })
      }, [])

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
        <h3>Weather in {country.capital}</h3>
        <div>Temperature: {weatherData.temperature}°C</div>
        <img width="150" src={weatherData.weather_icons[0]} alt="Representation of current weather"/>
        <div>Wind: {weatherData.wind_speed}km/h</div>
    </div>
    )
}

export default Country