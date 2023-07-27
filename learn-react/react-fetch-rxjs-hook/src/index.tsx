import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { getUsers, useObservable } from './lib'
import './style.css';



const Users: React.FC = () => {
  const [error, users] = useObservable(getUsers())
  if (!users) {
    return <p>Starting request ...</p>
  }
  if (error) {
    return <p>There has been an error: {error.message}</p>
  }
  return <p>Received {(users as any[]).length} users</p>
}

render(<Users />, document.getElementById('root'));
