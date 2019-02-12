var express = require('express')
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

sockets = [];
users = [];

app.use(express.static('public'));

app.get('/', function(req, res){
    if (sockets.length < 4) {
        res.sendFile(__dirname + '/views/sugoroku.html');
    } else {
        res.sendFile(__dirname + '/views/gakuya.html');
    }
});

io.on('connection', function(socket) {
    console.log('connected');
    sockets.push(socket);
    socket.on('disconnect', function(){
        var index = sockets.indexOf(socket.id);
        sockets.splice(index, 1);
        console.log('disconnected');
    });

    socket.on('claiming', function(name) {
        var info = {
            id: socket.id,
            name: name,
            money: 10000,
            day: 1
        };
        users.push(info);
        console.log(users);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port: ' + PORT);
});