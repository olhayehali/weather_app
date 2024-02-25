var api_key = "c548847567bd93c5f3e752e7dd62e304";
// the api in deployment is in .env file not submitted to github but for the sake of this project i will leave it here

//DOM elements made global for easy access
var city_input = document.getElementById("city_input");
var submit = document.getElementById("submit");
var units = document.getElementById("units");
var locate_me = document.getElementById("locate_me");
var loading = document.getElementById("loading");
var popup = document.getElementById("popup");
var menu = document.getElementById("menu");
var citys ;

var weather_ui = document.getElementById("weather_ui");


var city = document.getElementById("city");
var temp = document.getElementById("temp");
var desc = document.getElementById("desc");
var icon = document.getElementById("icon");
var max_temp = document.getElementById("temp_max");
var min_temp = document.getElementById("temp_min");
var wind_speed = document.getElementById("wind_speed");
var wind_direction = document.getElementById("wind_direction");
var feels_like = document.getElementById("feels_like");
var feel_desc = document.getElementById("feel_desc");
var sunrise = document.getElementById("sunrise");
var sunset = document.getElementById("sunset");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var visibility = document.getElementById("visibility");

//convert degrees to compass direction for user friendly display
function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

//convert visibility to user friendly display
function visibility_max_value(visibility) {
    if(visibility >= 10000)
    {
        return "10K";
    }
    else
    {
        return visibility;
    
    }
}
//convert visibility to user friendly display
function visibility_max(visibility) {
    if (visibility < 1000) {
        return "Low";
    }
    else if (visibility < 5000) {
        return "Moderate";
    }
    else if (visibility < 10000) {
        return "High";
    }
    else {
        return "Very High";
    }
}

//function to give units based on the selected unit
function unit_giver() {
    switch(units.value) {
        case "imperial":
            return ['°F', 'mph', 'inHg'];
        case "metric":
            return ['°C', 'm/s', 'HPa'];
        case "standard":
            return ['°K', 'm/s', 'HPa'];
    }
}

//convert hpa to inhg for user friendly display of pressure in inches of mercury
function hpa_to_inhg(hpa) {
    return hpa * 0.02953;
}

//convert unix time to user friendly time
function time_covert(time) {
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    //format time to 12 hour clock
    if (hours > 12) {
        hours = hours - 12;
        var formattedTime = hours + ':' + minutes.substr(-2)+ " PM";
        return formattedTime;    
    }
    var formattedTime = hours + ':' + minutes.substr(-2)+ " AM";
    return formattedTime;
}

//get geolocation and display weather data
//ask for permission to get geolocation

function get_geolocation() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position) 
        {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getData(lat, lon, units, api_key);
        },
        function(error) {
            alert("Error: " + error.message);
        }
        );
    } 
    else 
    {
        alert("Geolocation is not supported by this browser.");
    }
}


function getData(lat, lon, units, api_key) {
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid="+ api_key +"&units="+ units.value;
    $.get(url, function(data) {
        city.innerHTML = data.name+ ", " + data.sys.country;
        temp.innerHTML = Math.floor(data.main.temp)+ unit_giver(units.value)[0];
        desc.innerHTML = data.weather[0].description;
        icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        max_temp.innerHTML = "H:"+data.main.temp_max+  unit_giver(units.value)[0];
        min_temp.innerHTML = "L:"+data.main.temp_min+  unit_giver(units.value)[0];
        wind_speed.innerHTML = data.wind.speed+" "+unit_giver(units.value)[1];
        wind_direction.innerHTML = degToCompass(data.wind.deg);
        feels_like.innerHTML = data.main.feels_like+ unit_giver(units.value)[0];
        feel_desc.innerHTML = "Feels like" + data.weather[0].description + " " ;
        sunrise.innerHTML = time_covert(data.sys.sunrise);
        sunset.innerHTML = time_covert(data.sys.sunset);
        pressure.innerHTML = data.main.pressure+" "+unit_giver(units.value)[2];
        humidity.innerHTML = data.main.humidity+"%";
        visibility.innerHTML = visibility_max_value(data.visibility) + "m <br>"+visibility_max(data.visibility);
        $(weather_ui).fadeIn(100);
        loading.style.display= "none";
    });
}

//if got more city
function MoreCity(elements) {
    citys = elements;
    menu.style.display = "block";
    $( ".menu_content_list" ).empty();
    elements.forEach((element,index)  => {        
        $( ".menu_content_list" ).append( "<li class='menu_content_list_item' id='"+index+"'><p class='menu_content_list_item_text' id='menu_item_text'><span>"+element.name+"</span><span> ,"+element.country+"</span></p></li>");
    });
    $(".menu_content_list_item").click(function(e) {
        menu.style.display = "none";
        var id = e.target.id;
        city_input.value = citys[id].name;
        var lat = citys[id].lat;
        var lon = citys[id].lon;
        loading.style.display= "block";
        getData(lat, lon, units, api_key);
        citys.empty();
    });    
    loading.style.display= "none";
    return
}

//get weather data based on city provided

function getWeather(first_time = true) {
    let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city_input.value + "&limit=5&appid="+ api_key +"&units="+ units.value;
    $.get(url, function(data) {
        if (data.length == 0) {
            popup.style.display = "block";
            city_input.value = "";
            loading.style.display= "none";
            return;
        }
        else if (data.length > 1 && first_time == true) {
            MoreCity(data);
            return;
        }
        else if(data.length == 1){
            var lat = data[0].lat;
            var lon = data[0].lon;
            getData(lat, lon, units, api_key);
            return;           
        }
});
}