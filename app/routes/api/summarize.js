const Router = require('express-promise-router');
const router = new Router();
const child_process = require('child_process');

router
    .post('/summarize', async function (req, res) {
        console.log('Enter summarize')

        const data = req.body.data;
        const worker = child_process.spawn('python', [appRoot + '/scripts/summarize.py']);
        let output = null;

        worker.stdin.write(data);
        worker.stdin.end();

        worker.stdout.on('data', function (data) {
            output = data;
        });

        worker.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        worker.on('close', function (code) {
            res.send(output);
        });
    })

module.exports = router;
