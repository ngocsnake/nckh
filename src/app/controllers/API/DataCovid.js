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
class CovidData {
    // [GET] /api/coviddata
    async index(req, res, next) {
        let covidCase = await axios.get('https://static.pipezero.com/covid/data.json');
        let Data = await axios.get('https://covidgis.herokuapp.com/api/province');
        let Vaccin = await axios.get('https://covidgis.herokuapp.com/json/Vaccin.json');

        covidCase = covidCase.data;
        Data = Data.data;
        Vaccin = Vaccin.data;

        const locations = covidCase.locations;
        const overview = covidCase.overview;
        const today = covidCase.today;
        const total = covidCase.total;

        const dataVaccin = Vaccin.List.item;
        Data.forEach(thanhpho => {
            thanhpho.properties = getInfoByCityName(locations, thanhpho.name);
            thanhpho.vaccin = getInfoVaccinByCityName(dataVaccin, thanhpho.name);
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
