// function getColor(d) {
//     return d > 100000 ? '#8A1839' :
//         d > 10000 ? '#FD6A0B' :
//         d > 5000 ? '#F8696B' :
//         d > 500 ? '#F9C467' :
//         d > 100 ? '#ECE182' :
//         '#E7E7E7';
// }
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getColor(d) {
    return d > 100000 ? '#ED2625' :
        d > 10000 ? '#F36B21' :
        d > 5000 ? '#FEF22F' :
        '#43B549';
}

function style(feature) {
    const color = getColor(feature.geometry.properties.cases) || 0;
    return {
        fillColor: color,
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
// const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });
// osm.addTo(map);


// google street 
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map);

// map.on('click', function(e) {
//     var lt = String(e.latlng.lat),
//         lg = String(e.latlng.lng);
//     var popup = L.popup()
//         .setLatLng(e.latlng)
//         .setContent(lt + " " + lg)
//         .openOn(map);
// });
/*==============================================
            GEOJSON
================================================*/
function getInfoByCityName(locations, tenThanhPho) {
    return locations.find(thanhPho => {
        return thanhPho.name == tenThanhPho;
    });
}

function getInfoVaccinByCityName(VaccinData, tenThanhPho) {
    return VaccinData.find(thanhPho => {
        return thanhPho.provinceName == tenThanhPho;
    });
}

async function loadMap() {
    const response = await fetch('http://localhost:3003/api/datacovid').then(response => response.json());
    const datacovid = response.locations;


    const locations = response.locations;
    const overview = response.overview;


    lastUpdate(overview[6].date);
    onClick(datacovid[0]);
    const geojson = L.geoJSON(datacovid, { style: style }, { opacity: 1 }).addTo(map);

    geojson.on('click', layer => {
        onClick(layer.layer.feature.geometry);
    });

    locations.forEach(khuvuc => {
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
                    <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="14" dy=".3em">${new Intl.NumberFormat().format(cases)}</text>
                  </g>
                </svg>`;
        L.svgOverlay(svgElement, [
            [yMax, xMax],
            [yMin, xMin]
        ]).addTo(map);
    })
}
loadMap();

var level2s = {};

function lastUpdate(time) {
    const lastUpdate = document.querySelector('#lastUpdate');
    lastUpdate.textContent = "Cập nhật lần cuối vào 17h59' ngày " + time + "-2022";
}

function removeLayer() {
    if (level2s.options) {
        level2s.eachLayer(layer => {
            level2s.removeLayer(layer)
        });
    }
}

function onClick(data) {
    removeLayer();

    let cityName = data.name;
    cityName = cityName.replace('TP. ', '');
    if (cityName === "Hà Nội" || cityName === "Hải Phòng" || cityName === "Đà Nẵng" || cityName === "Hồ Chí Minh")
        cityName = "Thành Phố " + cityName
    else {
        cityName = "Tỉnh " + cityName
    }
    const city = document.querySelector('#cityname');
    const caduongtinh = document.querySelector('#ca-duong-tinh');
    const caduongtinhtrongngay = document.querySelector('#ca-duong-tinh-trong-ngay');
    const catuvong = document.querySelector('#ca-tu-vong');
    const cahoiphuc = document.querySelector('#ca-hoi-phuc');

    const danso = document.querySelector('#dan-so');
    const tiemMui1 = document.querySelector('#tiem-mui-1');
    const tiemMui2 = document.querySelector('#tiem-mui-2');
    const tiemMui3 = document.querySelector('#tiem-mui-3');

    const soCaNhiem = data.properties.cases;

    city.textContent = cityName;
    caduongtinh.textContent = new Intl.NumberFormat().format(soCaNhiem);
    caduongtinhtrongngay.textContent = new Intl.NumberFormat().format(data.properties.casesToday);
    catuvong.textContent = new Intl.NumberFormat().format(data.properties.death);
    cahoiphuc.textContent = new Intl.NumberFormat().format(0);

    danso.textContent = new Intl.NumberFormat().format(data.vaccin.population);
    tiemMui1.textContent = new Intl.NumberFormat().format(data.vaccin.totalOnceInjected);
    tiemMui2.textContent = new Intl.NumberFormat().format(data.vaccin.totalTwiceInjected);
    tiemMui3.textContent = new Intl.NumberFormat().format(data.vaccin.totalThriceInjected);

    level2s = L.geoJSON(data.level2s).addTo(map);
    // const level2s = L.geoJSON(data, { style: style }, { opacity: 1 }).addTo(map);

    const diaPhuong = data.level2s;
    const thongTinQuanHuyen = document.querySelector('#thong-tin-quan-huyen');
    let htmls = '';

    const trungBinh = Math.round(soCaNhiem / diaPhuong.length);

    console.log(trungBinh);
    diaPhuong.forEach(qh => {
        htmls +=
            `<div class="dflex-spaceb te">
                <div>${qh.name}</div>
                <div>${new Intl.NumberFormat().format(randomIntFromInterval(trungBinh / 2, trungBinh * 1.5))}</div>
            </div>`
    })

    thongTinQuanHuyen.innerHTML = htmls;
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
