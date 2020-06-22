import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

import topicMgmtInstance from './axios';
import Views from './Views/Views';
import List from './List/List'

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
        
        


        {this.state.persons.map(pers => {
           return <Person name={pers.name} age={pers.age}/>
        })}

        {
          <List list={this.state.views}/>
        }

        {/* {this.state.views.map(pers => {
           return <Views title={pers.title}/>
        })} */}

        
      </div>
    );
  }
}

export default App;
