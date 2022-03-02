const { join } = require("path");
const { readdirSync } = require("fs");
class ProvinceController {
    // [GET] /api/province
    index(req, res, next) {
        const geojsonFiles = readdirSync(join(__dirname, "gis")).filter((file) => file.endsWith(".js"));
        const geojsonOutput = [];
        for (const file of geojsonFiles) {
            const geojson = require(join(__dirname, "gis", `${file}`));
            geojsonOutput.push(geojson);
        }
        res.json(geojsonOutput)
    }
}

module.exports = new ProvinceController;
