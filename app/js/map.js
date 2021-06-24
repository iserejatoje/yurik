export function initMap() {
    setTimeout(() => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "js/leaflet.min.js";
        document.getElementsByTagName("body")[0].appendChild(script)
        script.onload = function () {
            let map;
            map = L.map('map', {
                attributionControl: false,
                scrollWheelZoom: false
            }).setView([55.35117, 86.070965], 16);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
            let pin = L.icon({
                iconUrl: 'images/pin.png',
                iconSize: [120, 100],
                iconAnchor: [0, 100],
            });
            L.marker([55.35117, 86.070965], {icon: pin}).addTo(map);
        };
    }, 1000);
}
