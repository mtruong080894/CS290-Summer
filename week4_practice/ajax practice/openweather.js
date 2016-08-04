var weatherKey = 'b1b15e88fa797225412429c1c50c122a';
// ^^ i grabbed this by googling an "api key example weather"

var webBased = "http://api.openweathermap.org/data";
var versionNumber = "2.5";
var endingWeather = "weather";
var apiOpenweather = webBased + "/" + versionNumber + "/" + endingWeather;
                     

                     //reference: http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=b1b15e88fa797225412429c1c50c122a

function loadbutton() 
{
    document.getElementById('submitweather').addEventListener('click', function (event) {

        
        document.getElementById('cityN').textContent = "";
        document.getElementById('temperature').textContent = "";
        document.getElementById('sunset').textContent = "";


        var zip = document.getElementById('zipCode').value;
        var city = document.getElementById('city').value;
        if(zip === "" && city === "")
            return;
        else if(zip !== "" && city === "") // fail conditions
            weatherzip(zip);
        else if(zip === "" && city !== "") // fail conditions 
            weathercity(city);
        
    })
}

function weatherzip(zipCode) //determine by zip
{
    var request = apiOpenweather + "?zip=" + zipCode + ",us&APPID=" + weatherKey;
    var req = new XMLHttpRequest();
    req.open("GET", request, true);
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) { //refernece: http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
            var result = JSON.parse(req.responseText);
            document.getElementById('cityN').textContent = result.name;
            document.getElementById('temperature').textContent = result.main.temp;
            document.getElementById('sunset').textContent = result.main.sunset;
        }
    });

    req.send(null);
}

function weathercity(city) //determine by city location
{
    var request = apiOpenweather + "?q=" + city + ",us&APPID=" + weatherKey;
    var req = new XMLHttpRequest();
    req.open("GET", request, true);
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) { //reference: http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
            var result = JSON.parse(req.responseText);
            document.getElementById('cityN').textContent = result.name;
            document.getElementById('temperature').textContent = result.main.temp;
            document.getElementById('sunset').textContent = result.main.sunset;
        }
    });
    req.send(null);
}