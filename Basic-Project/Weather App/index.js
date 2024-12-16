const apiKEY = "1be485a7ef1c28096ac21df63403672c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search-btn input");
const searchButton = document.querySelector(".search-btn button");
const weatherIconImg = document.querySelector(".Weather-icons");

async function checkWeatherDetails(city) {
  try {
    const response = await fetch(`${apiURL}&q=${city}&appid=${apiKEY}`);

    // Handle HTTP errors
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      throw new Error(`City not found: ${city}`);
    }

    const data = await response.json();

    // Update DOM elements with weather details
    document.querySelector(".city-name").innerHTML = data.name || "N/A";
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity-weather").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML =
      data.wind.speed + " km/h";

    // Weather Conditions
    if (data.weather[0].main === "Clouds") {
      weatherIconImg.src = "./Assets/images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIconImg.src = "./Assets/images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIconImg.src = "./Assets/images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIconImg.src = "./Assets/images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIconImg.src = "./Assets/images/mist.png";
    }

    // Display weather data and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Display fallback UI for errors
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeatherDetails(city);
  } else {
    alert("Please enter a city name!");
  }
});


