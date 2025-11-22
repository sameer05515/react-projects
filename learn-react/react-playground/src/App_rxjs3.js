import React, { useState, useEffect } from 'react';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import './styles.css';

const api = `http://localhost:8085/topics/find`;
const getName = user => `${user.id} : ${user.title}`;
const getnamesObservable =(page=0,size=10)=>{ 
  const names$=ajax
  .getJSON(`${api}?page=${page}&size=${size}`)
  .pipe(map((users) => users.map(getName)));
  return names$;
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
  const [names, setNames]= useState([]);
  const [pageNo,setPageNo]=useState(0);
  const nextPage=()=>{
    setPageNo(pageNo+1);    
  }

  useEffect(()=>{
    const names = useObservable(getnamesObservable());
    setNames(names);
  },[pageNo])
  //const names = useObservable(getnamesObservable());
  console.log('will reload names now');
  return (
    <div className="App">
      <h1>RxJS with React</h1>
      <button onClick={nextPage}>Next</button>
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
