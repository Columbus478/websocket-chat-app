var express = require('express');
var socket = require('socket.io');

//Set up App
 var app =express();
 var server = app.listen(4000,function(){
 	console.log('listening to requests on port 4000');
 });

 // Static files
 app.use(express.static('public'));

 //set up socket on the server

 var io = socket(server);

 io.on('connection',function(socket){
 	console.log('made socket connection.'+ socket.id);

// send who's typing to other sockets by broadcasting
socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
});

// the other user not typying
socket.on('Notyping',function(data){
    socket.broadcast.emit('Notyping',data);
});

// send chat data to other sockets.
 	socket.on('chat',function(data){
 		io.sockets.emit('chat',data);
 	});
 });