var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	socket.on('message', function(msg){
		if (msg && msg.message)
			io.emit('message', msg);
	});
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});
