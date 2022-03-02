class ChartController {
    // [GET] /chart
    index(req, res, next) {
        res.render('chart');
    }
}

module.exports = new ChartController;
