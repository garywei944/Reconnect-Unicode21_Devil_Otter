const routes = require('./routes');

const mountAPI = require('./api');

function requestNewPort() {
    const server = ws.createServer(function (conn) {
        console.log("New connection");

        conn.on("text", function (str) {
            // TODO: do something.
            console.log("Received " + str)
            conn.sendText(str.toUpperCase() + "!!!")
        });
        conn.on("close", function (code, reason) {
            console.log("Connection closed");
            server.close();
        });
    }).listen(0);

    return server.socket.address().port;
}


module.exports = app => {
    mountAPI(app);

    app.use('/', routes)
}
