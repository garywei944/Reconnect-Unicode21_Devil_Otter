const routes = require('./routes');

const mountAPI = require('./api');

module.exports = app => {
    mountAPI(app);

    app.use('/', routes)
}
