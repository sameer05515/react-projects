// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, selectUsername } from './common/slices/userSlice';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  const handleLogin = (username) => {
    dispatch(setUsername(username));
  };

  return (
    <div className="App">
      {username ? <Chat /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
