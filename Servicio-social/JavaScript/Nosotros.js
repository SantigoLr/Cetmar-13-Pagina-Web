var map = L.map('map').setView([25.604592647991403, -109.06150591346855], 16); // Topolobampo

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([25.604592647991403, -109.06150591346855]).addTo(map)
.bindPopup('CETMAR 13')
.openPopup();