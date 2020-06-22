import React, { Component } from "react";
import "./App.css";
import ScrollView, { ScrollElement } from "./scroller";
import topicMgmtInstance from './axios';
import Wysiwyg from './Wysiwyg';

import items from "./data";

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


  scrollTo = (name) => {
    this._scroller.scrollTo(name);
  }
  render() {
    return (
      <div className="app">
        {
          items.map(({name}) => <button onClick={() => this.scrollTo(name)}>{name}</button>)
        }
        <ScrollView ref={scroller => this._scroller = scroller}>
          <div className="scroller">
            {items.map(({ name, image }) => {
              return (
                <ScrollElement name={name}>
                  <div className="item">
                    <img src={image} />
                    {name}
                  </div>
                </ScrollElement>
              );
            })}
          </div>
        </ScrollView>

        {
          this.state.views.map(({id,title}) => <button onClick={() => this.scrollTo(id)}>{title}</button>)
        }
        <ScrollView ref={scroller => this._scroller = scroller}>
          <div className="scroller">
            {this.state.views.map(({ id, title,description }) => {
              return (
                <ScrollElement name={id}>
                  <div className="item">
                    
                   <strong>{title}</strong>  : <Wysiwyg value={description}/>
                  </div>
                </ScrollElement>
              );
            })}
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default App;
