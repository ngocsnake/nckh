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

var hospitalIcon = new L.Icon({
    iconUrl: 'img/hospital.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var map = L.map('map').setView([21, 105.75], 7);

let markers = []

function addMarkers() {
    for (var i = 0; i <= 10; i++) {
        let marker = L.marker([21, 105.75 + i], { icon: hospitalIcon }).addTo(map);
        markers.push(marker)
    }
}

function removeMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker)
    })
    markers = [];
}
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
async function loadMap() {
    const response = await fetch('/api/datacovid').then(response => response.json());
    const datacovid = response.locations;


    const locations = response.locations;

    const cityNames = locations.map(location => `<option value="${location.name}">`).join('');

    document.querySelector('#browsers').innerHTML = cityNames;


    const overview = response.overview;


    lastUpdate(overview[6].date);
    onClick(datacovid[0]), false;

    geojson = L.geoJSON(datacovid, { style: style }, { opacity: 1 }).addTo(map);



    geojson.on('click', layer => {
        onClick(layer.layer.feature.geometry, true);
    });


    document.querySelector('#browser').addEventListener('change', (e) => {

        const citys = geojson._layers

        for (const key in citys) {
            if (Object.hasOwnProperty.call(citys, key)) {
                const element = citys[key];


                if (element.feature.geometry.name === e.target.value) {
                    onClick(element.feature.geometry, true);
                }
            }
        }
    })

    locations.forEach(khuvuc => {
        const coordinates = [khuvuc.bbox[2], khuvuc.bbox[3], khuvuc.bbox[0], khuvuc.bbox[1]];
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
                    <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="12" dy=".3em">${khuvuc.name}</text>
                  </g>
                </svg>`;
        L.svgOverlay(svgElement, [
            [coordinates[1], coordinates[0]],
            [coordinates[3], coordinates[2]]
        ]).addTo(map);
    })
}
loadMap();

let level2s = {};
let geojson = {};

function lastUpdate(time) {
    const lastUpdate = document.querySelector('#lastUpdate');
    lastUpdate.textContent = "S??? li???u c???p nh???t t??? 12-2019 ?????n " + time + "-2022";
}

function removeLayer() {
    console.log(level2s);
    if (level2s.options) {
        level2s.eachLayer(layer => {
            level2s.removeLayer(layer)
        });
    }
}

function onClick(data, fly) {
    removeLayer();

    const lat = (data.bbox[1] + data.bbox[3]) / 2;
    const lon = (data.bbox[0] + data.bbox[2]) / 2;

    if (fly) {
        map.flyTo([lat, lon]);
    };


    let cityName = data.name;
    cityName = cityName.replace('TP. ', '');
    if (cityName === "H?? N???i" || cityName === "H???i Ph??ng" || cityName === "???? N???ng" || cityName === "H??? Ch?? Minh")
        cityName = "Th??nh Ph??? " + cityName
    else {
        cityName = "T???nh " + cityName
    }
    document.querySelector('#browser').value = "T??m ki???m: " + cityName + '...';
    const city = document.querySelector('#cityname');
    const caduongtinh = document.querySelector('#ca-duong-tinh');
    const caduongtinhtrongngay = document.querySelector('#ca-duong-tinh-trong-ngay');
    const catuvong = document.querySelector('#ca-tu-vong');
    // const cahoiphuc = document.querySelector('#ca-hoi-phuc');

    const danso = document.querySelector('#dan-so');
    const tiemMui1 = document.querySelector('#tiem-mui-1');
    const tiemMui2 = document.querySelector('#tiem-mui-2');
    // const tiemMui3 = document.querySelector('#tiem-mui-3');

    const soCaNhiem = data.properties.cases;

    city.textContent = cityName;
    caduongtinh.textContent = new Intl.NumberFormat().format(soCaNhiem);
    caduongtinhtrongngay.textContent = new Intl.NumberFormat().format(data.properties.casesToday);
    catuvong.textContent = new Intl.NumberFormat().format(data.properties.death);
    // cahoiphuc.textContent = new Intl.NumberFormat().format(0);

    danso.textContent = new Intl.NumberFormat().format(data.vaccin.population);
    tiemMui1.textContent = new Intl.NumberFormat().format(data.vaccin.totalOnceInjected);
    tiemMui2.textContent = new Intl.NumberFormat().format(data.vaccin.totalTwiceInjected);
    // tiemMui3.textContent = new Intl.NumberFormat().format(data.vaccin.totalThriceInjected);

    // level2s = L.geoJSON(data.level2s, {style: {...style, color: '#41B14C'}} , { opacity: 1 }).addTo(map);
    level2s = L.geoJSON(data.level2s, {style: style} , { opacity: 1 }).addTo(map);
    // const level2s = L.geoJSON(data, { style: style }, { opacity: 1 }).addTo(map);

    const diaPhuong = data.level2s;
    const thongTinQuanHuyen = document.querySelector('#thong-tin-quan-huyen');
    let htmls = '';

    if (diaPhuong) {
        diaPhuong.forEach(qh => {
            htmls +=
                `<div class="dflex-spaceb te">
                <div>${qh.name}</div>
                <div><b>${new Intl.NumberFormat().format(qh.properties.cases)}</b></div>
            </div>`
        })
    }

    thongTinQuanHuyen.innerHTML = htmls;
}
