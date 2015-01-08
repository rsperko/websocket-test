var socket = io.connect();

function addMessage(msg, pseudo) {
  $('#chatEntries').append('<div class="message"><p>' + pseudo + ': ' + msg + '</p></div>');
}

function sendMessage() {
  var message = $('#messageInput').val();

  if(message != '') {
    socket.emit('message', message);
    $('#messageInput').val('');
  }
}

function setPseudo() {
  var pseudo = $('#pseudoInput').val();

  if(pseudo != '') {
    socket.emit('setPseudo', pseudo);

    $('#chatControls').show();
    $('#pseudoInput').hide();
    $('#pseudoSet').hide();
  }
}

socket.on('message', function(data) {
  addMessage(data.message, data.pseudo);
});

$(function() {
  $('#chatControls').hide();
  $('#pseudoSet').click(setPseudo);
  $('#submit').click(sendMessage);
});
