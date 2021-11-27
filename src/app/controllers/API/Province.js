const { join } = require("path");
const { readdirSync } = require("fs");
class HomeController {
    // [GET] /
    index(req, res, next) {
        const commandFiles = readdirSync(join(__dirname, "gis")).filter((file) => file.endsWith(".js"));
        console.log(commandFiles);
        let geojsonOutput = [];
        for (const file of commandFiles) {
            const command = require(join(__dirname, "gis", `${file}`));
            geojsonOutput.push(command);
        }


        res.json(geojsonOutput)
    }
}

module.exports = new HomeController;