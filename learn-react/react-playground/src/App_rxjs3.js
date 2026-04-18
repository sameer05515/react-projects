import React, { useState, useEffect, useMemo } from 'react';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import './styles.css';

/** Public placeholder API — no local server required. @see https://jsonplaceholder.typicode.com/ */
const PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';
const PAGE_SIZE = 10;

const getName = (post) => `${post.id} : ${post.title}`;

const getnamesObservable = (page = 0, size = PAGE_SIZE) => {
  const start = page * size;
  return ajax
    .getJSON(`${PLACEHOLDER_API}/posts?_start=${start}&_limit=${size}`)
    .pipe(map((posts) => posts.map(getName)));
};

const useObservable = observable => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => {
      console.log('Going to unsubscribe the observable.')
      sub.unsubscribe()
    };
  }, [observable]);

  return state;
};

function App() {
  const [pageNo, setPageNo] = useState(0);
  const names$ = useMemo(() => getnamesObservable(pageNo), [pageNo]);
  const names = useObservable(names$);

  const nextPage = () => {
    setPageNo((p) => p + 1);
  };

  return (
    <div className="App">
      <h1>RxJS with React</h1>
      <button type="button" onClick={nextPage}>
        Next
      </button>
      <List items={Array.isArray(names) ? names : []} />
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
