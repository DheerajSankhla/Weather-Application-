
window.addEventListener("load",()=>{
 navigator.geolocation.getCurrentPosition(async(position)=>{
const lang = position.coords.longitude;
const lat = position.coords.latitude;

console.log(lang.lat);

// const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lang}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'e5ac12436cmsh399cbd91ee98957p1c2238jsne46f6a636146',
// 		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();

//   updateWeatherUI(result , "K")
	
// } catch (error) {
// 	console.error(error);
// }

 }) ;
       
 // write javascript for adding greeting message & show time
    let greeting = document.getElementById("greeting");
    let time = document.getElementById("time");

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if( hours < 12 ){
      greeting.innerHTML = "Good Morning";
    }
    else if(hours < 17 ){
      greeting.innerHTML = "Good Afternoon";
    }
    else {
      greeting.innerHTML = "Good Evening";
    }

    // time.innerHTML = ` ${hours}: ${minutes} P.M`

    let displayhours = hours >12 ? hours-12 : hours; // adjust the 12hours 
    let displayPeriod = hours >=12 ? "P.M" : "A.M";   // adjust the am & pm

    let displayMinutes = minutes <10 ? "0"+minutes : minutes;

    time.innerHTML = `${displayhours} ${displayMinutes} ${displayPeriod}`;


});





const btn = document.getElementById("searchbtn");

let isloading = false;   // not anything is loading

btn.addEventListener("click",async (e)=>{
    const cityName = document.getElementsByName("cityName")[0].value;

    // const url = `https://open-weather13.p.rapidapi.com/city/${cityName}`;

    // const options = {
    //     method: 'GET',
    //     headers: {
    //       'X-RapidAPI-Key': 'e5ac12436cmsh399cbd91ee98957p1c2238jsne46f6a636146',
    //         'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    //     }
    // };
    
    try {
      isloading = true;   // when it is true then btn container loading and after execute so it is search
      isloading ? btn.innerHTML ="loading....": btn.innerHTML="Search";
        const response = await fetch(url, options);
        const result = await response.json();
        updateWeatherUI(result , "F");
        isloading = false
        isloading ? btn.innerHTML ="loading....": btn.innerHTML="Search";
        console.log(result);
    } 
    
    
    
    catch (error) {
        console.log(error);
    } finally{
      isloading= false;
    }
})

function convertTemperature(temperature, unit) {
    if (unit === "K") {
      return convertKelvinToCelsius(temperature);
    } else if (unit === "F") {
      return convertFahrenheitToCelsius(temperature);
    } else {
      throw new Error("Invalid temperature unit");
    }
  }
  
  function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  
  function convertFahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function updateWeatherUI(data, unit) {
    const temperature = document.getElementById('temperature');
    const tempCelsius = convertTemperature(data.main.temp, unit);
    temperature.innerHTML = `${tempCelsius.toFixed(2)}°C`;
  
    // update other elements similarly, using convertTemperature for each value based on its unit
    const feelsLike = document.getElementById("feelsliketemprature");
    feelsLike.innerHTML = `Feels Like: ${convertTemperature(data.main.feels_like, unit).toFixed(2)}°C`;
  
    // min temperature
    const minTemperature = document.getElementById("minimum");
    const minTempCelsius = convertTemperature(data.main.temp_min, unit).toFixed(2);
    minTemperature.innerHTML = `${minTempCelsius}°C`;
  
    // max temperature
    const maxTemperature = document.getElementById("maximum");
    const maxTempCelsius = convertTemperature(data.main.temp_max, unit).toFixed(2);
    maxTemperature.innerHTML = `${maxTempCelsius}°C`;
  
  // pressure
  const atmosphericPressure = document.getElementById("pressure");
  atmosphericPressure.innerHTML = `${data.main.pressure} hPa`;

  // visibility
  const visibility = document.getElementById("visibility");
  visibility.innerHTML = `${data.visibility} meters`;

  // wind speed
  const windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = `${data.wind.speed} m/s`;

  // humidity
  const humidity = document.getElementById("humidity");
  humidity.innerHTML = `${data.main.humidity}%`;
  


  // sunset
  const sunsetElement = document.getElementById("sunset");
  const sunsetTimestamp = data.sys.sunset;
  const sunsetDate = new Date(sunsetTimestamp * 1000);
  const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  sunsetElement.innerHTML = `Sunset: ${sunsetTime}`;
  // sunrise
  const sunriseElement = document.getElementById("sunrise");
  const sunriseTimestamp = data.sys.sunrise;
  const sunriseDate = new Date(sunriseTimestamp * 1000);
  const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  sunriseElement.innerHTML = `Sunrise: ${sunriseTime}`;

  }



