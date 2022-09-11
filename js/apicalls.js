export class GeoJS {
  async getIP() {
    const request = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const response = await request.json();
    return response;
  }
}

export class Nominatim {
  //* limit=1 is in the query so that there's always only 1 array in the response
  async geoForward(city, country) {
    const request = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1&limit=1`);
    const response = await request.json();
    return response;
  }

  handleErrors(response) {
    switch(true) {
      case (response.length === 0):
        throw new Error("Can't find this location. Please try again.");
      case (!response[0].address.city):
        throw new Error("Please provide a city");
    }
  }

 
}

export class Openmeteo {
  async getWeather(lat, lng) {
    const request = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}1&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,windspeed_10m&daily=weathercode,sunrise,sunset&current_weather=true&timezone=auto`);
    const response = await request.json();
    return response;
  }
}


export class Worldtime {
  async getTime(timezone) {
    const request = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
    const response = await request.json();
    return response;
  }
}