import React, {useState, useEffect} from "react";
import axios from "axios";
import MoreButton from "./components/MoreButton";
import List from "./components/List";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrieToShow, setCountriesToShow] = useState([])
  const [filter, setFilter] = useState("")
  const [toShow, setToShow] = useState("")
  const [click, setClick] = useState(false)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    const handleClick = (country) => {
      setCountriesToShow(
        [country]
      )
      setClick(true)
    }

    filter
      ? setToShow(
        countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          .map((country) => (
            <div key={country.area}>
              {country.name.common}
              <MoreButton handleClick={() => {handleClick(country)}} value={country.name.common} />
            </div>
          ))
      )
      : setToShow(<p></p>)
  }, [countries, filter])

  const handleChange = (e) => {
    setFilter(e.target.value)
    setClick(false)
  }

  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        {click || toShow.length === 1 ? (
          <CountryInfo
            countries={toShow.length > 1 ? countrieToShow : countries}
            filter={filter}
          />
        ) : (
          <List toShow={toShow} filter={filter} />
        )}
      </div>
    </div>
  )
}

export default App