const cityElement = $('enterCity');
const searchButton = $('searchButton');
const clearButton = $('clearHistory');
const city_name = $('city-name');
const currentPic = $('current-pic');
const currentTemp = $('temperature');
const currentHumidity = $('humidity');
const currentWind = $('wind-speed');
const currentUV = $('UV-index');
const history = $('history');
var fiveDay = $('five-day-weather');
var weatherToday = $('today-weather');
let searchHistory = JSON.parse(localStorage.getItem('search')) || [];


const apiKey = "1dc621126262037aadf0ef0fd44245df";


function getWeather(cityName){
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(queryURL)
        .then(function (response) {
            weatherToday.classList.remove('d-none');
}
}

searchButton.addEventListener('click', function(){
    const searchTerm = cityElement.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('search', JSON.stringify(searchHistory));
    renderSearchHistory();
})
clearButton.addEventListener('click', function(){
    localStorage.clear();
    searchHistory = [];
    rendSearchHistory();
})

function kelv2fer(k){
    return Math.floor((k - 273.15) * 1.8 + 32);
}

function rendSearchHistory(){
    history.innerHTML = "";
    for(let i = 0; i < searchHistory.length; i++){
        const historyItem = $('<input>');
        historyItem.setAttribute('type', 'text');
        historyItem.setAttribute('readonly', true);
        historyItem.setAttribute('class','form- control d-block bg-white');
        historyItem.setAttribute('value', searchHistory[i]);
    }

}

renderSearchHistory();