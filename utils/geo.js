require("dotenv").config();
const axios = require("axios");
const googleApiKey = process.env.GOOGLE_API_KEY;

const getPostalCode = function (pos) {
    return axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&key=' + googleApiKey,
        responseType: 'json'
    });
};

const zipToGeo = function (postal) {
    return axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + postal + '&key=' + googleApiKey,
        responseType: 'json'
    });
}

function degToRadians(degree) {
    var rad = degree * (Math.PI / 180);
    return rad;
}

function getStraightDistance(posOrigin, posDestination) {
    const radius = 6371;

    var dLat = degToRadians(posDestination.latitude - posOrigin.latitude);
    var dLng = degToRadians(posDestination.longitude - posOrigin.longitude);

    a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(degToRadians(posOrigin.latitude)) *
        Math.cos(degToRadians(posDestination.latitude)) *
        Math.pow(Math.sin(dLng / 2), 2);

    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    d = radius * c;

    return d;
}

module.exports = {
    zipToGeo: zipToGeo,
    getPostalCode: getPostalCode,
    getStraightDistance: getStraightDistance
};

// MAP FEATURE (TBD)
/*function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.65, lng: -79.38 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    setPlaceMap();
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

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
}*/