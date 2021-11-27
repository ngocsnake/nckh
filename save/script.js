function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}
let i = 1;
function style(feature) {
    return {
        fillColor: getColor(feature.geometry.cases),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}



var map = L.map('map').setView([21, 105.75], 10.8);
/*==============================================
            Thêm Nền Cho Bản Đồ
================================================*/
//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);


// google street 
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map);




const { readdirSync } = require("fs");
const { join } = require("path");
/*==============================================
            GEOJSON
================================================*/
import hanoi from './gis/01.js'
const input = hanoi
L.geoJSON(input, { style: style }).addTo(map)
input.forEach(hanoi => {

console.log(hanoi);

const xMax = hanoi.bbox[2];
const yMax = hanoi.bbox[3];

const xMin = hanoi.bbox[0];
const yMin = hanoi.bbox[1];

const cases = hanoi.cases;
var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
svgElement.setAttribute('viewBox', "0 0 200 200");
svgElement.innerHTML =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 200 200">
          <g id="UrTavla">
            <circle style="fill:#90BDCA;stroke:#fff;stroke-width:1.6871;stroke-miterlimit:10;" cx="100" cy="100" r="25">
            </circle>
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="18" dy=".3em">${cases}</text>
          </g>
        </svg>`;
L.svgOverlay(svgElement, [[yMax, xMax], [yMin, xMin]]).addTo(map);})

fetch('https://static.pipezero.com/covid/data.json')
    .then(response => response.json())
    .then(data => console.log(data));

/*==============================================
                LEAFLET EVENTS
================================================*/
// map.on('mouseover', function () {
//     console.log('your mouse is over the map')
// })

// map.on('mousemove', function (e) {
//     document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + '---lng: ' + e.latlng.lng;
//     console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
// })

/*==============================================
                    MARKER
================================================*/
// var myIcon = L.icon({
//     iconUrl: 'https://stttt.thuathienhue.gov.vn/UploadFiles/TinTuc/2015/5/8/chien_si_hai_quan.jpg',
//     iconSize: [40, 40],
// });
// var singleMarker = L.marker([21.042626479548545, 105.7750433833395], { icon: myIcon, draggable: true });
// var popup = singleMarker.bindPopup('Hoang Sa Truong Sa la cua Viet Nam. ' + singleMarker.getLatLng()).openPopup()
// // popup.addTo(map);



// console.log(singleMarker.toGeoJSON())