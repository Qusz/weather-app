import { Nominatim } from "./apicalls.js";
import { Utilities } from "./utilities.js";
import { UI } from "./ui.js";
import { getWeather } from "./get-weather.js";

export function loadEvents() {
  const utl = new Utilities(),
        ui = new UI(),
        geocode = new Nominatim();

  const selectLocationButton = document.querySelector('.navbar__location-button');
  const locationChangeForm = document.querySelector('.navbar__location-change');
  const locationSubmitButton = document.querySelector('.location-submit-button');
  const locationCancelButton = document.querySelector('.location-cancel-button');

  // Load countries into Change City dropdown
  ui.chooseCountry();

  document.addEventListener('DOMContentLoaded', getWeather);

  selectLocationButton.addEventListener('click', () => {
    utl.toggleClass(locationChangeForm, 'is-active');
  });

  locationSubmitButton.addEventListener('click', (e) => {
    const city = document.querySelector('.navbar__location-change-city-input').value;

    const country = document.querySelector('.navbar__location-change-country-input').value;

    geocode.geoForward(city, country)
      .then (data => {
        geocode.handleErrors(data);
        utl.saveLocation(city, country);
        getWeather();
      })
      .catch (error => {
        ui.showAlert(error.message);
      });

    utl.toggleClass(locationChangeForm, 'is-active');
    e.preventDefault();
  });

  locationCancelButton.addEventListener('click', () => {
    utl.toggleClass(locationChangeForm, 'is-active');
  });

  // Close location menu on click outside of it
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && 
        locationChangeForm.classList.contains('is-active')
    ) { 
      utl.toggleClass(locationChangeForm, 'is-active');
    }
  });
  
  // Prevent Enter from submitting location change
  locationChangeForm.onkeypress = e => {
    const key = e.charCode || e.keyCode || 0;
    if (key !== 13) {return};
    e.preventDefault();
  }
}