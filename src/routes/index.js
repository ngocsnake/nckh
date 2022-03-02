const HomeRouter = require('./HomeRouter');
const NewsRouter = require('./NewsRouter');
const ChartRouter = require('./ChartRouter');
const API = require('./API');

function route(app) {
    app.use('/', HomeRouter);
    app.use('/news', NewsRouter);
    app.use('/chart', ChartRouter);
    app.use('/api', API);

}

module.exports = route;
