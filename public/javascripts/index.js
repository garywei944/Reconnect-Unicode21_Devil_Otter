// const ws = new WebSocket("ws://127.0.0.1:" + port);
// ws.onopen = function (event) {
//     ws.send("hello World");
// };
// ws.onmessage = function (event) {
//     console.log("Received Data")
//     console.log(event.data);
// };
// ws.onclose = function (event) {
//     console.log("Closed", event);
// };

function initClientBtn(i) {
    let $clientBtn = $("#clientBtn" + i);
    $clientBtn.on("click", function () {
        if ($clientBtn.text() === "Connected") {
            $clientBtn.removeClass("btn-outline-success");
            $clientBtn.addClass("btn-outline-danger");
            $clientBtn.html("Disconnected");
        } else {
            $clientBtn.removeClass("btn-outline-danger");
            $clientBtn.addClass("btn-outline-success");
            $clientBtn.html("Connected");
        }
    })
}

$(function () {
    console.log('Success');

    for (let i = 1; i <= 2; i++) {
        initClientBtn(i);
    }

    $("clientForm2").clone()

});
