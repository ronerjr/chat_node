var app = require('./config/server');

var server = app.listen(80, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function(socket) {
    console.log("connected");
    socket.on('disconnect', function() {
        console.log("disconnected");
    });

    socket.on('sendToServer', function(data){
        socket.emit('msgToClient', data);
        socket.broadcast.emit('msgToClient', data);
        
        if(parseInt(data.atualizado) == 0){
            socket.emit('peopleToClient', {apelido: data.apelido});
            socket.broadcast.emit('peopleToClient', {apelido: data.apelido});
        }
    });
});