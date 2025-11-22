import React, { useReducer } from 'react'
import './App.css'
import CounterOne from './components/reducer-hook-ex/CounterOne'
import CounterTwo from './components/reducer-hook-ex/CounterTwo'
import CounterThree from './components/reducer-hook-ex/CounterThree'
import ComponentA from './components/reducer-hook-ex/ComponentA'
import ComponentB from './components/reducer-hook-ex/ComponentB'
import ComponentC from './components/reducer-hook-ex/ComponentC'
import DataFetchingOne from './components/reducer-hook-ex/DataFetchingOne'
import DataFetchingTwo from './components/reducer-hook-ex/DataFetchingTwo'
import Add from './components/usestate-ex/Add'

const initialState = 0
const reducer = (state, action) => {
	switch (action) {
		case 'increment':
			return state + 1
		case 'decrement':
			return state - 1
		case 'reset':
			return initialState
		default:
			return state
	}
}

export const CountContext = React.createContext()

function App() {
	const [count, dispatch] = useReducer(reducer, initialState)
	return (
		<CountContext.Provider
			value={{ countState: count, countDispatch: dispatch }}
		>
			<div className="App">
				{/* <CounterOne /> */}
				{/* <CounterTwo /> */}
				{/* <CounterThree /> */}
				{/* {count} */}
				{/* <ComponentA /> */}
				{/* <ComponentB /> */}
				{/* <ComponentC /> */}
				{/* <DataFetchingOne /> */}
				{/* <DataFetchingTwo /> */}

				<Add/>
			</div>
		</CountContext.Provider>
	)
}

export default App
