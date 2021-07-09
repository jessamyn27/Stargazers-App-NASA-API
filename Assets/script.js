console.log('group projects are the best!')
console.log('the Rico check')
    // global html variables
var skyMap = $('#skyMap');
var userInput = document.getElementById('userInput');
var inputValue = userInput.value
var searchBtn = document.getElementById('searchBtn');
var widgetDiv = document.getElementById('widgetDiv');
var nasaImage = $('#nasaImage');
var nasaKey = 'e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6'
var requestUrl = 'https://api.nasa.gov/planetary/apod?date=2021-07-07&api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6';
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
            var urlOfTheDayVideo = data.url + "?&autoplay=1&controls=0&muted=1&background=1&loop=1&playlist=ix1lzur2QLQ?";
            var urlOfTheDayImg = data.url
            var mediaType = data.media_type
            if (mediaType === "video") {
                nasaImage.append("<embed id=image src=" + urlOfTheDayVideo + "alt=Nasa Image of the Day allow=autoplay; fullscreen ></embed>")
            } else {
                nasaImage.append("<img id=image src=" + urlOfTheDayImg + " alt=Nasa Image of the Day >")
            }
            //https://www.youtube.com/embed/ix1lzur2QLQ?rel=0
            //nasaImage.append("<img id=image src=" + urlOfTheDayImg + " alt=Nasa Image of the Day >")
            //nasaImage.append("<img id=image src=https://api.nasa.gov/planetary/apod?date=2021-07-06&api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6 >")
            // "http://salty-mountain-68764.herokuapp.com/https://www.youtube.com/embed/ix1lzur2QLQ?rel=0?&start=10&end=25&autoplay=1&background=1&loop=1&playlist=ix1lzur2QLQ"
        });
}
getNasaAPI();
// list of closest astroids from NASA
var astroidData = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-07-02&end_date=2021-07-08&api_key=e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6'
    // ----------------------------- geolocator that thomas found ----------------------
    // key:09dd26af9aa84c3394026291a5438b9b
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function getGeoApi(inputValue) {
    var requestUrl = "https://api.ipgeolocation.io/astronomy?apiKey=09dd26af9aa84c3394026291a5438b9b&location=" + inputValue;
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response Geo Locator \n-------------');
            console.log(data);
            console.log(data.location.latitude)
            console.log(data.location.longitude)
            var lat = data.location.latitude
            var long = data.location.longitude
            console.log(lat)
            console.log(long)

            var skyImg = "https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=" + long + "&lat=" + lat + " &deco=16399&lang=en&size=500"
            if (document.getElementById('skymap-iframe')) {
                var iframe = document.getElementById('skymap-iframe')
                iframe.remove()
                console.log('this removed')
            }
            skyMap.append("<iframe id='skymap-iframe' src=" + skyImg + " width=500 height=500 sandbox='allow-scripts allow-popups' scrolling='no' style='overflow:hidden; border: 1px solid #ccc;'></iframe>")




            // var skyImg = "https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=" + long + "&lat=" + lat + "&deco=16399&lang=en&size=500"
            //     // https: //salty-mountain-68764.herokuapp.com/https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=-73.986&lat=40.748&deco=16399&lang=en&size=500
            // skyMap.append("<iframe id='skymap-iframe' src=" + skyImg + "width=500 height=500 sandbox='allow-scripts allow-popups' scrolling='no' style='overflow:hidden; border: 1px solid #ccc;'></iframe>")



            $('#geoList').append("<li> sunset:" + data.sunset + "</li>")
            $('#geoList').append("<li> sunrise:" + data.sunrise + "</li>")
            $('#geoList').append("<li> sun distance:" + data.sun_distance + "</li>")
            $('#geoList').append("<li> moonset:" + data.moonset + "</li>")
            $('#geoList').append("<li> moonrise:" + data.moonrise + "</li>")
            $('#geoList').append("<li> moon distance:" + data.moon_distance + "</li>")
                // skyMap.append("<div id=av-skymap><scrip>var avSkymapProperties = {location: {lon: " + data.location.longitude + ",lat: " + data.location.latitude + ",name: 'anywhere',tz: 'America/New_York'},deco: 16399,size: 600,lang: 'en'};</script></div><scrip src=https://astroviewer.net/widgets/widgets/skymap.js></scrip>")
                /* <img src=https://salty-mountain-68764.herokuapp.com/https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=" + lat + "&lat=" + long + "&deco=16399&lang=en&size=500 */
                // var widgetScript = document.createElement("script");
                // widgetScript.type = "text/javascript";
                // widgetScript.src = "https://astroviewer.net/widgets/widgets/skymap.js";
                // $("#widgetDiv").append(widgetScript);
                // var widget = document.createElement("script");
                // widget.type = "text/javascript";
                // widget.id = "widgetScript"
                // $('#av-skymap').append(widget)
                // widgetObject = ("var avSkymapProperties = { location: { lon: " + long + ", lat: " + lat + ", name: 'anywhere', tz: 'America/New_York' }, deco: 16399, size: 600, lang: 'en' }");
                // $("#widgetScript").append(widgetObject)
        })
}
// ----------------------------- skymap widget --------------------------------------
searchBtn.addEventListener('click', function() {
        var inputValue = userInput.value
        console.log(inputValue)
        getGeoApi(inputValue)
    })
    // <!-- constellation widget -->
    /* < src="https://astroviewer.net/widgets/widgets/skymap.js"></> */
    // skyMap.append("<div id=av-skymap><>var avSkymapProperties = {location: {lon: " + long + ",lat: " + lat + ",name: 'anywhere',tz: 'America/New_York'},deco: 16399,size: 600,lang: 'en'};</></div>")
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
    // https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=-973.986&lat=40.748&deco=16399&lang=en&size=500
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