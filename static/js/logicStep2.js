// We create the first option tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view optional tile layer for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the GeoJSON URL
let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a universal style for the map lines
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow",
    fillOpacity: .25
}

// Create styling function for the earthquake mapping data
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Create mathematical function to determine radius of circleMarker based on earthquake magnitude
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Map our GeoJSON data
d3.json(quakeData).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retreived data
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo
        /*onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Neighborhood: " + layer.feature.properties.AREA_NAME);
        }*/
    }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);