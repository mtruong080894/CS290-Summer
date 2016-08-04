var weatherKey = 'b1b15e88fa797225412429c1c50c122a';
// ^^ i grabbed this by googling an "api key example weather"

var webBased = "http://api.openweathermap.org/data";
var versionNumber = "2.5";
var endingWeather = "weather";
var apiOpenweather = webBased + "/" +
                     versionNumber + "/" +
                     endingWeather;

                     //reference: http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=b1b15e88fa797225412429c1c50c122a

function bindButtons() {
    document.getElementById('weatherSubmit').addEventListener('click', function (event) {

        //Clear the page
        document.getElementById('cityN').textContent = "";
        document.getElementById('temperature').textContent = "";
        document.getElementById('sunset').textContent = "";


        var zip = document.getElementById('zipCode').value;
        var city = document.getElementById('city').value;
        if(zip === "" && city === "")
            return;
        else if(zip !== "" && city === "")
            getWeatherByZip(zip);
        else if(zip === "" && city !== "")
            getWeatherByCity(city);
        
    })
}

function getWeatherByZip(zipCode)
{
    var uri = apiOpenweather + "?zip=" + zipCode + ",us&APPID=" + weatherKey;
    var req = new XMLHttpRequest();
    req.open("GET", uri, true);
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var result = JSON.parse(req.responseText);
            document.getElementById('cityN').textContent = result.name;
            document.getElementById('temperature').textContent = result.main.temp;
            document.getElementById('sunset').textContent = result.main.sunset;
        }
    });

    req.send(null);
}

function getWeatherByCity(city)
{
    var uri = apiOpenweather + "?q=" + city + ",us&APPID=" + weatherKey;
    var req = new XMLHttpRequest();
    req.open("GET", uri, true);
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            var result = JSON.parse(req.responseText);
            document.getElementById('cityN').textContent = result.name;
            document.getElementById('temperature').textContent = result.main.temp;
            document.getElementById('sunset').textContent = result.main.sunset;
        }
    });
    req.send(null);
}