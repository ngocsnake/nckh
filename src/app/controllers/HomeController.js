const { join } = require("path");
const { readdirSync } = require("fs");
const path = "F:/NCKH_CovidVN/src/resources/gis";
class HomeController {
    // [GET] /
    index(req, res, next) {
        res.render('homepage',{layout: false})
    }
}

module.exports = new HomeController;