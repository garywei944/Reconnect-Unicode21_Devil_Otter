const Router = require('express-promise-router');
const router = new Router();
const ws = require("nodejs-websocket");


router
    //Page rendering
    .get('/', function (req, res) {
        res.render('index', {});
    })


module.exports = router;
