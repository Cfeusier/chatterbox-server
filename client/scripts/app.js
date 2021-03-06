var app = {};

(function() {
  if (!/(&|\?)username=/.test(window.location.search)) {
    var newSearch = window.location.search;
    if (newSearch !== '' & newSearch !== '?') { newSearch += '&'; }
    newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
    window.location.search = newSearch;
  }
})();

var query = window.location.search;
app.username = _.escape(query.substring(query.indexOf('=') + 1, query.length));
app.userFriends = [];
app.rooms = ['All Rooms'];
app.currentRoom = app.currentRoom || 'All Rooms';
app.server = 'https://chitchatroom.herokuapp.com/classes/chatterbox';

app.init = function() {
  app.bindEvents();
  $.when(app.onLoad()).done(app.runLoop());
};

app.onLoad = function() {
  app.fetch(function(data) {
    app.addMessages(data);
    app.loadRooms(data);
  });
};

app.runLoop = function() {
  setInterval(function() {
    app.fetch(function(data) {
      app.clearMessages();
      app.addMessages(data, app.currentRoom);
    });
  }, 1000);
};

app.send = function(message) {
  var cleanMessage = app.cleanMessage(message);
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(cleanMessage),
    contentType: 'application/json',
    success: app.logResponse,
    error: app.logResponse
  });
};

app.fetch = function(callback) {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: callback,
    error: app.logResponse
  });
}

app.addMessages = function(data, roomFilter) {
  if (!roomFilter || app.currentRoom === 'All Rooms') {
    _.each(data.results, function(message) {
      app.addMessage(message);
      app.checkRoom(message['roomname']);
    });
  } else {
    var filtered = _.filter(data.results, function(message) {
      return message["roomname"] === roomFilter;
    });
    _.each(filtered, function(message) {
      app.addMessage(message);
      app.checkRoom(message['roomname']);
    });
  }
};

app.clearMessages = function() { $("#chats").children().remove(); };

app.addMessage = function(message) {
  var temp = _.template("<div class='chat'><span class='username'><%- username %>: </span><span class='message'><%- chatMessage %></span></div>");
  var messageToAdd = temp({ username: message['username'], chatMessage: message.text });
  $("#chats").prepend(messageToAdd);
};

app.handleSubmit = function(e) {
  e.preventDefault();
  var messageText = $("#send input").val();
  app.addMessage({ username: app.username, text: messageText });
  app.send({ username: app.username, text: messageText, roomname: app.currentRoom });
  $("#send input#message-value").val("");
};

app.cleanMessage = function(message) {
  message['username'] = app.username;
  message['text'] = _.escape(message.text);
  message['roomname'] = _.escape(message.roomname);
  return message;
};

app.addFriend = function(e) {
  e.preventDefault();
  var friendUsername = e.target.innerText.substring(0, e.target.innerText.length - 2);
  if (app.userFriends.indexOf(friendUsername) === -1) {
    app.userFriends.push(friendUsername);
    var user = $('.username').end().find("span.username:contains('" + friendUsername + "')");
    var siblings = user.siblings();
    user.css('font-style', 'italic');
    siblings.css('font-style', 'italic');
  }
};
app.checkRoom = function(roomname) {
  if (app.rooms.indexOf(roomname) === -1) {
    app.rooms.push(roomname);
    return true;
  }
};

app.newRoom = function(e) {
  e.preventDefault();
  var roomname = $("#new-room input").val();
  var roomToAdd = app.checkRoom(roomname);
  if (roomToAdd) {
    var oldRoom = app.currentRoom;
    app.currentRoom = roomname;
    app.addRoom(roomname, oldRoom);
  }
  $("#new-room input#room-value").val("");
};

app.addRoom = function(roomname, oldRoom) {
  var temp = _.template("<li> <a href='#' class='room'> <%- roomname %> </a> </li>");
  var roomToAdd = temp({ roomname: roomname });
  $("#roomSelect").append(roomToAdd);
  app.toggleCurrentRoom(oldRoom);
};

app.handleRoomFilter = function(e) {
  var roomname = e.target.innerText;
  app.filterRoomMessages(roomname);
};

app.filterRoomMessages = function(roomname) {
  app.clearMessages();
  var oldRoom = app.currentRoom;
  app.currentRoom = roomname;
  app.fetch(function(data) { app.addMessages(data, app.currentRoom); });
  app.toggleCurrentRoom(oldRoom);
};

app.loadMessages = function(e){
  e.preventDefault();
  app.clearMessages();
  app.fetch(function(data) { app.addMessages(data, app.currentRoom); });
};

app.toggleCurrentRoom = function(oldRoom) {
  $('.room').filter(function() {
    return $.trim($(this).text()) === oldRoom;
  }).css('color', '-webkit-link');
  $('.room').filter(function() {
    return $.trim($(this).text()) === app.currentRoom;
  }).css('color', 'red');
};

app.loadRooms = function(data) {
  _.each(app.rooms, function(roomname) { if (roomname) { app.addRoom(roomname); } });
};

app.logResponse = function(data) { console.log(data); };

app.bindEvents = function() {
  $(document).on('submit', '#send', app.handleSubmit);
  $(document).on('click', '.username', app.addFriend);
  $(document).on("submit", "#new-room", app.newRoom);
  $(document).on("click", ".room", app.handleRoomFilter);
  // $(document).on("click", "#load-messages", app.loadMessages);
};

$(function() { app.init(); });
