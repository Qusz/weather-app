import { UI } from "./ui.js";

export class Utilities {
  currentTime(time, timezone) {
    const date = Date.parse(time);
    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      timeZone: timezone
    }

    const timeNow = new Intl.DateTimeFormat('en-GB', options).format(date);
    return timeNow;
  }

  setSunTime(time) {
    const date = Date.parse(time);
    const options = {
      hour: 'numeric', 
      minute: 'numeric'
    } 
    const sunTime = new Intl.DateTimeFormat('en-GB', options).format(date);
    return sunTime;
  }

  localStorageExists() {
    if (localStorage.getItem('city') === null && localStorage.getItem('country') === null) {
      return false;
    } else {
      return true;
    }
  }

  getSavedLocation() {
    if (localStorage.getItem('city') === null && localStorage.getItem('country') === null) {
      throw Error('No location saved in local storage');
    } else {
      const city = localStorage.getItem('city');
      const country = localStorage.getItem('country');
      return {city, country};
    }
  }

  saveLocation(city, country) {
    const ui = new UI;

    if (city === '' || country === '') {
      ui.showAlert('Input can\'t be empty', 'alert alert-danger text-center', '.modal-body', '.change-location-form');
      return false;
    } else {
      localStorage.setItem('city', city);
      localStorage.setItem('country', country);
      $('#change-location-modal').modal('hide');
      return true;
    }

  }
  
  weatherStatus(code) {
    switch(code) {
      case 0:
        return 'Clear sky';
      case 1:
        return 'Mainly clear';
      case 2:
        return 'Partly cloudy';
      case 3:
        return 'Overcast';
      case 45:
      case 48:
        return 'Fog';
      case 51:
      case 53:
      case 55:
        return 'Drizzle';
      case 61:
      case 63:  
      case 65:
        return 'Rain';
      case 66:
      case 67:
        return 'Freezing rain';
      case 71:
      case 73:
      case 75:
      case 77:
        return 'Snowfall';
      case 80:
      case 81:
      case 82:
        return 'Showers';
      case 85:
      case 86:
        return 'Snow showers';
      default:
        return 'ERROR: Incorrect weather status code'
    }
  }

  windDirection(degree) {
    switch(true) {
      case ((degree >= 0 ) && (degree <= 19)):
        return 'North';
      case ((degree >= 20 ) && (degree <= 39)):
        return 'North / North-East';
      case ((degree >= 40 ) && (degree <= 59)):
        return 'North-East';
      case ((degree >= 60 ) && (degree <= 79)):
        return 'East / North-East';
      case ((degree >= 80 ) && (degree <= 109)):
        return 'East';
      case ((degree >= 110 ) && (degree <= 129)):
        return 'East / South-East';
      case ((degree >= 130 ) && (degree <= 149)):
        return 'South-East';
      case ((degree >= 150 ) && (degree <= 169)):
        return 'South / South-East';
      case ((degree >= 170 ) && (degree <= 199)):
        return 'South';
      case ((degree >= 200 ) && (degree <= 219)):
        return 'South / South-West';
      case ((degree >= 220 ) && (degree <= 239)):
        return 'South-West';
      case ((degree >= 240 ) && (degree <= 259)):
        return 'West / South-West';
      case ((degree >= 260 ) && (degree <= 289)):
        return 'West';
      case ((degree >= 290 ) && (degree <= 309)):
        return 'West / North-West';
      case ((degree >= 310 ) && (degree <= 329)):
        return 'North-West';
      case ((degree >= 330 ) && (degree <= 349)):
        return 'North / North-West';
      case ((degree >= 350 ) && (degree <= 360)):
        return 'North';
      default:
        return 'ERROR: Incorrect wind direction';
    }
  }

  pickIcon(weatherStatus) {
    switch(weatherStatus) {
      case 'Clear sky':
      case 'Mainly clear':
        return '../assets/img/weather_icons/animated/clear-day.svg';
      case 'Partly cloudy':
        return '../assets/img/weather_icons/animated/partly-cloudy-day.svg';
      case 'Overcast':
        return '../assets/img/weather_icons/animated/overcast-day.svg';
      case 'Fog':
        return '../assets/img/weather_icons/animated/fog.svg';
      case 'Drizzle':
        return './img/weather_icons/animated/drizzle.svg';
      case 'Rain':
      case 'Showers':
        return '../assets/img/weather_icons/animated/rain.svg';
      case 'Freezing rain':
        return '../assets/img/weather_icons/animated/sleet.svg';
      case 'Snowfall':
      case 'Snow showers':
        return '../assets/img/weather_icons/animated/snow.svg';
      default:
        return ('ERROR: Can\'t load weather icon');
    }
  }
}