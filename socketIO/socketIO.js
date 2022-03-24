const socketio = require('socket.io');
function socketIO(server) {
    const sio = socketio(server);
    sio.on('connection', function(socket) {
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            sio.emit('chat message', msg);
        });
        socket.on("disconnect", function() {
            console.log('user disconnected');
        });

        var room = '';
        var name = '';
     
        // roomへの入室は、「socket.join(room名)」
        socket.on('client_to_server_join', function(data) {
            room = data.value;
            socket.join(room);
        });
        // S05. client_to_serverイベント・データを受信する
        socket.on('client_to_server', function(data) {
            // S06. server_to_clientイベント・データを送信する
            sio.to(room).emit('server_to_client', {value : data.value});
        });
        // S07. client_to_server_broadcastイベント・データを受信し、送信元以外に送信する
        socket.on('client_to_server_broadcast', function(data) {
            sio.to(room).emit('server_to_client', {value : data.value});
        });
        // S08. client_to_server_personalイベント・データを受信し、送信元のみに送信する
        socket.on('client_to_server_personal', function(data) {
            var id = socket.id;
            name = data.value;
            var personalMessage = "あなたは、" + name + "さんとして入室しました。"
            socket.to(id).emit('server_to_client', {value : personalMessage});
        });
        // S09. dicconnectイベントを受信し、退出メッセージを送信する
        socket.on('disconnect', function() {
            if (name == '') {
                console.log("未入室のまま、どこかへ去っていきました。");
            } else {
                var endMessage = name + "さんが退出しました。"
                socket.to(room).emit('server_to_client', {value : endMessage});
            }
        });
    });

};
module.exports = socketIO;