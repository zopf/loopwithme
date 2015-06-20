var WebSocketServer = require('websocket').server;
var http = require('http');
var _ = require('underscore');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

var port = 5000;
server.listen(port, function() { 
  console.log((new Date()) + ' Server is listening on port ' + port);
});

// create a global event emitter
var EventEmitter = require('events').EventEmitter;
var event_server = new EventEmitter();

// create the server
wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var boardState = {
  "rows": 3,
  "cols": 3,
  "loop_length": 16,
  "cards": [

  ]
};

function initializeBoardState() {
  for(var row=0; row < boardState.rows; row++) {
    for(var col=0; col < boardState.cols; col++) {
      boardState.cards.push(
        {
          "row": row,
          "col": col,
          "loop": Array.apply(null, 
              Array( boardState.loop_length )
            ).map( Number.prototype.valueOf, 0 )
        }
      );
    }
  }
}
initializeBoardState();

function getBoardState() {
  return boardState;
}

function updateCard(row, col, loop) {
  var card = _.where(boardState.cards, {"row":row, "col":col})[0];
  card.loop = loop;
  console.log((new Date()) + ' Card (' + row + ',' + col + ') updated.');
  event_server.emit('card_update', {
    action: 'card_update',
    row: card.row,
    col: card.col,
    loop: card.loop
  });
  console.log((new Date()) + ' Update for card (' + row + ',' + col + ') pushed to clients.');
}

function routeIncomingMessage(obj) {
  if(obj.action=='card_update') {
    updateCard(obj.row, obj.col, obj.loop);
  }
}

// WebSocket server
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.sendUTF(JSON.stringify(getBoardState()));
    console.log((new Date()) + ' Initial board state sent.');

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            try {
              var obj = JSON.parse(message.utf8Data);
              // route message according to action
              routeIncomingMessage(obj);
            } catch(e) {
              console.log('oops, error: '+e);
            }
        }
    });

    event_server.on('card_update', function(updated_card) {
      connection.sendUTF(JSON.stringify(updated_card));
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});