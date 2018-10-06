var arr = require('./map-points.json')

var dangerlocations_arr = arr.dangerzones
var safelocations_arr = arr.safezones

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 }
    });


    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers1 = dangerlocations_arr.map(function (location, i) {
        return new google.maps.Marker({
            position: location
        });
    });

    var markers2 = safelocations_arr.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers1,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers2,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    }),

    pointA = {
        "lat": 8.5241,
        "lng": 76.9366
    }

    pointB = {
        "lat": 9.9312,
        "lng": 76.2673
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log(response.routes[0].legs[0].distance.value);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

initMap();