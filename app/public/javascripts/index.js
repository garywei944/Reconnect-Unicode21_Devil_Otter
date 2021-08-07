const ws = new WebSocket("ws://127.0.0.1:"+port);
ws.onopen = function (event) {
    ws.send("hello World");
};
ws.onmessage = function (event) {
    console.log("Received Data")
    console.log(event.data);
};
ws.onclose = function (event) {
    console.log("Closed", event);
};

// Change log, since merged with lvd
// 1. Use let instead of var
// 2. Use === instead of ==

let currentContent = "";
const data = {
    date: 0,
    content: "data",
}
let database = [];
const client = {
    state: 1,
    updatedDate: 0,
    updatedIndex: 0,
}
let clients = [];
let clientUIBlock;

function addClient() {
    clients[clients.length] = JSON.parse(JSON.stringify(client));
    let newBlock = clientUIBlock.innerHTML.replace(/XXX/g, String(clients.length));
    $("#clientList").append(newBlock);
    let $simulate = $("#simulate" + clients.length);
    $simulate.on("click", function () {
        let index = Number($(this).attr("id").substring(8));
        if ($simulate.text() === "Reconnect") {
            $simulate.removeClass("btn-outline-success");
            $simulate.addClass("btn-outline-danger");
            $simulate.html("Disconnect");
            clients[index - 1].state = 1;
        } else {
            $simulate.removeClass("btn-outline-danger");
            $simulate.addClass("btn-outline-success");
            $simulate.html("Reconnect");
            clients[index - 1].state = 0;
        }
    })
}

$(function () {
    $("#addClient").on("click", function () {
        addClient();
    })
    $("#restart").on("click", function () {
        currentContent = "";
        $("#hostText").val("");
        database.splice(0, database.length);
        for (let i = 0; i < clients.length; i = i + 1) {
            document.getElementById("client" + (i + 1)).remove()
        }
        clients.splice(0, clients.length);
    })
    clientUIBlock = document.getElementById("clientForm").cloneNode(true);
    document.getElementById("clientForm").remove()
    document.getElementById("clientList").removeAttribute("hidden");
    $("#hostText").on("input", function () {
        let value = $(this).val();
        let condition = 0;
        if (value.substring(currentContent.length).length > 1) {
            condition = 1;
        } else if (value.substring(0, currentContent.length) !== currentContent) {
            condition = 1;
        }
        if (condition) {
            $(this).val(currentContent);
        } else {
            let character = value.substring(currentContent.length);
            const newData = JSON.parse(JSON.stringify(data));
            newData.date = Date.now();
            newData.content = character;
            database[database.length] = newData;
            currentContent = value;
        }
        this.setSelectionRange(currentContent.length, currentContent.length);
    })
    update();
});

function update() {
    window.setTimeout(update, 50);
    if (database.length === 0) {
        return
    }
    for (let i = 0; i < clients.length; i = i + 1) {
        let $text = $("#clientText" + (i + 1));
        if (clients[i].state > 0) {
            if (clients[i].state === 2) {
                $("#clientLabel" + (i + 1)).html('Client ' + (i + 1) + ': <font color="green">Connected and synchronized.</font>');
            } else if (clients[i].state === 1) {
                $("#clientLabel" + (i + 1)).html('Client ' + (i + 1) + ': <font color="orange">Connected. Catching up...</font>');
            }
            if (clients[i].updatedDate < database[database.length - 1].date) {
                for (let j = clients[i].updatedIndex; j < database.length; j = j + 1) {
                    if (database[j].date > clients[i].updatedDate) {
                        $text.text($text.val() + database[j].content);
                        $text.scrollTop($text[0].scrollHeight);
                        clients[i].updatedDate = database[j].date;
                        clients[i].updatedIndex = j;
                        if (clients[i].state === 1) {
                            if (j === (database.length - 1)) {
                                clients[i].state = 2;
                            }
                            break
                        }
                    }
                }
            }
        } else {
            $("#clientLabel" + (i + 1)).html('Client ' + (i + 1) + ': <span style="color: red">Disconnected.</span>');
        }
    }
}
