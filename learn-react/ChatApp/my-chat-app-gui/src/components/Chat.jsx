// src/Chat.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../common/slices/userSlice';

const Chat = () => {
  const username = useSelector(selectUsername);
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ type: 'getLoggedInUsers' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'loggedInUsers') {
        setLoggedInUsers(data.users);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h3>Logged-in Users:</h3>
      <ul>
        {loggedInUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
