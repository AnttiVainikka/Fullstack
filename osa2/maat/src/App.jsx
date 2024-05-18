import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FoundCountry = ({country, setCountry}) => {
  countryService
    .getCountry(country)
    .then(countryData => {
      setCountry (
        <div>
          <h1>{countryData.name.common}</h1>
          <p>
            capital {countryData.capital}<br></br>
            area {countryData.area}
          </p>
          <h3>languages:</h3>
          {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
          <br></br>
          <img src={countryData.flags.png} alt={countryData.flags.alt}/>
        </div>
      )
      return
    })
}

const CheckSearch = (props) => {
  props.setSearch(props.changedSearch)
  const setCountry = props.setCountry
  const filtered = props.countries.filter(country => 
    country.common.toLowerCase().includes(props.changedSearch.toLowerCase()))
  if (filtered.length === 1) {
    const country = filtered[0].common
    FoundCountry({country, setCountry})
    return
  }
  if (filtered.length < 11) {
    setCountry(
      <div>
        {filtered.map(country => <p key={country.common}>{country.common}</p>)}
      </div>
    )
    return
  }
  setCountry('Too many matches, specify another filter')
  return
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        {setCountries(initialCountries.map(country => country.name))}
      })
  }, [])

  const handleSearch = (event) => {
    const changedSearch = event.target.value
    CheckSearch({setCountry,countries,changedSearch,setSearch})
  }

  if (countries) {
    return (
      <div>
        <form>
        find countries<input value={search} onChange={handleSearch}/>
        </form>
        {country}
      </div>
    )
  }
  return null
  
}

export default App