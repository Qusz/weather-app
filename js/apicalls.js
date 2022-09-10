import { API_KEYS } from "./api_keys.js";

//* ipdata API
export class IPdata {
  constructor() {
    this.APIkey = API_KEYS.ipdata;
  }

  async getIP() {
    const ipResponse = await fetch(`https://api.ipdata.co?api-key=${this.APIkey}`);
    const ipData = await ipResponse.json();
    return ipData;
  }
}

//* Geocode
export class Geocode {
  constructor() {
    this.APIkey = API_KEYS.geocode;
  }

  async geoForward(city, countryCode) {
    const request = await fetch(`https://geocode.xyz/?locate=${city}&region=${countryCode}&json=1&auth=${this.APIkey}`);
    const response = await request.json();
    return response;
  }
}

//* Openmeteo API
export class Openmeteo {
  async getWeather(lat, lng) {
    const request = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}1&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,windspeed_10m&daily=weathercode,sunrise,sunset&current_weather=true&timezone=auto`);
    const response = await request.json();
    return response;
  }
}

//* WorldTime API
export class Worldtime {
  async getTime(timezone) {
    const request = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
    const response = await request.json();
    return response;
  }
}