const ws = new WebSocket("ws://127.0.0.1:8001");
ws.onopen = function (data) {
    ws.send("hello World");
};
ws.onmessage = function (data) {
    console.log("Received Data")
    console.log(data.data); // 接收信息
};
ws.onclose = function (data) {
    console.log("关闭", data); //关闭
};

$(function () {
    console.log('Success');
});
