import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  // const [hasError, setHasError] = useState(false)
  // const [showMessage, setShoewMessage] = useState(false)
  

  useEffect(() => {

  const success = pos => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }

  navigator.geolocation.getCurrentPosition(success)
}, [])

  useEffect(() => {
    if(coords){
      const API_KEY = '88150fc1ec273352588d3997f7776edb'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    
      axios.get(url)
        .then(res => {
        setWeather(res.data)
        // .catch(err => console.log(err))
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 1.8 + 32).toFixed(1)
        setTemp({celsius, fahrenheit})
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }
  }, [coords])


  console.log(weather)
  return (
    <div className='app'>
      {
        isLoading
        ?<h1 style={{color: 'white'}}>loading ... </h1>
        : (
      
      <WeatherCard
         weather ={weather}
        temp={temp}
        />
       )
    } 
    </div>
  )
}

export default App