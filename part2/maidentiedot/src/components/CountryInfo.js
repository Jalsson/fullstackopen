import React, {useState, useEffect} from "react";
import Weather from "./Weather";

const CountryInfo = ({countries, filter}) => {
    const [countryList, setCountryList] = useState([])
    const [capital, setCapital] = useState(null)

    useEffect(() => {
        setCountryList(
            countries.filter((country) =>
                country.name.common.toLowerCase().includes(filter.toLowerCase())
            )
        )
    }, [countries, filter])

    useEffect(() => {
        if (countryList.length === 1) {
            if (countryList[0].capital.length > 0)
                setCapital(countryList[0].capital[0])
        }
    }, [countryList])

    const country = countryList.map((country) => (
        <div key={country.area}>
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {capital}</p>
                <p>Population {country.population}</p>
                <h1>Languages</h1>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => (<li key={key}>{value}</li>))}
                </ul>
                <img style={{width: "20%"}} src={country.flags.svg} alt={country.name.common} />
            </div>
        </div>
    ))

    return (
        <>
            {country}
            {capital ? <Weather city={capital} /> : <p>Loading</p>}
        </>
    )
}

export default CountryInfo