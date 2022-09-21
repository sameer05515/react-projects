import React, { useReducer, useState, useEffect } from 'react';
import { BehaviorSubject, of, merge } from 'rxjs';
import { /**debounceTime,*/ map, /**distinctUntilChanged, filter,*/ switchMap, catchError } from 'rxjs/operators';

function BehaviorSubjectTest() {
    const initialAction = { page: 0, size: 10 };
    const actionReducer = (state, action) => {
        switch (action) {
            case 'pageIncrement':
                return { ...state, page: state.page + 1 };
            case 'pageDecrease':
                return { ...state, page: state.page - 1 };
            case 'sizeIncrement':
                return { ...state, size: state.size + 1 };
            case 'sizeDecrease':
                return { ...state, size: state.size - 1 };
            default:
                return initialAction;
        }
    }
    const [currentAction, dispatchAction] = useReducer(actionReducer, initialAction);
    const [subject, setSubject] = useState(null);

    // const subject = new BehaviorSubject(currentAction);
    // subject.subscribe(console.log);

    useEffect(() => {
        console.log('Next value mila!!');
        if(subject === null) {
          const sub = new BehaviorSubject(initialAction);
          setSubject(sub);
        } else {
          const observable = subject.pipe(
            // map(s => s.trim()),
            // distinctUntilChanged(),
            // filter(s => s.length >= 2),
            // debounceTime(2000),
            switchMap(({page, size}) =>
              merge(
                of({loading: true, errorMessage: '', noResults: false}),
                fetch(`http://localhost:8081/RestServices/rest/topics/find?page=${page}&size=${size}`).then(response => {
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
                      errorMessage: data.message
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

    const [state, setState] = useState({
        data: [],
        loading: false,
        errorMessage: '',
        noResults: false
      });

      const onButtonAction=(event, action)=>{
        dispatchAction(action);
        if(subject) {
            console.log(`Next value '${currentAction.page}'  Bhej diye!!`);
            return subject.next(currentAction);
          }

      }
    
      
    return (

        <div>
            {JSON.stringify(currentAction)}
            <button onClick={(e)=>onButtonAction(e,'pageIncrement')}>pageIncrement</button> |
            <button onClick={(e)=>onButtonAction(e,'pageDecrease')}>pageDecrease</button> |
            <button onClick={(e)=>onButtonAction(e,'sizeIncrement')}>sizeIncrement</button> |
            <button onClick={(e)=>onButtonAction(e,'sizeDecrease')}>sizeDecrease</button>
        </div>
    )
}

export default BehaviorSubjectTest