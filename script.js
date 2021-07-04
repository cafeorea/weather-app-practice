function updateTime(element) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let mins = date.getMinutes();
  element.innerHTML = `${day}, ${hour}:${mins}`;
}
let timeDate = document.querySelector(".current-time");
updateTime(timeDate);

function updateLocation(event) {
  event.preventDefault();
  let input = document.querySelector(".search-bar");
  let header = document.querySelector("h1");
  let city = input.value;
  header.innerText = city;
  let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateInfo);
  function updateInfo(response) {
    let temp = response.data.main.temp;
    let tempNow = document.querySelector("span.bold-temp");
    tempNow.innerText = temp.toFixed(1);
    let tempFuture = document.querySelectorAll("span.small-temp");
    tempFuture = [...tempFuture];
    for (let temps of tempFuture) {
      temps.innerText = temp.toFixed(1);
    }
  }
}

let newLocation = document.querySelector("form");
newLocation.addEventListener("submit", updateLocation);

function toggle(event) {
  let unit = document.querySelector(".unit-toggle");
  let celFar = document.querySelectorAll("span.cel-far");

  if (unit.innerText === "celsius") {
    unit.innerText = "farenheit";
    let header = document.querySelector("h1");
    let city = header.innerText;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(updateInfo);
    function updateInfo(response) {
      let temp = response.data.main.temp;
      temp = temp.toFixed(1);
      let tempNow = document.querySelector("span.bold-temp");
      tempNow.innerText = temp;
      let tempFuture = document.querySelectorAll("span.small-temp");
      tempFuture = [...tempFuture];
      for (let temps of tempFuture) {
        temps.innerText = temp;
      }
    }
    for (let element in celFar) {
      celFar[element].innerText = "°F";
    }
  } else {
    unit.innerText = "celsius";
    let header = document.querySelector("h1");
    let city = header.innerText;
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(updateInfo);
    function updateInfo(response) {
      let temp = response.data.main.temp;
      let tempNow = document.querySelector("span.bold-temp");
      tempNow.innerText = temp.toFixed(1);
      let tempFuture = document.querySelectorAll("span.small-temp");
      tempFuture = [...tempFuture];
      for (let temps of tempFuture) {
        temps.innerText = temp.toFixed(1);
      }
    }
    for (let element in celFar) {
      celFar[element].innerText = "°C";
    }
  }
}

function showWeather(response) {
  let temp = response.data.main.temp;
  temp = temp.toFixed(1);
  let tempNow = document.querySelector("span.bold-temp");
  tempNow.innerText = temp;
  let tempFuture = document.querySelectorAll("span.small-temp");
  tempFuture = [...tempFuture];
  for (let temps of tempFuture) {
    temps.innerText = temp;
  }
}

function showLocation(response) {
  console.log(response.data.name);
  let location = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = location;
}

function showCurrent(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(`Latitude: ${lat}. Longitude: ${lon}.`);
    let apiKey = "5fac56a1753f48f57cf3600eb2f64df9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showLocation);
  }
}

let toggleSwitch = document.querySelector(".unit-toggle");
toggleSwitch.addEventListener("click", toggle);

let gpsButton = document.querySelector(".location-button");
gpsButton.addEventListener("click", showCurrent);
