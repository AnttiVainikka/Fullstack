import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FoundCountry = ({country2, setCountry, setWeather}) => {
  countryService
    .getCountry(country2)
    .then(countryData => {
      const capital = countryData.capital
      setCountry (
        <div>
          <h1>{countryData.name.common}</h1>
          <p>
            capital {capital}<br></br>
            area {countryData.area}
          </p>
          <h3>languages:</h3>
          {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
          <br></br>
          <img src={countryData.flags.png} alt={countryData.flags.alt}/>
        </div>
      )
      FoundWeather({capital, setWeather})
      return
    })
}

const FoundWeather = ({capital, setWeather}) => {
  countryService
    .getWeather(capital)
    .then(weatherData => {
      setWeather (
        <div>
          <h2>Weather in {capital}</h2>
          <p>
            temperature {Math.round(((weatherData.main.temp-273) * 100) / 100)} Celcius<br></br>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/><br></br>
            wind {weatherData.wind.speed} ms/s
          </p>
        </div>
      )
      return
    })
}

const CheckSearch = (props) => {
  props.setSearch(props.changedSearch)
  const handleClick = props.handleClick
  const setCountry = props.setCountry
  const setWeather = props.setWeather
  const filtered = props.countries.filter(country => 
    country.common.toLowerCase().includes(props.changedSearch.toLowerCase()))
  if (filtered.length === 1) {
    const country2 = filtered[0].common.toLowerCase()
    FoundCountry({country2, setCountry, setWeather})
    return
  }
  if (filtered.length < 11) {
    setCountry(
      <div>
        {filtered.map(country => 
          <p key={country.common}>
            {country.common}<button onClick={handleClick(country.common)}>show</button>
          </p>
        )}
      </div>
    )
    setWeather(null)
    return
  }
  setCountry('Too many matches, specify another filter')
  setWeather(null)
  return
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        {setCountries(initialCountries.map(country => country.name))}
      })
  }, [])

  const handleSearch = (event) => {
    const changedSearch = event.target.value
    CheckSearch({setCountry,setWeather,countries,changedSearch,setSearch,handleClick})
  }

  const handleClick = (countryName) => {
    const executeHandling = () => {
      const country2 = countryName.toLowerCase()
      FoundCountry({country2, setCountry, setWeather})
      setSearch(country2)
    }
    return executeHandling
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  if (countries) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
        find countries<input value={search} onChange={handleSearch}/>
        </form>
        {country}{weather}
      </div>
    )
  }
  return null
  
}

export default App