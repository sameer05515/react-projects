import React, { useState, useEffect } from 'react';
import { BehaviorSubject, of, merge } from 'rxjs';
import { debounceTime, map, /**distinctUntilChanged, filter,*/ switchMap, catchError } from 'rxjs/operators';
import Input from './Input.js';
import Results from './Results.js';

function Container() {
  const [state, setState] = useState({
    data: [],
    loading: false,
    errorMessage: '',
    noResults: false
  });

  const [subject, setSubject] = useState(null);

  const [pageNo,setPageNo]=useState(0);
  const nextPage=(incr=1)=>{
    setPageNo(p=>{return p+incr;});  
    if(subject) {
      console.log(`Next value '${pageNo}'  Bhej diye!!`);
      return subject.next(pageNo+'');
    }

  };
  //const api = `http://localhost:8085/topics/find`;

  useEffect(() => {
    console.log('Next value mila!!');
    if(subject === null) {
      const sub = new BehaviorSubject('');
      setSubject(sub);
    } else {
      const observable = subject.pipe(
        map(s => s.trim()),
        // distinctUntilChanged(),
        // filter(s => s.length >= 2),
        // debounceTime(2000),
        switchMap(page =>
          merge(
            of({loading: true, errorMessage: '', noResults: false}),
            fetch(`http://localhost:8085/topics/find?page=${page}&size=10`).then(response => {
              if(response.ok) {
                return response
                  .json()
                  .then(data => ({data, loading: false, noResults: data.length === 0}));
              }
              return response
                .json()
                .then(data => ({
                  data: [],
                  loading: false,
                  errorMessage: data.title
                }));
            })
          )
        ),
        catchError(e => ({
          loading: false,
          errorMessage: 'An application error occured'
        }))
      ).subscribe( newState => {
        setState(s => Object.assign({}, s, newState));
      });

      return () => {
        observable.unsubscribe()
        subject.unsubscribe();
      }
    }
  }, [subject]);

  // const onChange = e => {
  //   if(subject) {
  //     return subject.next(e.target.value);
  //   }
  // };

  

  return (
    <div className="container">
      <Input loading={state.loading} />

      {(!state.noResults) && (<button onClick={()=>nextPage(1)}>Next</button>)}
      {(pageNo>=0)&&(<button onClick={()=>nextPage(-1)}>Previous</button>)}
      <Results data={state.data} errorMessage={state.errorMessage} noResults={state.noResults} />
    </div>
  );
}

export default Container;
