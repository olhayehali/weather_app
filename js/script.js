// this  listen to the user input and get the weather from the city provided by calling get_geolocation() function
locate_me.addEventListener("click", function(event) {
    loading.style.display= "block";
    //get geolocation
    get_geolocation();
});
//this event listener is for the submit button to get the weather from the city provided by calling getWeather() function
//it also checks if the city input is empty

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
        //show no city or no input  popup menu
        popup.style.display= "block";
    }
});

