console.log('group projects are the best!')
console.log('the Rico check')

// global html variables
var nasaImage = $('#nasaImage');

var nasaKey = 'e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6'
    // var requestUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaKey;
var requestUrl = 'https://api.nasa.gov/planetary/apod?api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6';

// Browser Fetch Method
function getNasaAPI() {
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response \n-------------');
            console.log(data);
            var videoId = 'ix1lzur2QLQ?'
            var urlOfTheDayVideo = data.url + "?&autoplay=1&background=1&loop=1&playlist=''";
            var urlOfTheDayImg = data.url
            var mediaType = data.media_type

            if (mediaType === "video") {
                nasaImage.append("<iframe id=image src=" + urlOfTheDayVideo + " alt=Nasa Image of the Day allow='autoplay; fullscreen' allowfullscreen ></iframe>")
            } else {
                nasaImage.append("<img id=image src=" + urlOfTheDayImg + " alt=Nasa Image of the Day >")
            }
            //https://www.youtube.com/embed/ix1lzur2QLQ?rel=0
            //nasaImage.append("<img id=image src=" + urlOfTheDayImg + " alt=Nasa Image of the Day >")
            //nasaImage.append("<img id=image src=https://api.nasa.gov/planetary/apod?date=2021-07-06&api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6 >")
        });
}

getNasaAPI();

// list of closest astroids from NASA
var astroidData = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-07-02&end_date=2021-07-08&api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6'



// constellation wiget
// https://www.astroviewer.net/av/en/?lon=-97.7436995&lat=30.2711286&name=Austin

// var avSkymap = document.querySelector("#av-skymap");
// var longitude = 
// var latitude = 
// user types austin in our input THEN our geolocator fetch call finds latitude, THEN turn into string, passes to object avSkymapProperties

// var avSkymapProperties = {
//     location: {
//         lon: longitude,
//         lat: '40.987',
//         name: 'New York City',
//         tz: 'America/New_York'
//     },
//     deco: 16399,
//     size: 1000,
//     lang: 'en'
// };

// --------------------------  from christian  --------------------------
// let lat = 0
//         let long = 0
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 console.log(position.coords.latitude, position.coords.longitude)
//                 lat = position.coords.latitude
//                 long = position.coords.longitude
//                 console.log("LATLONG1: ", lat, long) //test..
//             })

// ----------------------------- geolocator that thomas found ----------------------
// https://ipgeolocation.io/astronomy-api.html
// key:09dd26af9aa84c3394026291a5438b9b

// curl --request GET \
//   --url https://freegeoip.app/json/ \
//   --header 'accept: application/json' \
//   --header 'content-type: application/json'


// (function(window, document, undefined) {

//     document.addEventListener('DOMContentLoaded', initialize);

//     function initialize() {
//         var container = document.getElementById('av-skymap');
//         container.style.overflow = 'hidden';
//         container.innerHTML = getHTML();
//     }

//     function getHTML() {
//         //		var params = getValidatedParameters();

//         const DEFAULT_LON = 0.0;
//         const DEFAULT_LAT = 0.0;
//         const DEFAULT_DECO = 16399;
//         const DEFAULT_LANG = 'en';
//         const LANGS = ['de', 'en', 'es', 'fr', 'is', 'nl', 'pt'];
//         const DEFAULT_SIZE = 600;
//         const MIN_SIZE = 500;
//         const MAX_SIZE = 1000;

//         var p = avSkymapProperties; // from global variable
//         var lon = (p.location.lon && !isNaN(p.location.lon)) ? p.location.lon : DEFAULT_LON;
//         var lat = (p.location.lat && !isNaN(p.location.lat)) ? p.location.lat : DEFAULT_LAT;
//         var deco = (p.deco && !isNaN(p.deco)) ? p.deco : DEFAULT_DECO;
//         var lang = (p.lang && LANGS.includes(p.lang)) ? p.lang : DEFAULT_LANG;
//         var size = (p.size && !isNaN(p.size)) ? p.size : DEFAULT_SIZE;
//         size = Math.min(MAX_SIZE, Math.max(MIN_SIZE, size));

//         const TEXTFIELD_HEIGHT = 90;
//         var width = size;
//         var height = size + TEXTFIELD_HEIGHT;

//         var queryString = 'lon=' + lon.toFixed(3);
//         queryString += '&lat=' + lat.toFixed(3);
//         queryString += '&deco=' + deco;
//         queryString += '&lang=' + lang;
//         queryString += '&size=' + size;
//         if (p.location.name) queryString += '&name=' + encodeURIComponent(p.location.name);
//         if (p.location.tz) queryString += '&tz=' + encodeURIComponent(p.location.tz);
//         if (p.time && !isNaN(p.time)) queryString += '&time=' + parseInt(p.time);

//         var url = 'https://astroviewer.net/av/widgets/skymap-av4-widget.php?' + queryString;
//         var url = 'https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=-73.986&lat=40.748&deco=16399&lang=en&size=500' + queryString;

//         var x = '';
//         x += '<iframe id="skymap-iframe" src="' + url + '" width="' + width + '" height="' + height + '" sandbox="allow-scripts allow-popups" scrolling="no" style="overflow:hidden; border: 1px solid #ccc;"></iframe>';
//         return x;
//     }

// })(window, document);