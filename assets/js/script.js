const search = document.querySelector('#searchBar');
const submit = document.querySelector('#submitSearch');

const secret = `510f05f9fc9fc6f3faf45aaaea9aa1ad`;

let lon;
let lat;

function getCoordinates() {
    const searchVal = document.getElementById('searchBar').value;
    const location = `http://api.openweathermap.org/geo/1.0/direct?q=${searchVal}&limit=1&appid=${secret}`
    let locationData;
    let lo;
    //AI help
    function fetchLocationData(callback) {
    fetch(location)
  .then(response => {
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON data
    return response.json();
  })
  .then(data => {
    locationData = {...data};
    lo = locationData["0"];
    // Handle the data returned from the API
    // console.log(locationData);
    // console.log(lo);
    lat = lo.lat;
    lon = lo.lon;

    callback(lat,lon);
    
  })
  .catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
}
  fetchLocationData((lat, lon) => {
    console.log('Latitude:', lat);
    console.log('Longitude:', lon);
    // You can now use lat and lon outside the fetch function
});

    //Sanity checks    
    // console.log(location);
    // console.log(searchVal);
    // const lat = lo.lat;
    // const lon = lo.lon;

    // console.log('lat + lon' + lat + lon);
    

    
    
};


function getWeatherData(lat,lon) {
    fetchLocationData((lat,lon))
    console.log(lat,lon);
    
    const weatherData = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${secret}`
    console.log(weatherData);
    
    fetch(weatherData)
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON data
      return response.json();
    })
    .then(data => {
      weather = {...data};
      
      // Handle the data returned from the API
      console.log(weather);      
      
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('There was a problem with the fetch operation:', error);
    });

    return weatherData;
};

submit.addEventListener('click', function (){
    getCoordinates();
    
    getWeatherData();
})

