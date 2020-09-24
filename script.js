// get current date with Moment.js
moment().format('l');

////////// PART 1: create function for searching city weather //////////
function searchCity(cityname) {

    ////////// 1.1: call for selected city (current weather) //////////

    // create an AJAX call for specific city button being clicked
    var apiKey = "0d1f93298e940a8508fa6cd6f92d7ecf";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=" + apiKey;
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        //empty divs and ids to hold and display info
        $("#current").empty();
        var nowDate = moment().format('l');

        // date
        var displayNowDate = $("<h4>").text(nowDate)
            .addClass("nowDate");

        // city name
        var cityName = $("<h1>").text(response.name)
            .addClass("card-display-4 city-name");

        // temperature
        var tempF = Math.floor(response.main.temp);
        var temp = $("<p>").text("Temperature: " + tempF + "°F")
            .addClass("lead current-temp");

        // create, locate and display HUMIDITY
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%")
            .addClass("lead current-humidity");

        // create, locate and display WIND SPEED
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed)
            .addClass("lead current-windspeed");

        // identify weather status & display relevant icon
        var currentWeather = response.weather[0].main;

        if (currentWeather === "Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
            currentIcon.attr("style", "height: 70px; width: 70px");

        } else if (currentWeather === "Drizzle" || "Light Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d@2x.png");
            currentIcon.attr("style", "height: 70px; width: 70px");

        } else if (currentWeather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
            currentIcon.attr("style", "height: 70px; width: 70px");

        } else if (currentWeather === "Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
            currentIcon.attr("style", "height: 70px; width: 70px");
        }

        else if (currentWeather === "Fog" || "Mist") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
            currentIcon.attr("style", "height: 70px; width: 70px");
        }

        //create HTML div to append new elements to display on page
        var newDiv = $('<div>');
        newDiv.append(displayNowDate, cityName, currentIcon, temp, humidity, windSpeed);
        $("#current").html(newDiv);

        // call for UV index septrately (require additional API)

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            $('uvi-display').empty();

            //create HTML for new div & determine the color of unIndex based on value
            // 8+: Very High to Extreme per EPA
            if (response.value > 8) {
                var uvIndex = $("<span class='badge badge-danger uv-index'>").text("UV Index: " + response.value);
                $('#uvi-display').html(uvIndex);
                // 3 to 7: Moderate to High per EPA
            } else if (response.value > 3) {
                var uvIndex = $("<span class='badge badge-warning uv-index'>").text("UV Index: " + response.value);
                $('#uvi-display').html(uvIndex);
                // 0 to 2: Low per EPA
            } else {
                var uvIndex = $("<span class='badge badge-success uv-index'>").text("UV Index: " + response.value);
                $('#uvi-display').html(uvIndex);
            }

        });

    });

    ////////// 1.2: call for 5-day forecast //////////

    $.ajax({
        url: queryURLforecast,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        // store an array of results in the results variable
        var results = response.list;
        // empty 5day div
        $("#5day").empty();

        // create HTML for 5day forecast
        for (var i = 0; i < results.length; i += 8) {
            // create div
            var fiveDayDiv = $("<div class='five-day card shadow-lg text-white bg-primary mx-auto mb-10 p-2 rounded'>");

            // store the responses date temp and humidity.......
            var date = results[i].dt_txt;
            var setD = date.substr(5, 5);
            var temp = Math.floor(results[i].main.temp);
            var hum = results[i].main.humidity;

            // create tags with result items information.....
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp " + temp + "°F");;
            var pHum = $("<p class='card-text'>").text("Hum " + hum + "%");;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
                icon.attr("style", "height: 45px; width: 45px");

            } else if (weather === "Drizzle" || "Light Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
                icon.attr("style", "height: 45px; width: 45px");
            }

            else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
                icon.attr("style", "height: 45px; width: 45px");
            }

            else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
                icon.attr("style", "height: 45px; width: 45px");
            }

            else if (weather === "Fog" || "Mist") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
                icon.attr("style", "height: 45px; width: 45px");
            }

            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").append(fiveDayDiv);
        }

    });

}
pageLoad();

////////// PART 2: add button .click function here //////////

$("#select-city").click(function (event) {

    // prevent the button from trying to submit the form
    event.preventDefault();

    // cature city name
    var cityInput = $("#city-input").val().trim();

    // save search term to local storage
    var textContent = $(this).siblings().val();
    var storeArray = [];
    storeArray.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storeArray));

    searchCity(cityInput);
    pageLoad();
});

////////// PART 3: call stored cities on page with function pageLoad() //////////

function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded'>").text(lastSearch);
    var lsearch = $("<div>");
    lsearch.append(searchDiv)
    $("#history").prepend(lsearch);
}

// event listener
$("#history").click(".btn", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
});
