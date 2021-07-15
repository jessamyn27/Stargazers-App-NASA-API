// global html variables
var skyMap = $('#skyMap');
var userInput = document.getElementById('userInput');
var searchBtn = document.getElementById('searchBtn');
var saveBtn = document.getElementById('saveBtn');
var widgetDiv = document.getElementById('widgetDiv');
var geoList = document.getElementById('geoList');
var nasaImage = $('#nasaImage');
var dailyTitle = document.getElementById('dailyTitle');
var dailyImg = document.getElementById('dailyImg');
var dailyDesc = document.getElementById('dailyDesc');
var nasaKey = 'e7G5azfeRqHQXvk3XlZgcL9yfcSQ7kPQCub0Ech6';
var geoKey = '09dd26af9aa84c3394026291a5438b9b';
var requestUrlOneMonthRange = 'https://api.nasa.gov/planetary/apod?start_date=2021-06-07&end_date=2021-07-07&api_key=' + nasaKey;
var requestUrlNasaVideo = 'https://api.nasa.gov/planetary/apod?date=2021-07-07&api_key=' + nasaKey;
var requestUrlNasaDailyImage = 'https://api.nasa.gov/planetary/apod?&api_key=' + nasaKey;
var requestURLAstroidData = 'https://api.nasa.gov/neo/rest/v1/feed?&api_key=' + nasaKey;
var galleryArr = [
    'https://apod.nasa.gov/apod/image/2106/NovaCasAndFriends_Ayoub_960.jpg',
    'https://apod.nasa.gov/apod/image/2106/Jovey_JunoMajor_960.jpg',
    'https://apod.nasa.gov/apod/image/2106/MultiEclipse_Eder_960.jpg',
    'https://apod.nasa.gov/apod/image/2106/2021-06-10EclipseFlybywm1066.jpg'
];

// ------------------ NASA background video API -------------------------------------------------------------------------------

function getNasaVideoAPI() {
    fetch(requestUrlNasaVideo)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response Nasa Video API \n-------------');
            console.log(data);
            var videoPlaylist = 'ix1lzur2QLQ;';
            var urlOfTheDayVideo = data.url + "&loop=1&playlist=" + videoPlaylist + "?&autoplay=1&controls=0&start=10&end=120&modestbranding=1&mute=1&background=1&";
            nasaImage.append("<iframe id=backgroundVideo src=" + urlOfTheDayVideo + "alt=Nasa Image of the Day allow=autoplay; fullscreen ></iframe>");
        });
}
//call NASA video function
getNasaVideoAPI();

// ------------------ NASA Asteroids Near Earth API -------------------------------------------------------------------------------

function getNasaAstroidAPI() {
    fetch(requestURLAstroidData)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response Nasa ASTEROID API \n-------------');
            console.log(data);
            var today = new Date()
                // console.log(today)
            var todayDate = `${today.getFullYear()}-0${today.getMonth() + 1}-${(today.getDate()) + 1}`
                // JSON.stringify(todayDate);
            console.log('string of today date ' + todayDate)
                // console.log('year is: ' + today.getFullYear())
                // console.log('month is: ' + today.getMonth())
                // console.log('day is: ' + today.getDate())
            var dailyAsteroidList = data.near_earth_objects[todayDate]
            console.log(dailyAsteroidList + ' astroid list for today')

            var asteroidDiaArr = [];
            var asteroidMissArr = [];
            var asteroidHazTrueArr = [];
            var asteroidSentTrueArr = [];

            for (var i = 0; i < dailyAsteroidList.length; i++) {
                var dailyAsteroidDiaList = dailyAsteroidList[i].estimated_diameter.feet.estimated_diameter_max;
                var dailyAsteroidMissList = dailyAsteroidList[i].close_approach_data['0'].miss_distance.miles;
                var dailyAsteroidHazList = dailyAsteroidList[i].is_potentially_hazardous_asteroid;
                var dailyAsteroidSentList = dailyAsteroidList[i].is_sentry_object;

                asteroidDiaArr.push(dailyAsteroidDiaList)
                asteroidMissArr.push(dailyAsteroidMissList)

                if (dailyAsteroidHazList === true) {
                    asteroidHazTrueArr.push(dailyAsteroidHazList)
                }

                if (dailyAsteroidSentList === true) {
                    asteroidSentTrueArr.push(dailyAsteroidHazList)
                }
            }

            asteroidDiaArr.sort((a, b) => a - b)
            for (var i = 1; i < asteroidDiaArr.length; i++) {
                var leftPointer = i - 1;
                var rightPointer = i;
                var dailyAstroidDiameter = 0;
                if (asteroidDiaArr[leftPointer] > asteroidDiaArr[rightPointer]) {
                    dailyAstroidDiameter = asteroidDiaArr[leftPointer]
                } else if ((asteroidDiaArr[leftPointer] < asteroidDiaArr[rightPointer])) {
                    dailyAstroidDiameter = asteroidDiaArr[rightPointer]
                }
            }

            asteroidMissArr.sort((a, b) => a - b)
            for (var i = 1; i < asteroidMissArr.length; i++) {
                var leftPointer = i - 1;
                var rightPointer = i;
                var dailyAstroidMissDistance = 0;
                if (asteroidMissArr[leftPointer] < asteroidMissArr[rightPointer]) {
                    dailyAstroidMissDistance = asteroidMissArr[leftPointer]
                } else if ((asteroidMissArr[leftPointer] > asteroidMissArr[rightPointer])) {
                    dailyAstroidMissDistance = asteroidMissArr[rightPointer]
                }
            }

            if (asteroidHazTrueArr != null) {
                var dailyAsteroidHazList = 'Yes!'
            } else {
                var dailyAsteroidHazList = 'Not Today'
            }
            if (asteroidSentTrueArr != null) {
                var dailyAstroidSentList = 'Yes!'
            } else {
                var dailyAstroidSentList = 'Not Today'
            }


            $('#astroidList').append("<li> Today's Largest Asteroid: " + dailyAstroidDiameter + " feet</li>");
            $('#astroidList').append("<li> Today's Closest Asteroid: " + dailyAstroidMissDistance + " miles</li>");
            $('#astroidList').append("<li> Are Any Asteroids Hazardous?: " + dailyAsteroidHazList + "</li>");
            $('#astroidList').append("<li>Are Any Asteroids Sentry? " + dailyAstroidSentList + "</li>");

            console.log(dailyAstroidDiameter + ' daily astroid')

        });
}
//call NASA video function
getNasaAstroidAPI();

// ------------------ NASA daily image API -------------------------------------------------------------------------------
function getNasaDailyAPI() {
    fetch(requestUrlNasaDailyImage)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response Daily Nasa Image API \n-------------');
            console.log(data);
            var videoPlaylist = 'ix1lzur2QLQ';
            var urlOfTheDayVideo = data.url + "&loop=1&playlist=" + videoPlaylist + "?&autoplay=1&controls=0&start=10&end=120&modestbranding=1&mute=1&background=1&";
            var urlOfTheDayImg = data.url;
            var mediaType = data.media_type;
            dailyTitle.innerHTML = data.title;
            dailyDesc.innerHTML = data.explanation;

            for (var i = 0; i < galleryArr.length; i++) {
                $('#gallery').append("<div class=galleryPhoto ><img class=dailyImage column is-one-fourth src=" + galleryArr[i] + "></div>")
            }
            // check if image of the day is image or video then append iframe or img src to page
            if (mediaType === 'video') {
                $('#dailyImgContainer').append("<iframe class=dailyVideo src=" + urlOfTheDayVideo + "alt=Nasa Image of the Day allow=autoplay; fullscreen ></iframe>");
            } else {
                $('#dailyImgContainer').append("<img class=dailyImage src=" + urlOfTheDayImg + ">");
            }

            didYouKnowBtn.addEventListener('click', function() {
                dailyDesc.style.display = "block";

            })
            saveBtn.addEventListener('click', function() {
                // clear out the gallery then add in the new image to the array (that will be in storage)
                $('#gallery').empty();

                // check local storage to see if there is an array
                function checkLocalStorage() {
                    // if local storage is not null aka something is in
                    if (localStorage.getItem("galleryArr") != null) {
                        // return it and parse it into JSON 
                        return JSON.parse(localStorage.getItem("galleryArr"))
                    } else {
                        // if empty just return galleryArr
                        return galleryArr;
                    }
                }

                function saveLocalStorage() {
                    // if stmnt from check function will GET local storage and push into our array called galleryArr
                    galleryArr = checkLocalStorage();
                    // now order the new item into our array at the begining of it (index 0)
                    galleryArr.unshift(urlOfTheDayImg);

                    if (galleryArr.length > 4) {
                        // last search item is removed from end of array
                        galleryArr.pop();
                        localStorage.setItem("galleryArr", JSON.stringify(galleryArr));
                    } else {
                        localStorage.setItem("galleryArr", JSON.stringify(galleryArr))
                    }
                }

                function display() {
                    galleryArr = checkLocalStorage();
                    $.each(galleryArr, function(i) {
                        $('#gallery').append("<div class=galleryPhoto ><img class=dailyImage column is-one-fourth src=" + galleryArr[i] + "></div>");
                    })
                }
                saveLocalStorage();
                display();
            })
        });
}
// call NASA daily api function
getNasaDailyAPI();
// ------------------ GeoLocator API -------------------------------------------------------------------------------
function getGeoApi(city) {
    var requestUrl = "https://api.ipgeolocation.io/astronomy?apiKey=09dd26af9aa84c3394026291a5438b9b&location=" + city;
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Fetch Response Geo Locator \n-------------');
            console.log(data);
            var lat = data.location.latitude;
            var long = data.location.longitude;
            var skyImg = "https://astroviewer.net/av/widgets/skymap-av4-widget.php?lon=" + long + "&lat=" + lat + " &deco=16399&lang=en&size=1000";

            // clears out the skymap if there's one there before showing the new one
            if (document.getElementById('skymap-iframe')) {
                var iframe = document.getElementById('skymap-iframe');
                iframe.remove();
            }

            // handling capitalizing each string of a city name like san diego is now San Diego...
            var cityArr = city.split(" ")
            for (var i = 0; i < cityArr.length; i++) {
                cityArr[i] = cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1);
            }
            // now our city parameter aka userInput from event listener has Uppercase on each word in the string (Salt Lake City)
            city = cityArr.join(" ");

            // handling showing just city and state for USA and just city and country for the rest of the world
            if (data.location.country === 'United States of America') {
                $('#skyMapTitle').text(`${city}, ${data.location.state}`);
                $('#astroTitle').text(`${city}, ${data.location.state}`);
            } else {
                $('#skyMapTitle').text(`${city}, ${data.location.country}`);
                $('#astroTitle').text(`${city}, ${data.location.country}`);
            }
            // handling skymap image changed based on city lat and long
            skyMap.append("<iframe id='skymap-iframe' src=" + skyImg + " width=1000 height=1000 sandbox='allow-scripts allow-popups' scrolling='no' style='overflow:hidden; border: 1px solid #ccc;'></iframe>");

            // handling all data from ipgeolocator that needs to convert from military time

            //Sunset
            var sunsetTime = data.sunset;
            sunsetTime = sunsetTime.split(':');
            var hours = Number(sunsetTime[0]);
            var minutes = Number(sunsetTime[1]);
            var sunsetTimeValue;
            if (hours > 0 && hours <= 12) {
                sunsetTimeValue = "" + hours;
            } else if (hours > 12) {
                sunsetTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                sunsetTimeValue = "12";
            }
            sunsetTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            sunsetTimeValue += (hours >= 12) ? " PM" : " AM";

            //Sunrise
            var sunriseTime = data.sunrise;
            sunriseTime = sunriseTime.split(':');
            var hours = Number(sunriseTime[0]);
            var minutes = Number(sunriseTime[1]);
            var sunriseTimeValue;
            if (hours > 0 && hours <= 12) {
                sunriseTimeValue = "" + hours;
            } else if (hours > 12) {
                sunriseTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                sunriseTimeValue = "12";
            }
            sunriseTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            sunriseTimeValue += (hours >= 12) ? " PM" : " AM";

            //Moonset
            var moonsetTime = data.moonset;
            moonsetTime = moonsetTime.split(':');
            console.log(moonsetTime)
            var hours = Number(moonsetTime[0]);
            var minutes = Number(moonsetTime[1]);
            var moonsetTimeValue;
            if (hours > 0 && hours <= 12) {
                moonsetTimeValue = "" + hours;
            } else if (hours > 12) {
                moonsetTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                moonsetTimeValue = "12";
            }
            moonsetTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            moonsetTimeValue += (hours >= 12) ? " PM" : " AM";

            //Moonrise
            var moonriseTime = data.moonrise;
            moonriseTime = moonriseTime.split(':');
            var hours = Number(moonriseTime[0]);
            var minutes = Number(moonriseTime[1]);
            var moonriseTimeValue;
            if (hours > 0 && hours <= 12) {
                moonriseTimeValue = "" + hours;
            } else if (hours > 12) {
                moonriseTimeValue = "" + (hours - 12);
            } else if (hours == 0) {
                moonriseTimeValue = "12";
            }
            moonriseTimeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
            moonriseTimeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM

            if (('#geoList')) {
                $('#geoList').empty();
            }
            $('#geoList').append("<li> Sunrise " + sunriseTimeValue + "</li>");

            $('#geoList').append("<li> Sunset " + sunsetTimeValue + "</li>");
            $('#geoList').append("<li> Moonrise " + moonriseTimeValue + "</li>");

            $('#geoList').append("<li> Moonset " + moonsetTimeValue + "</li>");
            $('#geoList').append("<li> Sun Distance " + data.sun_distance + " km</li>");
            $('#geoList').append("<li> Moon Distance " + data.moon_distance + " km</li>");
            geoList.style.cssText = "background-color:rgba(0,0,0,.8)";
        })
}
// ----------------------------- skymap widget --------------------------------------
searchBtn.addEventListener('click', function() {
    var inputValue = userInput.value;
    console.log(inputValue);
    getGeoApi(inputValue);
})