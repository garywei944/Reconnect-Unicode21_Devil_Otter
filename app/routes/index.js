const express = require('express');
const router = express.Router();
let ws = require("nodejs-websocket");

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

router.get('/', function (req, res, next) {
    let port = requestNewPort();

    res.render('index', {
        port: port
    });
});

module.exports = router;
