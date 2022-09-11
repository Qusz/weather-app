//* GeoJS
export class GeoJS {
  async getIP() {
    const request = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const response = await request.json();
    return response;
  }
}

//* Nominatim
export class Nominatim {
  async geoForward(city, country) {
    const request = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1&limit=1`);
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