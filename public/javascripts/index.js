const ws = new WebSocket("ws://127.0.0.1:8001");
ws.onopen = function (event) {
    ws.send("hello World");
};
ws.onmessage = function (event) {
    console.log("Received Data")
    console.log(event.data); // 接收信息
};
ws.onclose = function (event) {
    console.log("Closed", event); //关闭
};

$(function () {
    console.log('Success');
});
