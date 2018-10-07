var arr = require('./map-points.json')
var $ = require("jquery");
var dangerlocations_arr = arr.dangerzones;
dangerlocations_arr.forEach(dangerlocation => {
    $("#Monitor .dataPoints").append(`<div class="row mt-2">
                                        <div class="col mt-3">${dangerlocation.lat}</div>
                                        <div class="col mt-3">${dangerlocation.lng}</div>
                                        <div class="col routeButton" lat="${dangerlocation.lat}" lng="${dangerlocation.lng}"> <button>Route</button> </div>
                                    </div>`)
    // console.log(dangerlocation.lat);

});
// sonu = new google.maps.Map(document.getElementById('map'), {
//         zoom: 3,
//         center: { lat: -28.024, lng: 140.887 }
//     });
// aman = new google.maps.DirectionsService;
//     ritik = new google.maps.DirectionsRenderer({
//         map: sonu
//     });

$('#Monitor').on('click', '.routeButton', function () {
    console.log($(this)["0"].attributes[1].nodeValue);
    console.log($(this)["0"].attributes[2].nodeValue);
    console.log(dangerlocations_arr[0]);
    obj = {
        "lat": parseFloat($(this)["0"].attributes[1].nodeValue),
        "lng": parseFloat($(this)["0"].attributes[2].nodeValue)
    }
    console.log(obj == dangerlocations_arr[0]);
    console.log(obj);

    calculateAndDisplayRoute(directionsService, directionsDisplay, obj, safelocations_arr);

});     