const axios = require('axios');

function getInfoByCityName(locations, tenThanhPho) {
    return locations.find(thanhPho => {
        return thanhPho.name == tenThanhPho;
    });
}

function getInfoVaccinByCityName(VaccinData, tenThanhPho) {
    if (tenThanhPho == "Hòa Bình")
        tenThanhPho = "Hoà Bình";
    if (tenThanhPho == "TP. Hồ Chí Minh")
        tenThanhPho = "Hồ Chí Minh";
    return VaccinData.find(thanhPho => {
        return thanhPho.provinceName == tenThanhPho;
    });
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
class CovidData {
    // [GET] /api/coviddata
    async index(req, res, next) {
        const baseURL = req.protocol + "://" + req.get('host')
        console.log(baseURL);
        let covidCase = await axios.get('https://static.pipezero.com/covid/data.json');

        let Data = await axios.get(baseURL + '/api/province');
        let Vaccin = await axios.get(baseURL + '/json/Vaccin.json');

        covidCase = covidCase.data;
        Data = Data.data;
        Vaccin = Vaccin.data;

        const locations = covidCase.locations;
        const overview = covidCase.overview;
        const today = covidCase.today;
        const total = covidCase.total;

        const dataVaccin = Vaccin.List.item;
        Data.forEach(thanhpho => {
            const thongTinThanhPho = getInfoByCityName(locations, thanhpho.name);
            thanhpho.properties = thongTinThanhPho;
            thanhpho.vaccin = getInfoVaccinByCityName(dataVaccin, thanhpho.name);


            const caNhiemThanhPho = thongTinThanhPho.cases;
            const cacQuanHuyen = thanhpho.level2s;

            if (cacQuanHuyen) {
                const trungBinh = Math.round(caNhiemThanhPho / cacQuanHuyen.length);
                cacQuanHuyen.forEach(quanHuyen => {
                    quanHuyen.properties = { cases: randomIntFromInterval(trungBinh / 2, trungBinh * 1.5) };
                })
            }
        });

        const DataOutput = {
            locations: Data,
            overview,
            today,
            total
        }
        res.json(DataOutput)
    }
}

module.exports = new CovidData;
