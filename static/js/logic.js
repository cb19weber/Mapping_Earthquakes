// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    /* options:
    mapbox/streets-v11
    mapbox/outdoors-v11
    mapbox/light-v10
    mapbox/dark-v10
    mapbox/satellite-v9
    mapbox/satellite-streets-v11
    */    
});

// Add GeoJSON data
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Add GeoJSON layer to the map
// Grab GeoJSON data
L.geoJSON(sanFranAirport, {
    // Iterate through each feature to create markers
    onEachFeature: function(feature, layer) {
        console.log(layer.feature);
        // Create popup information for marker
        layer.bindPopup("<h3>Airport code: " + layer.feature.properties.faa + "</h3><hr>" + 
                         "<h3>Airport name: " + layer.feature.properties.name + "</h3>");
    }
}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);