const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('클라이언트 연결');
  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ', msg);
  })
  socket.on('disconnect', () => {
    console.log('클라이언트 접속 해제');
  });
});

http.listen(2000, () => {
  console.log('Server Start !');
});