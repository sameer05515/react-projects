// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const loggedInUsers = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'login') {
      const { username } = data;
      loggedInUsers.push(username);
      console.log(`${username} logged in.`);
    } else if (data.type === 'getLoggedInUsers') {
      ws.send(JSON.stringify({ type: 'loggedInUsers', users: loggedInUsers }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.use(express.json());

app.post('/login', (req, res) => {
  const { username } = req.body;
  loggedInUsers.push(username);
  res.status(200).json({ message: 'Login successful' });
});

app.get('/logged-in-users', (req, res) => {
  res.status(200).json(loggedInUsers);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
