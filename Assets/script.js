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
};

function kelv2fer(k){
    return Math.floor((k - 273.15) * 1.8 + 32);
};

clearButton.addEventListener('click', function(){
    localStorage.clear();
    searchHistory = [];
    rendSearchHistory();
})

function rendSearchHistory(){
    history.innerHTML = "";
    
};