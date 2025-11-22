import React, { useState, useEffect } from 'react';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import './styles.css';

const api = `https://randomuser.me/api/?results=5&seed=rx-react&nat=us&inc=name&noinfo`;
const getName = user => `${user.name.first} ${user.name.last}`;
const names$ = ajax
  .getJSON(api)
  .pipe(map(({ results: users }) => users.map(getName)));

const useObservable = observable => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

function App() {
  const names = useObservable(names$);

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
