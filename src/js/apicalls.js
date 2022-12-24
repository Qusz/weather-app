export class GeoJS {
  async getIP() { 
    try {
      const request = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
      const response = await request.json();
      return response;
    } catch {
      throw new Error("Can't detect your location. Please choose the desired location manually.");
    }
  }
}

export class Nominatim {
  async geoForward(city, country) {
    try {
      //* limit=1 is in the query so that there's always only 1 array in the response
      const request = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1&limit=1&accept-language=en-US`);
      
      const response = await request.json();
      return response;
    } catch {
      throw new Error("Something went wrong... Please try again later.")
    }
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
    try {
      const request = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}1&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,windspeed_10m&daily=weathercode,sunrise,sunset&current_weather=true&timezone=auto`);

      const response = await request.json();
      return response;
    } catch {
      throw new Error("Something went wrong... Please try again later.");
    }
  }

  handleErrors(response) {
    switch(true) {
      case (response.error):
        throw new Error('Can\t load the weather at the moment. Try again later');
    }
  }
}

export class WorldTime {
  async getTime(timezone) {
    try {
      const request = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
      const response = await request.json();
      return response;
    } catch {
      throw new Error("Can't get the current time... Please try again later.");
    }
  }
}