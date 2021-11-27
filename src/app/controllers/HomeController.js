class HomeController {
    // [GET] /
    index(req, res, next) {
        res.render('homepage', { layout: false })
    }
}

module.exports = new HomeController;