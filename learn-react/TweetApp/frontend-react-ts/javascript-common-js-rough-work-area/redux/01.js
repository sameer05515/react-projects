const { createStore }= require('redux');

// Initial state
const initialState = { count: 0 };

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
        console.log('INCREMENT state by '+action.payload);
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
         console.log('DECREMENT state by '+action.payload)
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(counterReducer);

// Subscribe to state changes
store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT', payload: 2 });
store.dispatch({ type: 'DECREMENT', payload: 1 });
store.dispatch({ type: 'INCREMENT', payload: 2 });
store.dispatch({ type: 'INCREMENT', payload: 2 });
store.dispatch({ type: 'DECREMENT', payload: 1 });