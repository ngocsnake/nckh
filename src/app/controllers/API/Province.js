const { join } = require("path");
const { readdirSync } = require("fs");
const path = "F:/NCKH_CovidVN/src/resources/gis";
class HomeController {
    // [GET] /
    index(req, res, next) {
        const commandFiles = readdirSync(path).filter((file) => file.endsWith(".js"));
        let geojsonOutput = [];
        for (const file of commandFiles) {
            const command = require(join(path, `${file}`));
            geojsonOutput.push(command);
        }
        

        res.json(geojsonOutput)
    }
}

module.exports = new HomeController;