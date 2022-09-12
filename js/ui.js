import { Utilities } from "./utilities.js";
import { countryList } from "./country_list.js";

export class UI {
  constructor() {
    this.utl = new Utilities;

    this.currentTime = document.querySelector('.current-time');
    this.currentLocation = document.querySelector('.current-location');

    this.weatherStatus = document.querySelector('.weather-now__status');
    this.temperature = document.querySelector('.weather-now__temperature');
    this.iconNow = document.querySelector('.weather-icon--now');
    this.feelslike = document.querySelector('.feelslike');
    this.wind = document.querySelector('.wind');
    this.pressure = document.querySelector('.pressure');
    this.humidity = document.querySelector('.humidity');
    this.sunrise = document.querySelector('.sunrise');
    this.sunset = document.querySelector('.sunset');
    
    this.six = document.querySelector('.today_temp__600');
    this.twelve = document.querySelector('.today_temp__1200');
    this.eighteen = document.querySelector('.today_temp__1800');
    this.twentytwo = document.querySelector('.today_temp__2200');
    this.icon600 = document.querySelector('.weather-icon--600');
    this.icon1200 = document.querySelector('.weather-icon--1200');
    this.icon1800 = document.querySelector('.weather-icon--1800');
    this.icon2200 = document.querySelector('.weather-icon--2200');

    this.country = document.querySelector('.form-country');
  }

  showTime(time, timezone) {
    this.currentTime.textContent = this.utl.currentTime(time, timezone);
  }

  showLocation(city, country) {
    this.currentLocation.textContent = `${city}, ${country}`;
  }

  showWeatherNow(response) {

    //* There is not enough data in 'the currect_weather' object
    //* Have to access data from 'hourly' using the current_weather timestamp as index
    //* Sunrise & Sunset are taken from the 'daily' object 
    
    const currentTimeStamp = response.current_weather.time,
          currentTimeIndex = response.hourly.time.indexOf(currentTimeStamp);
    
    const currentWeatherStatus = this.utl.weatherStatus(response.current_weather.weathercode),
          currentWindDirection = this.utl.windDirection(response.current_weather.winddirection),
          currentTemp = response.hourly.temperature_2m[currentTimeIndex],
          currentFeels = response.hourly.apparent_temperature[currentTimeIndex],
          currentWindSpeed = response.hourly.windspeed_10m[currentTimeIndex],
          currentPressure = response.hourly.pressure_msl[currentTimeIndex],
          currentHumidity = response.hourly.relativehumidity_2m[currentTimeIndex],
          currentSunrise = this.utl.setSunTime(response.daily.sunrise[0]),
          currentSunset = this.utl.setSunTime(response.daily.sunset[0]);

    //* Show weather 
    this.weatherStatus.textContent = `${currentWeatherStatus}`;
    this.temperature.textContent = `${currentTemp} °C`;
    this.feelslike.textContent = `${currentFeels} °C`;
    this.wind.textContent = `${currentWindDirection}, ${currentWindSpeed} km/h`;
    this.pressure.textContent = `${currentPressure} hPa`;
    this.humidity.textContent = `${currentHumidity}%`;
    this.sunrise.textContent = `${currentSunrise}`; 
    this.sunset.textContent = `${currentSunset}`;

    //* Show icon
    this.iconNow.data =`${this.utl.pickIcon(currentWeatherStatus)}`;
  }

  showWeatherToday(response) {
    //* Index is hard-coded to match the displayed static timestamps (600, 1200, 1800, 2200)
    const weatherStatus600 = this.utl.weatherStatus(response.hourly.weathercode[6]),
          weatherStatus1200 = this.utl.weatherStatus(response.hourly.weathercode[12]),
          weatherStatus1800 = this.utl.weatherStatus(response.hourly.weathercode[18]),
          weatherStatus2200 = this.utl.weatherStatus(response.hourly.weathercode[22]);

    this.six.textContent = `${response.hourly.temperature_2m[6]} °C`;
    this.twelve.textContent = `${response.hourly.temperature_2m[12]} °C`;
    this.eighteen.textContent = `${response.hourly.temperature_2m[18]} °C`;
    this.twentytwo.textContent = `${response.hourly.temperature_2m[22]} °C`;

    //* Show icons
    this.icon600.data = `${this.utl.pickIcon(weatherStatus600)}`;
    this.icon1200.data = `${this.utl.pickIcon(weatherStatus1200)}`;
    this.icon1800.data = `${this.utl.pickIcon(weatherStatus1800)}`;
    this.icon2200.data = `${this.utl.pickIcon(weatherStatus2200)}`;
  }

  chooseCountry() {
    for (const property in countryList) {
      const option = document.createElement('option');
      option.className = 'option-country';
      option.value = `${countryList[property]}`;
      option.textContent = `${countryList[property]}`;
      this.country.appendChild(option);
    }
  }
  
  showAlert(message, className, parentElementClass, nextElementClass) {
    //* First clear previous alert if there's one
    this.clearAlert();
    const alert  = document.createElement('div'),
          parent = document.querySelector(parentElementClass),
          nextElement = document.querySelector(nextElementClass);

    alert.className = className;
    alert.appendChild(document.createTextNode(message));
    parent.insertBefore(alert, nextElement);    
  }

  clearAlert() {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }
}
