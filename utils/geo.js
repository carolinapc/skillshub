
var googleApiKey = "AIzaSyBwPxzjMTFenaxV8gFHtYqVTcGgt7kH_c4";
var x = document.getElementById("gpsPos");

var map, infoWindow;

var pos2 = {
    lat: 43.681408,
    lng: -79.416137
}


function showPosition(position, postalCode) {
    x.innerHTML = "Position found " +
        "  -   Latitude: " + position.lat +
        "  -   Longitude: " + position.lng +
        "  -   Postal Code: " + postalCode;
}

function setPlaceMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            getPostalCode(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.65, lng: -79.38 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    setPlaceMap();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

var getPostalCode = function (pos) {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&key=' + googleApiKey,
        dataType: "json",
        success: function (data) {
            var addresses = data.results; // cache results in a local var
            console.log(data);
            $.each(addresses, function (i) { // iterate through to find a postal code
                if (this.types[0] == "postal_code") { // check that the type is a postal code
                    var postal = this['address_components'][0]['long_name']; // grab postal string
                    if (postal.length > 3) { // is the result is more then 3 letter shorthand use it
                        // do something with your result and then lets break the iteration
                        console.log("teste: ");
                        zipToGeo(postal);
                        showPosition(pos, postal);
                        infoWindow.setContent(postal);
                        // infoWindow.setContent("" + getStraightDistance(pos1, pos2));
                        drawCircle(pos, getStraightDistance(pos, pos2));

                        map.zoom = 15;
                        infoWindow.open(map);
                        map.setCenter(pos);
                        return false;
                    }
                }
            });
        } // end success
    }); // end ajax
};

//BACK END  //retornar uma promessa om axios
function zipToGeo(postal) {
    var zipToGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + postal + "&key=" + googleApiKey;
    //Ajax Call to call for address and place it into listAddArr
    return axios.ajax({
        url: zipToGeo,
        dataType: 'json',
        success: function (data) {
            // if (data.results[0].formatted_address) {
            console.log("inside geo");
            console.log(data.results[0].geometry.location);
            return
        }
    });
}

//FRONT END
function degToRadians(degree) {
    var rad = degree * (Math.PI / 180);
    return rad;
}

function getStraightDistance(posOrigin, posDestination) {
    const radius = 6371;

    var dLat = degToRadians(posDestination.lat - posOrigin.lat);
    var dLng = degToRadians(posDestination.lng - posOrigin.lng);

    a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(degToRadians(posOrigin.lat)) *
        Math.cos(degToRadians(posDestination.lat)) *
        Math.pow(Math.sin(dLng / 2), 2);

    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    d = radius * c;

    return d;
}

//MAPA
function drawCircle(pos, rad) {
    var skillsRadiusCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: {
            lat: pos.lat,
            lng: pos.lng
        },
        radius: rad * 1000
    });
    map.fitBounds(skillsRadiusCircle.getBounds());
}

module.exports = {
    zipToGeo: zipToGeo
};
