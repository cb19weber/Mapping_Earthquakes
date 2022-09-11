// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

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

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/cb19weber/Mapping_Earthquakes/main/static/js/majorAirports.json";

// Grab our GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retreived data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airport code: " + layer.feature.properties.faa + "<hr>" + 
                             "<h3>Airport name: " + layer.feature.properties.name);
        }
    }).addTo(map);
});



// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);