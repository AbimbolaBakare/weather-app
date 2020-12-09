import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Weather from "./components/Weather";
import NavBar from "./components/Navbar";
import Chart from "./Chart";

export default function WeatherFetch() {
  const [city, setCity] = useState("Lagos");
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  const handleCityChange = city => {
    setCity(city);
  };

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <div >
        {/* <CssBaseline /> */}
        <NavBar />
        {!showChart && <div >
         
          <Weather
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
            error={error}
            click={() => setShowChart(true)}
          />
        </div>
        }

        {showChart && <div className='bar'>
          <button className='back-button' onClick={() => setShowChart(false)}>BACK</button>
          <Chart forecast={forecast} />
        </div>}


      </div>
    );
  } else {
    return (
      <div>
        <CircularProgress color={error ? "secondary" : "primary"} />
        {error ? <p>{error}</p> : ""}
      </div>
    );
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + (response.statusText).toLowerCase());
  }
}

function getWeather(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather/?q=${city}&units=metric&APPID=2d2d1caba6093e694d84a1e3aa03c218`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

function getForecast(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=2d2d1caba6093e694d84a1e3aa03c218`
  )
    .then(res => handleResponse(res))
    .then(result => {
      if (Object.entries(result).length) {
        const forecast = [];
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]));
        }
        return forecast;
      }
    });
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6),
    speed: data.wind.speed,
    condition: data.cod
  };

  if (data.dt_txt) {
    mapped.dt_txt = new Date(data.dt_txt).toDateString();
  }

  if (data.weather[0].icon) {
    mapped.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }

  // remove undefined fields
  Object.keys(mapped).forEach(
    key => mapped[key] === undefined && delete data[key]
  );

  return mapped;
}
