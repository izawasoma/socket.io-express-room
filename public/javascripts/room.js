var socket = io.connect(); // C02. ソケットへの接続
var isEnter = false;
var userName = '';

// C04. server_to_clientイベント・データを受信する
socket.on("server_to_client", function(data){appendMsg(data.value)});
function appendMsg(text) {
    $("#chatLogs").append("<div>" + text + "</div>");
}

$("#sendButton").click(function(e) {
    var message = $("#msgForm").val();
    var selectRoom = $("#rooms").val();
    $("#msgForm").val('');
    if (isEnter) {
      message = "[" + userName + "]: " + message;
        // C03. client_to_serverイベント・データを送信する
        socket.emit("client_to_server", {value : message});
    } else {
        userName = message;
        var entryMessage = userName + "さんが入室しました。";
        socket.emit("client_to_server_join", {value : selectRoom});
        // C05. client_to_server_broadcastイベント・データを送信する
        socket.emit("client_to_server_broadcast", {value : entryMessage});
        // C06. client_to_server_personalイベント・データを送信する
        socket.emit("client_to_server_personal", {value : userName});
        changeLabel();
    }
    e.preventDefault();
});

function changeLabel() {
    $(".nameLabel").text("メッセージ：");
    $("#rooms").prop("disabled", true);
    $("button").text("送信");
    isEnter = true;
}