# React Learning

## 1. Current Reading
Section 10: Chapter 128

## 2. Learn React
- Learn next-gen javascript
  - Particularly important in this course are:
    - Array methods
      - map()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      - find()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      - findIndex()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
      - filter()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      - reduce()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
      - concat()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
      - slice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      - splice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    - **Object destructuring**
      - Alias assignment
      - ```
        const obj = { a: 1, b: 2 };
        const { a, b } = obj;
        // is equivalent to:
        // const a = obj.a;
        // const b = obj.b;
        ```
      - A property can be unpacked from an object and assigned to a variable with a different name than the object property.
      - ```
        const o = { p: 42, q: true };
        const { p: foo, q: bar } = o;
        
        console.log(foo); // 42
        console.log(bar); // true
        ```
      - Here, for example, ```const { p: foo } = o``` takes from the object ```o``` the property named ```p``` and assigns it to a local variable named ```foo```.
    - **Array destructuring**
      - Read more for Destructuring at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- Source code from Acedemind is https://github.com/academind/react-complete-guide-code

## 3. What is React
- React is a JavaScript library for building user interfaces.
- React is all about Components
- React allows you to create re-usable and **reactive components** consisting of HTML and JavaScript (and CSS).
- React uses **declarative approach** to create components.
- Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
  - Basic Hooks
    - useState
    - useEffect
    - useContext
  - Additional Hooks
    - useReducer
    - useCallback
    - useMemo
    - useRef
    - useImperativeHandle
    - useLayoutEffect
    - useDebugValue
    - useDeferredValue
    - useTransition
    - useId
  - Library Hooks
    - useSyncExternalStore
    - useInsertionEffect

### 3.1. Components
- It is reusable 
- Components built up with HTML+ CSS+ JavaScript 
- A Component in react is just a JavaScript function.
- Always start component names with a capital letter.
  - React treats components starting with lowercase letters as DOM tags. For example, ```<div />``` represents an HTML div tag, but ```<Welcome />``` represents a component and requires Welcome to be in scope.
- The cause of the "JSX expressions must have one parent element" error is that it's invalid syntax to return multiple values from a function. React components are just functions, so when we return multiple elements at the same level, we are effectively using multiple return statements at the same level of a function.
- code for Component module https://github.com/academind/react-complete-guide-code/tree/03-react-basics-working-with-components

### 3.2. create-react-app tool
- **create-react-app** tool we used to create new react-project.
- Details for this tool could be found on https://reactjs.org/docs/create-a-new-react-app.html
- GitHub repo https://github.com/facebook/create-react-app
- ``` 
  npx create-react-app my-app
  cd my-app
  npm start 
  ```
### 3.3. How to specify a port to run a create-react-app based project?
If you don't want to set the environment variable, another option is to modify the scripts part of package.json from:

```"start": "react-scripts start"```

to

Linux (tested on Ubuntu 14.04/16.04) and MacOS (tested by aswin-s on MacOS Sierra 10.12.4):

```"start": "PORT=3006 react-scripts start"```

or (may be) more general solution by IsaacPak

```"start": "export PORT=3006 react-scripts start"```

Windows JacobEnsor's solution

```"start": "set PORT=3006 && react-scripts start"```


### 3.4 States and Events
- **To make application reactive** for various events and dynamic data
- **useState** hook
- State really is separated on a per-instance basis
- **props** to listen events of HTMLElement : **onChange, onClick, on(EventName)**
- 2 way binding using **value** attribute
- child to parent communication using **events**
- parent to child communication using **props**
- Lifting the state up
- Controlled vs Uncontrolled components & Stateless vs Stateful components
  - Read more at:- https://daveceddia.com/react-forms/

### 3.5 Rendering Lists & Conditional Content
- **array map** method mainly used to render list of items
- we can store JSX elements in variable too
- **ternary operator** should be used to render conditional content
- JSX return code should be kept as leaner as possible
- **One little hack** (Shortcut to render Conditional Content)
  - ```{condition && <JSX_custom_component/>}``` 
  - If first condition is true, then here custom component will render.


### 3.6 Styling React Components
- Make your apps look good
- **styled-components** package
- 

### 3.7 Debugging React Apps
- Errors come while development, try to solve it by your own first.
  - Have a look at line number and file name i error message
  - Use breakpoints to identify logical errors
  - React DevTools
  

### 3.8 Time to Practice: A Complete Practice Project
- One project to build for practice
- Project uses all basic concepts. https://github.com/academind/react-complete-guide-code/tree/08-practice-project

### 3.9 Diving Deeper: Working with Fragments, Portals & "Refs"
- React can return only one single element
  - one solution: wrap all element in ```<div>```
  - ```<div>``` soup
  - Wrapper Component
  - React.Fragment
- React Portals
  - Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
    - ```ReactDOM.createPortal(child, container)```
    - The first argument (child) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.
  - A typical use case for portals is when a parent component has an overflow: hidden or z-index style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.
  - **Note:-** 
    - When working with portals, remember that managing keyboard focus becomes very important. 
    - For modal dialogs, ensure that everyone can interact with them by following the **WAI-ARIA Modal Authoring Practices**.
      - WAI-ARIA Authoring Practices is a guide for understanding how to use WAI-ARIA 1.1 to create an accessible Rich Internet Application. It provides guidance on the appropriate application of WAI-ARIA , describes recommended WAI-ARIA usage patterns, and explains concepts behind them.
      - Documentation for **WAI-ARIA Authoring Practices**:- https://www.w3.org/TR/2018/NOTE-wai-aria-practices-1.1-20180726/
- **Refs** (references)
  - **useRef** hook, it only available in functional components
  - refs have native DOM access
  - Controlled vs Uncontrolled Components
  
### 3.10 Advanced: Handling Side Effects, Using Reducers & Using the Context API
- **Main Job of React Library:** Render UI and react to User Input
  - Evaluate & Render JSX
  - Manage state and props
  - React to (User) events and input
  - Re-evaluate Component upon State & Prop changes
- **Side Effects or Effects** is anything else above
  - Store data in Browser Storage
  - Send Http requests to Backend servers
  - Set and Manage Timers
- Handling Side Effects with the **useEffect()** hook
  - Details for useEffect() hook:- https://reactjs.org/docs/hooks-effect.html
  - useEffect is most used hook in react 
- **useReducer()** hook for State Management
  - An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method. (If you’re familiar with Redux, you already know how this works.)
  - useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
  - Details for useReducer() hook:- https://reactjs.org/docs/hooks-reference.html#usereducer
  - Example for useReducer
    - ```const [state, dispatchFn]= useReducer(reducerFn, initialState, initFn);```
  - useReducer vs useSate
    - useState is a basic Hook for managing simple state transformation, and useReducer is an additional Hook for managing more complex state logic. However, it's worth noting that useState uses useReducer internally, implying that you could use useReducer for everything you can do with useState .
    - below is rule of thumb of when to use what would be:
      - if state updates independently - separate useStates
      - for state that updates together, or only one field at a time updates - a single useState object
      - for state where user interactions update different parts of the state - useReducer
    - Read more on https://tkdodo.eu/blog/use-state-vs-use-reducer
- **React context**
  - Context API
  - React’s useContext hook makes it easy to pass data throughout your app without manually passing props down the tree.
  - React Context is not optimized for high frequency changes.
    - Redux is better tool for this purpose.
  - Read more at:- https://daveceddia.com/usecontext-hook/
- **Rules of Hooks**
  - Only call React Hooks in React functions (React component functions and custom react hooks )
  - Only call React hooks at the top level
    - Don't call them in nested function
    - Don't call them in any block statements
  - third unofficial rule for **useEffect**:- Always add everything you refer to inside useEffect() as a dependency
- **useImperativeHandle()** hook
  - useImperativeHandle customizes the instance value that is exposed to parent components when using ref. As always, imperative code using refs should be avoided in most cases. useImperativeHandle should be used with forwardRef
  - ```
    function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
    focus: () => {
    inputRef.current.focus();
    }
    }));
    return <input ref={inputRef} ... />;
    }
    FancyInput = forwardRef(FancyInput);
    ```
  - Read more at https://reactjs.org/docs/hooks-reference.html#useimperativehandle

### 3.11: Practice Project: Building a Food Order App
- practical for concepts learnt so far






------------------
------------------
## Additional notes
### How To Call Web APIs with the useEffect Hook in React
https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react

### How to Use Bootstrap with React?
https://www.geeksforgeeks.org/how-to-use-bootstrap-with-react/

### React Router
- https://v5.reactrouter.com/web/guides/quick-start
- https://www.educative.io/blog/react-router-tutorial

### How to get multiple checkbox values in React.js ?
https://www.geeksforgeeks.org/how-to-get-multiple-checkbox-values-in-react-js/

### How to Send GET and POST Requests with JavaScript Fetch API
https://medium.com/meta-box/how-to-send-get-and-post-requests-with-javascript-fetch-api-d0685b7ee6ed

### How to manage API calls in React 
https://dev.to/adyasha8105/how-to-manage-api-calls-in-react-11a8

### Differences between Functional Components and Class Components in React
https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/

