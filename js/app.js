import { IPdata, Geocode, Openmeteo, Worldtime } from "./apicalls.js";
import { Utilities } from "./utilities.js";
import { UI } from "./ui.js";

loadEvents();

function loadEvents() {
  const utl = new Utilities,
        ui = new UI;
  ui.chooseCountry();
  document.addEventListener('DOMContentLoaded', loadWeather);
  document.querySelector('.modal-save-button').addEventListener('click', () => {
    const city = document.querySelector('.form-city').value,
          country = document.querySelector('.form-country').value;
    utl.saveLocation(city, country);
    loadWeather();
  })
}

function loadWeather() {
  const ipinfo = new IPdata,
        geocode = new Geocode,
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
        ui.showLocation(data.city, data.country_name);
        worldtime.getTime(data.time_zone.name)
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
          ui.showLocation(data.standard.city, data.standard.countryname);
          weather.getWeather(data.latt, data.longt)
            .then(data => {
              ui.showWeatherNow(data);
              ui.showWeatherToday(data);

              worldtime.getTime(data.timezone)
                .then(data => {
                  ui.showTime(data.datetime, data.timezone);
                })
            })
        })
    }
  } catch(err) {
    console.log(err.message);
  }
}