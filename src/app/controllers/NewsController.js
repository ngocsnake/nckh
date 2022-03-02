class NewsController {
    // [GET] /news
    index(req, res, next) {
        res.render('news');
    }
}

module.exports = new NewsController;
