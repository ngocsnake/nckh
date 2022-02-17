const { join } = require("path");
const { readdirSync } = require("fs");
class ProvinceController {
    // [GET] /api/province
    index(req, res, next) {
        const commandFiles = readdirSync(join(__dirname, "gis")).filter((file) => file.endsWith(".js"));
        let geojsonOutput = [];
        for (const file of commandFiles) {
            const command = require(join(__dirname, "gis", `${file}`));
            geojsonOutput.push(command);
        }
        res.json(geojsonOutput)
    }
}

module.exports = new ProvinceController;
