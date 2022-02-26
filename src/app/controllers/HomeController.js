class HomeController {
    // [GET] /
    index(req, res, next) {
        res.render('homepage')
    }

    test(req, res, next){
        res.status(400).send("OK");
    }
}

module.exports = new HomeController;
