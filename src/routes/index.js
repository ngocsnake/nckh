const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
const API = require('./API');

function route(app) {
    app.use('/', homeRouter);
    app.use('/news', newsRouter);
    app.use('/api', API);

}

module.exports = route;
