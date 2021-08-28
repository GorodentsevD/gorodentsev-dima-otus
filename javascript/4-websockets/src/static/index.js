document.addEventListener("DOMContentLoaded", event => {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ29yb2RlbnRzZXZkIiwiYSI6ImNrc3NoYndoajB3azEydW1kYXZmbnRubzgifQ.5HOmzMGbU32QH5P_KFFc5w'
    }).addTo(mymap);



    const geo = navigator.geolocation;
    if (!geo) {
        alert('Geolocation API is not supported in your browser.');
        return;
    }

    const ws = new WebSocket("ws://127.0.0.1:8082");

    ws.onmessage = event => {
        console.log(event.data);
    };

    let polyline;
    const geoInterval = () => {
        geo.getCurrentPosition(pos => {
            console.log(pos.coords);
            const latlng = L.latLng (pos.coords.latitude, pos.coords.longitude)
            if (!polyline) {
                polyline = L.polyline(latlng, {color: 'red'}).addTo(mymap);

                // zoom the map to the polyline
                mymap.fitBounds(L.latLngBounds(latlng, latlng));
            } else {
                polyline.addLatLng(latlng);
            }

            ws.send(JSON.stringify({latitude: pos.coords.latitude, longtitude: pos.coords.longitude}));
        }, msg => {
            console.log(msg);
            alert('Please enable your GPS position feature.');
        }, {enableHighAccuracy: true});
    }

    let interval;
    ws.onopen = () => {
        geoInterval();
        interval = setInterval(geoInterval, 1000 * 60);
    }

    ws.onclose = () => {
        if (interval) clearInterval(interval);
    }
});