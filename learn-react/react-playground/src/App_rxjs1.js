import React, { useState, useEffect } from 'react';
import { of } from 'rxjs';
import './styles.css';

const source = ['Adam', 'Brian', 'Christine'];
const names$ = of(source);

function App() {
  const [names, setNames] = useState();

  useEffect(() => {
    const subscription = names$.subscribe(setNames);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>RxJS with React</h1>
      <List items={names} />
    </div>
  );
}

const List = ({ items = [], loading = false }) => (
  <ul className={loading ? 'loading' : null}>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default App
