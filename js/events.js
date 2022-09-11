import { GeoJS, Nominatim, Openmeteo, Worldtime } from "./apicalls.js";
import { Utilities } from "./utilities.js";
import { UI } from "./ui.js";

export function loadEvents() {
  const utl = new Utilities,
        ui = new UI,
        geocode = new Nominatim;

  ui.chooseCountry();

  document.addEventListener('DOMContentLoaded', loadWeather);
  document.querySelector('.modal-save-button').addEventListener('click', () => {
    const city = document.querySelector('.form-city').value,
          country = document.querySelector('.form-country').value;

    geocode.geoForward(city, country)
      .then (data => {
        geocode.handleErrors(data);
        utl.saveLocation(city, country);
        loadWeather();
      })
      .catch (error => {
        ui.showAlert(error.message, 'alert alert-danger text-center', '.modal-body', '.change-location-form');
      })
  })
}

export function loadWeather() {
  const ipinfo = new GeoJS,
        geocode = new Nominatim,
        weather = new Openmeteo,
        utl = new Utilities,
        ui = new UI,
        worldtime = new Worldtime;


  //* If no data in local storage, get location from IP address. Otherwise get data from local storage
  const checkLocalStorage = utl.localStorageExists();
  

  try {
    if (checkLocalStorage === false) {
      ipinfo.getIP()
      .then(data => {
        ui.showLocation(data.city, data.country);
        worldtime.getTime(data.timezone)
          .then(data => {
            ui.showTime(data.datetime, data.timezone);
          })
   
        weather.getWeather(data.latitude, data.longitude)
          .then(data => {
            ui.showWeatherNow(data);
            ui.showWeatherToday(data);
          })
      });

    } else {
      const savedLocation = utl.getSavedLocation();

      geocode.geoForward(savedLocation.city, savedLocation.country)
        .then (data => {
          geocode.handleErrors(data);
          ui.showLocation(data[0].address.city, data[0].address.country);
          weather.getWeather(data[0].lat, data[0].lon)
            .then(data => {
              ui.showWeatherNow(data);
              ui.showWeatherToday(data);

              worldtime.getTime(data.timezone)
                .then(data => {
                  ui.showTime(data.datetime, data.timezone);
                })
            })
        })
        .catch (error => {
          ui.showAlert(error.message, 'alert alert-danger text-center', '.card-body', '.current-location');
        })
    }
  } catch(error) {
    ui.showAlert(error.message, 'alert alert-danger text-center', '.card-body', '.current-location');
  }
}