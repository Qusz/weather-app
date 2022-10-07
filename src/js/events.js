import { Nominatim } from "./apicalls.js";
import { Utilities } from "./utilities.js";
import { UI } from "./ui.js";
import { getWeather } from "./get_weather.js";

export function loadEvents() {
  const utl = new Utilities,
        ui = new UI,
        geocode = new Nominatim;

  //* Load countries into Change City dropdown
  ui.chooseCountry();

  document.addEventListener('DOMContentLoaded', getWeather);

  document.querySelector('.modal-save-button').addEventListener('click', (e) => {
    const city = document.querySelector('.form-city').value,
          country = document.querySelector('.form-country').value;

    geocode.geoForward(city, country)
      .then (data => {
        geocode.handleErrors(data);
        utl.saveLocation(city, country);
        ui.clearAlert();
        getWeather();
      })
      .catch (error => {
        ui.showAlert(error.message, 'alert alert-danger text-center', '.modal-body', '.change-location-form');
      });

      e.preventDefault();
  });
  
  //* Prevent Enter from submitting location change
  document.querySelector('.change-location-form').onkeypress = e => {
    const key = e.charCode || e.keyCode || 0;
    if (key !== 13) {return};
    e.preventDefault();
  }
}
