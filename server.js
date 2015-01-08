
var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  jade = require('jade'),
  socketData = {};

function setData(socket, key, value) {
  var data = socketData[socket.id];
  if(! data) {
    data = {};
    socketData[socket.id] = data;
  }

  data[key] = value;
}

function getData(socket, key) {
  var data = socketData[socket.id];
  if(! data) {
    data = {};
    socketData[socket.id] = data;
  }

  return data[key];
}

app.set('views', __dirname + '/views');
app.set('view.engine', 'jade');
app.set('view.options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home.jade');
});
var server = app.listen(3000),
  io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
  socket.on('setPseudo', function(data) {
    setData(socket, 'pseudo', data);
  });

  socket.on('message', function(message) {
    var pseudo = getData(socket, 'pseudo'),
      data = { 'message': message, pseudo: pseudo };
    io.sockets.emit('message', data);
    console.log('user ' + pseudo + ' sned this: ' + message);
  });
});


