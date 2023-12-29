import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import Forecast from './components/Forecast';
import Search from './components/Search';
import CurrentWeather from './components/current-weather';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (SearchData) => {
    const [lat, lon] = SearchData.value.split(" ");

    const currentWeatherFetch = fetch
      (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch,forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({city:SearchData.label ,...weatherResponse});
      setForecast({city:SearchData.label ,...forecastResponse});
    })
    .catch((err) => console.log(err))
  }
  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      { currentWeather &&  <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data= {forecast} />}
    </div>
  );
}

export default App;
