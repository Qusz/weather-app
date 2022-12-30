export class Utilities {
  longTime(time) {
    const date = Date.parse(time);
    const options = {
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
    }

    const timeNow = new Intl.DateTimeFormat('en-GB', options).format(date);
    return timeNow;
  }

  shortTime(time) {
    const date = Date.parse(time);
    const options = {
      hour: 'numeric', 
      minute: 'numeric'
    } 
    const sunTime = new Intl.DateTimeFormat('en-GB', options).format(date);
    return sunTime;
  }

  localStorageExists() {
    if (
      localStorage.getItem('city') === null && 
      localStorage.getItem('country') === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  getSavedLocation() {
    if (localStorage.getItem('city') === null && localStorage.getItem('country') === null) {
      throw new Error('No location saved in local storage');
    } else {
      const city = localStorage.getItem('city');
      const country = localStorage.getItem('country');
      return { city, country };
    }
  }

  saveLocation(city, country) {
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
  }

  toggleClass(target, className) {
    target.classList.toggle(className);
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
      case 95:
      case 96:
      case 99:
        return 'Thunderstorm'
      default:
        return 'ERROR: Incorrect weather status code'
    }
  }

  windDirection(degree) {
    switch(true) {
      case ((degree >= 0 ) && (degree <= 19)):
        return 'N';
      case ((degree >= 20 ) && (degree <= 39)):
        return 'N/NE';
      case ((degree >= 40 ) && (degree <= 59)):
        return 'NE';
      case ((degree >= 60 ) && (degree <= 79)):
        return 'E/NE';
      case ((degree >= 80 ) && (degree <= 109)):
        return 'E';
      case ((degree >= 110 ) && (degree <= 129)):
        return 'E/SE';
      case ((degree >= 130 ) && (degree <= 149)):
        return 'SE';
      case ((degree >= 150 ) && (degree <= 169)):
        return 'S/SE';
      case ((degree >= 170 ) && (degree <= 199)):
        return 'S';
      case ((degree >= 200 ) && (degree <= 219)):
        return 'S/SW';
      case ((degree >= 220 ) && (degree <= 239)):
        return 'SW';
      case ((degree >= 240 ) && (degree <= 259)):
        return 'W/SW';
      case ((degree >= 260 ) && (degree <= 289)):
        return 'W';
      case ((degree >= 290 ) && (degree <= 309)):
        return 'W/NW';
      case ((degree >= 310 ) && (degree <= 329)):
        return 'NW';
      case ((degree >= 330 ) && (degree <= 349)):
        return 'N/NW';
      case ((degree >= 350 ) && (degree <= 360)):
        return 'N';
      default:
        return 'ERROR: Incorrect wind direction';
    }
  }

  pickIcon(weatherStatus) {
    switch(weatherStatus) {
      case 'Clear sky':
      case 'Mainly clear':
        return '/clear-sky.png';
      case 'Partly cloudy':
        return '/partly-cloudy.png';
      case 'Overcast':
        return '/overcast.png';
      case 'Fog':
        return '/fog.png';
      case 'Drizzle':
        return '/drizzle.png';
      case 'Rain':
        return '/rain.png';
      case 'Showers':
      case 'Thunderstorm':
        return '/showers.png';
      case 'Freezing rain':
        return '/freezing-rain.png';
      case 'Snowfall':
      case 'Snow showers':
        return '/showfall.png';
      default:
        return ('ERROR: Can\'t load weather icon');
    }
  }
}