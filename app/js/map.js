export function initMap() {
    let mapShowed = false;

    function elementInViewport(el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    window.addEventListener('scroll', () => {
        if (elementInViewport(document.getElementById('map')) && !mapShowed) {

            if (document.getElementById('map')) {
                let map,
                    pin,
                    marker;

                mapShowed = true;

                let script = document.createElement("script")
                script.type = "text/javascript"
                script.src = "js/leaflet.min.js"
                document.getElementsByTagName("body")[0].appendChild(script)
                script.onload = function () {
                    map = L.map('map', {
                        attributionControl: false,
                        scrollWheelZoom: false
                    }).setView([55.35117, 86.070965], 16)
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map)
                    pin = L.icon({
                        iconUrl: 'images/pin.png',
                        iconSize: [120, 100],
                        iconAnchor: [0, 100],
                    })
                    marker = L.marker([55.35117, 86.070965], {icon: pin})
                    map.addLayer(marker);
                }

                const mapPoints = document.querySelectorAll('.map-point')
                for (let i = 0; i < mapPoints.length; i++) {
                    mapPoints[i].addEventListener('click', function (event) {
                        let element = event.target;
                        map.panTo(element.getAttribute('data-latlng').split(','))
                        map.removeLayer(marker)
                        marker = L.marker(element.getAttribute('data-latlng').split(','), {icon: pin})
                        map.addLayer(marker);
                        event.preventDefault()
                    })
                }

            }


        }
    })
}
