// document.addEventListener('DOMContentLoaded', function() {
//     // Function to perform geocoding using Nominatim
//     function geocode(address, callback) {
//         fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.length > 0) {
//                     callback(data[0]);
//                 } else {
//                     console.error('No results found');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     // Address to geocode
//     var address = document.getElementById('listing-address').innerText;

//     // Perform geocoding and initialize the map
//     geocode(address, function(result) {
//         var latitude = result.lat;
//         var longitude = result.lon;

//         var map = L.map('map').setView([latitude, longitude], 13);

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         // Red marker for listing location
//         var redIcon = L.icon({
//             iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//             iconSize: [32, 32],
//             iconAnchor: [16, 32],
//             popupAnchor: [0, -32]
//         });

//         L.marker([latitude, longitude], { icon: redIcon }).addTo(map)
//             .bindPopup('<b>' + document.getElementById('listing-title').innerText + '</b><br>' + address).openPopup();

//         // Get user's current location
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 var userLat = position.coords.latitude;
//                 var userLon = position.coords.longitude;

//                 // Blue marker for user's current location
//                 var blueIcon = L.icon({
//                     iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//                     iconSize: [32, 32],
//                     iconAnchor: [16, 32],
//                     popupAnchor: [0, -32]
//                 });

//                 L.marker([userLat, userLon], { icon: blueIcon }).addTo(map)
//                     .bindPopup('Home<br>Your current location').openPopup();

//                 // Add a circular boundary around the user's current location
//                 var circle = L.circle([userLat, userLon], {
//                     color: 'blue',
//                     fillColor: '#30f',
//                     fillOpacity: 0.2,
//                     radius: 500 // Radius in meters
//                 }).addTo(map);

//                 // Adjust map view to fit both markers and the circle
//                 var bounds = L.latLngBounds([[latitude, longitude], [userLat, userLon]]);
//                 map.fitBounds(bounds);
//             });
//         } else {
//             console.error('Geolocation is not supported by this browser.');
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    // Function to perform geocoding using Nominatim
    function geocode(address, callback) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    callback(data[0]);
                } else {
                    console.error('No results found');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Address to geocode
    var address = document.getElementById('listing-address').innerText;

    // Perform geocoding and initialize the map
    geocode(address, function(result) {
        var latitude = result.lat;
        var longitude = result.lon;

        var map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Default marker for listing location
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('<b>' + document.getElementById('listing-title').innerText + '</b><br>' + address).openPopup();
    });
});







