// We create the first option tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view optional tile layer for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport and Toronto routes GeoJSON URL
let airportData = "https://raw.githubusercontent.com/cb19weber/Mapping_Earthquakes/main/static/js/majorAirports.json";
let torontoData = "https://raw.githubusercontent.com/cb19weber/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json";

// Create a universal style for the map lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

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

// Grab our GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retreived data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airline: " + layer.feature.properties.airline + "</h3><hr><h3>Destination: " + layer.feature.properties.dst + "</h3>")
        }
    }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
light.addTo(map);