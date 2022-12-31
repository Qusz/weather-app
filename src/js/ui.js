import { Utilities } from "./utilities.js";
import { countryList } from "./country-list.js";

export class UI {
  constructor() {
    this.utl = new Utilities();
    this.refs = {
      currentTime: this.selector('.current-weather__time'),
      currentLocation: this.selector('.current-weather__location'),
      currentWeatherStatus: this.selector('.current-weather__overview-sky'),
      currentTemperature: this.selector('.current-weather__overview-temp'),
      currentWeatherIcon: this.selector('.current-weather__overview-icon'),
      currentFeelsLike: this.selector('.feels-like-data'),
      currentWind: this.selector('.wind-data'),
      currentPressure: this.selector('.pressure-data'),
      currentHumidity: this.selector('.humidity-data'),
      currentSunrise: this.selector('.sunrise-data'),
      currentSunset: this.selector('.sunset-data'),

      forecastTableBody: this.selector('.forecast__table-body'),
      selectCountry: this.selector('.navbar__location-change-country-input')
    }
  }

  selector(target) {
    return document.querySelector(target);
  }

  showCurrentTime(time, timezone) {
    this.refs.currentTime.textContent = this.utl.longTime(time, timezone);
  }

  showLocation(city, country) {
    this.refs.currentLocation.textContent = `${city}, ${country}`;
  }

  showWeatherNow(response) {
    /*
    * There is not enough data in 'the currect_weather' object
    * Have to access data from 'hourly' using the current_weather timestamp as index
    * Sunrise & Sunset are taken from the 'daily' object 
    */
    
    const currentTimeStamp = response.current_weather.time,
          currentTimeIndex = response.hourly.time.indexOf(currentTimeStamp);
    
    const currentWeather = {
      weatherStatus: this.utl.weatherStatus(response.current_weather.weathercode),
      windDirection: this.utl.windDirection(response.current_weather.winddirection),
      temperature: response.hourly.temperature_2m[currentTimeIndex],
      feels: response.hourly.apparent_temperature[currentTimeIndex],
      windSpeed: response.hourly.windspeed_10m[currentTimeIndex],
      pressure: response.hourly.pressure_msl[currentTimeIndex],
      humidity: response.hourly.relativehumidity_2m[currentTimeIndex],
      sunrise: this.utl.shortTime(response.daily.sunrise[0]),
      sunset: this.utl.shortTime(response.daily.sunset[0])
    }

    this.refs.currentWeatherStatus.textContent = `${currentWeather.weatherStatus}`;
    this.refs.currentTemperature.textContent = `${currentWeather.temperature}°C`;
    this.refs.currentFeelsLike.textContent = `${currentWeather.feels}°C`;
    this.refs.currentWind.textContent = `${currentWeather.windDirection}, ${currentWeather.windSpeed} km/h`
    this.refs.currentPressure.textContent = `${currentWeather.pressure} hPa`;
    this.refs.currentHumidity.textContent = `${currentWeather.humidity}%`;
    this.refs.currentSunrise.textContent = `${currentWeather.sunrise}`;
    this.refs.currentSunset.textContent = `${currentWeather.sunset}`;
    this.refs.currentWeatherIcon.src = `${this.utl.pickIcon(currentWeather.weatherStatus)}`;

  }

  showWeatherToday(response) {
    let pointStep = 0;
    let currentIndex = null;
    const forecastPoints = 8;

    const currentHour = response.current_weather.time;

    // Clear table body first so that data doesn't stack up on location change
    this.refs.forecastTableBody.innerHTML = '';

    response.hourly.time.forEach((point, index) => {
      if (point === currentHour) {
        currentIndex = index;
      } 
    });

    for (let i = 0; i < forecastPoints; i++) {
      pointStep += 2;

      const newRow = document.createElement('tr');
      newRow.className = 'forecast__table-row';
      newRow.innerHTML = `
        <td>
          ${this.utl.shortTime(response.hourly.time[currentIndex + pointStep])}
        </td>
        <td>
          ${response.hourly.temperature_2m[currentIndex + pointStep]}°C
        </td>
        <td>
          ${this.utl.weatherStatus(response.hourly.weathercode[currentIndex + pointStep])}
        </td>
        <td>
          ${response.hourly.pressure_msl[currentIndex + pointStep]} hPa
        </td>
        <td>
          ${response.hourly.windspeed_10m[currentIndex + pointStep]} km/h
        </td>
      `;

      this.refs.forecastTableBody.appendChild(newRow);
    }
  }

  chooseCountry() {
    for (const property in countryList) {
      const option = document.createElement('option');
      option.className = 'option-country';
      option.value = `${countryList[property]}`;
      option.textContent = `${countryList[property]}`;
      this.refs.selectCountry.appendChild(option);
    }
  }
  
  showAlert(message) {
    // First clear previous alert if there's one
    this.clearAlert();

    const alert  = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(this.clearAlert, 4000);
  }

  clearAlert() {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }
}
