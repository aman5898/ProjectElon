var arr = require('./map-points.json')
var $=require('jquery');

var dangerlocations_arr = arr.dangerzones
var safelocations_arr = arr.safezones
var map;
var directionsService;
var directionsDisplay;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
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
    directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });
        // calculateAndDisplayRoute(directionsService, directionsDisplay, dangerlocations_arr[0], safelocations_arr);
    // dangerlocations_arr.forEach(dangerpoint => {
    //     calculateAndDisplayRoute(directionsService, directionsDisplay, dangerpoint, safelocations_arr);        
    // });

}

function calculateAndDisplayRoute(directionsService, directionsDisplay, dangerpoint, safepoint_arr) {
    var counter = 0;
    pointA = dangerpoint;
    var minDist = 3214000;
    var safestPoint = safepoint_arr[0];
    safepoint_arr.forEach(pointB => {
        directionsService.route({
            origin: pointA,
            destination: pointB,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // directionsDisplay.setDirections(response);
                var dist = response.routes[0].legs[0].distance.value;
                // console.log(response.routes[0].legs[0].distance.value);                
                if (dist < minDist) {
                    minDist = dist;
                    safestPoint = pointB;
                }
            } else {
                // window.alert('Directions request failed due to ' + status);
            }
            if (counter == safepoint_arr.length - 1) {
                console.log(JSON.stringify(dangerpoint) + " " + JSON.stringify(safestPoint) + " " + minDist);
                DisplayRoute(directionsService, directionsDisplay, pointA, safestPoint)   
                console.log(minDist);
                distKm=minDist/1000;
                $(".console").empty();
                $(".console").append(`Total Distance = ${distKm} Km`);
            }
            counter++;
        });

    });
}

function DisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            // window.alert('Directions request failed due to ' + status);
        }
    });
}

function setMap() {
    map.setMapTypeId('terrain');
}


initMap();


// function nearestSafePoint(directionsService, directionsDisplay) {
//     // console.log(dangerlocations_arr);
//     // console.log(safelocations_arr);

//     dangerlocations_arr.forEach(dangerpoint => {
//         var min;
//         var safestPoint;

//         safelocations_arr.forEach(saferpoint => {

//             var dist = calculateAndDisplayRoute(directionsService, directionsDisplay, dangerpoint, saferpoint)
//             console.log("aman= "+dist);

//             if(dist<min){
//                 min=dist;
//                 safestPoint=saferpoint;
//             }
//         }); 
//         console.log(safestPoint);              
//     });
// }