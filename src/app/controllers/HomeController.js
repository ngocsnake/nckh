class HomeController {
    // [GET] /
    index(req, res, next) {
        res.render('homepage')
    }
}

module.exports = new HomeController;
