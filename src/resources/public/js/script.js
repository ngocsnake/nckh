function getColor(d) {
    return d > 100000 ? '#8A1839' :
        d > 10000 ? '#FD6A0B' :
            d > 5000 ? '#F8696B' :
                d > 500 ? '#F9C467' :
                    d > 100 ? '#ECE182' :
                        '#E7E7E7';
}
function style(feature) {
    return {
        fillColor: getColor(feature.geometry.properties.cases),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}


var map = L.map('map').setView([21, 105.75], 7);
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



/*==============================================
            GEOJSON
================================================*/
// fetch('https://api.apify.com/v2/key-value-stores/EaCBL1JNntjR3EakU/records/LATEST')
fetch('https://static.pipezero.com/covid/data.json')
    .then(response => response.json())
    .then(data1 => {
        const locations = data1.locations;
        const overview = data1.overview;
        const today = data1.today;
        const total = data1.total;

        fetch('http://localhost:3003/api/province')
            .then(response => response.json())
            .then(data2 => {
                function getInfo(tenThanhPho) {
                    return locations.find(thanhPho => {
                        return thanhPho.name == tenThanhPho
                    });
                }
                data2.forEach(thanhpho => {
                    thanhpho.properties = getInfo(thanhpho.name);
                })
                loadMap(data2)
            });
    });


function loadMap(data) {
    const inputGeojson = data
    L.geoJSON(inputGeojson, { style: style },{opacity: 1 }).addTo(map)
    inputGeojson.forEach(khuvuc => {
        const xMax = khuvuc.bbox[2];
        const yMax = khuvuc.bbox[3];

        const xMin = khuvuc.bbox[0];
        const yMin = khuvuc.bbox[1];
        const cases = khuvuc.properties.cases;
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        svgElement.setAttribute('viewBox', "0 0 200 200");
        svgElement.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                viewBox="0 0 200 200">
                  <g id="UrTavla">
                    <circle style="fill:#90BDCA;stroke:#fff;stroke-width:1.6871;stroke-miterlimit:10;" cx="100" cy="100" r="25">
                    </circle>
                    <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="14" dy=".3em">${cases}</text>
                  </g>
                </svg>`;
        L.svgOverlay(svgElement, [[yMax, xMax], [yMin, xMin]]).addTo(map);
    })
}


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