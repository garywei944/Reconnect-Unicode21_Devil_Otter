// Set up api routes

const summarize = require('./summarize');


module.exports = app => {
    app
        .use('/api', summarize)
};
