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







