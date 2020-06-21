import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

import topicMgmtInstance from './axios';
import Views from './Views/Views';

class App extends Component {

  componentDidMount(){
    topicMgmtInstance.get('/groups')
    .then(response =>{
      console.log(response);
      this.setState({
        views:response.data
      });
    })
  }

  state={
    persons:[
        {name:'Premendra',age:29},
        {name:'Vandana',age:26},
        {name:'Narendra',age:27}
    ],
    views:[],
    counter:1    
};


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


        {this.state.persons.map(pers => {
           return <Person name={pers.name} age={pers.age}/>
        })}

        {this.state.views.map(pers => {
           return <Views title={pers.title}/>
        })}

        
      </div>
    );
  }
}

export default App;
