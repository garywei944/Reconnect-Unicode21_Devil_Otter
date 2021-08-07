const express = require('express');
const router = express.Router();
let ws = require("nodejs-websocket");
let net = require('net');

// Receive message and send message back
function loadMessage(conn, str) {
    conn.send(str + "获取到消息，已接收消息，已返回回答");
}

/* GET home page. */
router.get('/', function (req, res, next) {

    let port = 0
    let result = {}

    let srv = net.createServer(function (sock) {
        sock.end('Hello from server\n');
    });
    srv.listen(0, function () {
        port = srv.address().port;
        console.log('DEMO: Create port on '+port)
    });

    console.log(port)

    // Create websocket
    let server = ws
        .createServer(function (conn) {
            // 监听消息
            conn.on("text", function (str) {
                // 调用相关方法
                loadMessage(conn, str);
            });
            // Connection closed
            conn.on("close", function (code, reason) {
                console.log("Connection closed.");
            });
        })
        .listen(port);

    console.log("Connection created.");

    res.render('index', {
        "port": port
    });
});

module.exports = router;
