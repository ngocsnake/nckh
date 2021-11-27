const homeRouter = require('./HomeRouter');
const API = require('./API');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api', API);

}

module.exports = route;