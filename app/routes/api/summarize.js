const Router = require('express-promise-router');
const router = new Router();
const child_process = require('child_process');

router
    .get('/:port/summarize', async function (req, res) {
        const port = req.params.port;

        console.log('Enter summarize')

        let worker = child_process.spawn('python', [appRoot + '/scripts/summarize.py']);

        // TODO: get data
        let data = 'some data';
        let output = null;

        worker.stdin.write(data);
        worker.stdin.end();

        worker.stdout.on('data', function (data) {
            output = data;
        });

        worker.on('close', function (code) {
            res.send(output);
        });
    })

module.exports = router;
