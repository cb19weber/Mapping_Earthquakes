// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.84, -122.3], 14);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: (city.population - 200000) /100000,
        color: "orange",
        lineweight: 4
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2><hr><h3>Population " + city.population.toLocaleString() + "</h3")
    .addTo(map);
});

// Create a line
let line1 = [
    cityData[7].location,
    cityData[8].location,
    cityData[6].location
];
let line2 = [
    cityData[6].location,
    cityData[5].location
]

// Create a polyline using the line coordinates and make the line red
L.polyline(line1, {
    color: "yellow"
}).addTo(map);
L.polyline(line2, {
    color: "lightblue"
}).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);