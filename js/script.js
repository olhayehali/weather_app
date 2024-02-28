
//get elements from the DOM and listen to events from the user

locate_me.addEventListener("click", function(event) {
    loading.style.display= "block";
    //get geolocation
    get_geolocation();
});

submit.addEventListener("click", function(event) {
    event.preventDefault();
    //check if city_input is empty
    if(city_input.value != "")
    {
    //show loading spinner while waiting for the weather
    loading.style.display= "block";
    //get weather with city provided
    getWeather();
    }
    else
    {
        popup.style.display= "block";
    }
});

