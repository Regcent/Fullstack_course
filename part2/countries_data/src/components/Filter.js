import React from 'react'

const Filter = (props) => {
    const handleFilterChange = (event) => {
        props.setFilteredCountries(props.countries.filter((country) =>
            (country.name.toLowerCase().includes(event.target.value.toLowerCase()))))
    }

    return(
        <div>
            find countries: <input
                onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter