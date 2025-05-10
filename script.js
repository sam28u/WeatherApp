document.getElementById("location-form").addEventListener("submit", getWeather);

function getWeather(e) {
  //Write you code logic here

  // Error should be very specific
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.

  e.preventDefault();

  const locationtofind = document.getElementById("location-input").value;

  const weatherDataDiv = document.getElementById("weather-data");
  const errorDiv = document.getElementById("error");

  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationtofind}&key=ae02cce268e5463781c5d7291f8b1e75`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Error: Failed to fetch weather data");
      return response.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0)
        throw new Error("Error: Failed to fetch weather data");

      const lat = data.results[0].geometry.lat;
      const long = data.results[0].geometry.lng;

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=083ecd1226164dc2b514faadaa65d6d0`
      );
    })
    .then((response) => {
      if (!response.ok) throw new Error("Error: Failed to fetch weather data");
      return response.json();
    })
    .then((weatherData) => {
      weatherDataDiv.style.display = "flex";
      errorDiv.style.display = "none";

      document.getElementById("city").innerText = weatherData.name;
      document.getElementById("weather-status").firstElementChild.innerText =
        weatherData.weather[0].main;
      document.getElementById("weather-status").lastElementChild.innerText =
        weatherData.weather[0].description;

      const temp = weatherData.main.temp;
      document.getElementById("temperature").innerText =
        "Temperature " + (temp - 273.0).toFixed(2) + " °C";

      const ftemp = weatherData.main.feels_like;
      document.getElementById("feels-like").innerText =
        "Feels like " + (ftemp - 273.0).toFixed(2) + " °C";
    })
    .catch((error) => {
      weatherDataDiv.style.display = "none";
      errorDiv.style.display = "block";
      errorDiv.innerText = "Error: Failed to fetch weather data";
      console.error("Error:", error.message);
    });
}
