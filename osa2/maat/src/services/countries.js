import axios from 'axios'
const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY
const weatherurl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getAll = () => {
    const request = axios.get(`${baseurl}all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseurl}name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
    const request = axios.get(`${weatherurl}${capital}&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default {getAll, getCountry, getWeather}