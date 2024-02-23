
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
        alert("Please provide a city");   
    }
});

// //listen to change of units to automatically update the weather
// units.addEventListener("change", function(event) {
//     //check if city is empty
//     if(city_input.value != "" )
//     {
//         loading.style.display= "block";
//         //get weather with city provided
//         getWeather();
//     }
//     else if(city.innerHTML != "")
//     {
//         loading.style.display= "block";
//         //get geolocation
//         get_geolocation();
//     }
//     else
//     {
//         alert("Please provide a city");   
//     }
// });


