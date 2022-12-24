import { GeoJS, Nominatim, Openmeteo, WorldTime } from "./apicalls.js";
import { Utilities } from "./utilities.js";
import { UI } from "./ui.js";

export function getWeather() {
  const ipinfo = new GeoJS(),
        geocode = new Nominatim(),
        weather = new Openmeteo(),
        time = new WorldTime(),
        utl = new Utilities(),
        ui = new UI();

  const checkLocalStorage = utl.localStorageExists();
  
  try {
    //* If no data in local storage, get location from IP address. 
    if (checkLocalStorage === false) {
      ipinfo.getIP()
        .then(data => {
          ui.showLocation(data.city, data.country);
          return data;
        })
        .then(data => {
          return weather.getWeather(data.latitude, data.longitude)
        })
        .then(data => {
          weather.handleErrors(data);
          ui.showWeatherNow(data);
          ui.showWeatherToday(data);
          return data;
        })
        .then(data => {
          return time.getTime(data.timezone);
        })
        .then(data => {
          ui.showCurrentTime(data.datetime);
          return data
        })
        .catch((error) => {
          ui.showAlert(error.message);
          console.log(error);

        });

    } else {
      const savedLocation = utl.getSavedLocation();
      
      geocode.geoForward(savedLocation.city, savedLocation.country)
        .then (data => {
          geocode.handleErrors(data);
          ui.showLocation(data[0].address.city, data[0].address.country);
          return weather.getWeather(data[0].lat, data[0].lon);
        })
        .then(data => {
          ui.showWeatherNow(data);
          ui.showWeatherToday(data);
          return time.getTime(data.timezone);
        })
        .then(data => {
          ui.showCurrentTime(data.datetime);
        })
        .catch (error => {
          ui.showAlert(error.message);
          console.log(error);
        });
    }
    
  } catch(error) {
    ui.showAlert(error.message);
  }
}