function initPage() {
const cityElement = document.getElementById('enterCity');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearHistory');
const city_name = document.getElementById('city-name');
const currentPic = document.getElementById('current-pic');
const currentTemp = document.getElementById('temperature');
const currentHumidity = document.getElementById('humidity');
const currentWind = document.getElementById('wind-speed');
const history = document.getElementById('history');
const fiveDay = document.getElementById('fiveday-header');
const weatherToday = document.getElementById('todays-weather');
let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

// Assigning a unique API to a variable
const apiKey = "1dc621126262037aadf0ef0fd44245df";


function getWeather(cityName){
    // Execute current weather to get request from open weather api
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(queryURL)
        .then(function (response) {
            weatherToday.classList.remove('d-none');

            // Parse response to display current weather
            const currentDate = new Date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            city_name.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPic.setAttribute("alt", response.data.weather[0].description);
            currentTemp.innerHTML = "Temperature: " + kelv2fer(response.data.main.temp) + " &#176F";
            currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            // Get 5 day forecast for this city
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
            axios.get(forecastQueryURL)
                .then(function (response) {
                    fiveDay.classList.remove("d-none");

                    // Parse response to display forecast for next 5 days
                    const forecastEls = document.querySelectorAll(".forecast");
                    for (let i = 0; i < forecastEls.length; i++) {
                        forecastEls[i].innerHTML = "";
                        const forecastIndex = i * 8 + 4;
                        const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        const forecastDay = forecastDate.getDate();
                        const forecastMonth = forecastDate.getMonth() + 1;
                        const forecastYear = forecastDate.getFullYear();
                        const forecastDateElement = document.createElement("p");
                        forecastDateElement.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateElement.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastEls[i].append(forecastDateElement);

                        // Icon for current weather
                        const forecastWeatherElement = document.createElement("img");
                        forecastWeatherElement.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherElement.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                        forecastEls[i].append(forecastWeatherElement);
                        const forecastTempElement = document.createElement("p");
                        forecastTempElement.innerHTML = "Temp: " + kelv2fer(response.data.list[forecastIndex].main.temp) + " &#176F";
                        forecastEls[i].append(forecastTempElement);
                        const forecastHumidityElement = document.createElement("p");
                        forecastHumidityElement.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                        forecastEls[i].append(forecastHumidityElement);
                    }
                });
        });
}

   // Get history from local storage if any
searchButton.addEventListener('click', function(){
    const searchTerm = cityElement.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('search', JSON.stringify(searchHistory));
    renderSearchHistory();
});

  // Clear History button
clearButton.addEventListener('click', function(){
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
});

 //convert kevlin unit to fahrenheit unit
function kelv2fer(k){
    return Math.floor((k - 273.15) * 1.8 + 32);
}

// Get history from local storage if any
function renderSearchHistory(){
    history.innerHTML = "";
    for(let i = 0; i < searchHistory.length; i++){
        const historyItem = document.createElement('input');
        historyItem.setAttribute('type', 'text');
        historyItem.setAttribute('readonly', true);
        historyItem.setAttribute('class','form- control d-block bg-white');
        historyItem.setAttribute('value', searchHistory[i]);
        history.appendChild(historyItem);
    }
}

renderSearchHistory();

}
initPage();