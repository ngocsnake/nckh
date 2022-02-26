const { join } = require("path");
const { readdirSync } = require("fs");
class ProvinceController {
    // [GET] /api/province
    index(req, res, next) {
        const geojsonFiles = readdirSync(join(__dirname, "gis")).filter((file) => file.endsWith(".js"));
        const geojsonOutput = [];
        for (const file of geojsonFiles) {
            const geojson = require(join(__dirname, "gis", `${file}`));

            // if (geojson.level2s)
            //     geojson.level2s = geojson.level2s.map(qh => ({ ...qh, coordinates: 1 }));

            geojsonOutput.push(geojson);
        }
        res.json(geojsonOutput)
    }
}

module.exports = new ProvinceController;
