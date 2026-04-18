import React, { Component } from "react";
import "./App.css";
import ScrollView, { ScrollElement } from "./scroller";
import placeholderApi from './axios';
//import Wysiwyg from './Wysiwyg';

//import { TrixEditor } from "react-trix";
//import Trix from "trix";

//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';

// import 'jodit';
// import 'jodit/build/jodit.min.css';
// import JoditEditor from "jodit-react";

class App extends Component {
  componentDidMount() {
    placeholderApi
      .get('/posts?_limit=12')
      .then((response) => {
        const views = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          description: post.body,
        }));
        this.setState({ views });
      })
      .catch(() => {
        this.setState({ views: [] });
      });
  }

  state = {
    persons: [
      { name: 'Premendra', age: 29 },
      { name: 'Vandana', age: 26 },
      { name: 'Narendra', age: 27 }
    ],
    views: [],
    counter: 1
  };


  scrollTo = (name) => {
    this._scroller.scrollTo(name);
  }

  updateContent(value) {
    this.setState({ content: value })
  }
  render() {
    return (
      <div className="app">
        {/* {
          items.map(({ name }) => <button onClick={() => this.scrollTo(name)}>{name}</button>)
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
        </ScrollView> */}

        {this.state.views.map(({ id, title }) => (
          <button key={id} type="button" onClick={() => this.scrollTo(id)}>
            {title}
          </button>
        ))}

        <ScrollView ref={scroller => this._scroller = scroller}>
          <div className="scroller">
            {this.state.views.map((group) => {
              return (
                <ScrollElement key={group.id} name={group.id}>
                  <div className="item">

                    {/* <strong>{group.title}</strong>  : <TrixEditor value={group.description} ></TrixEditor> */}

                    <strong>{group.title}</strong>  : {group.description}


                    {/* <ReactQuill 
                    className={"blurred-editor"} 
                    theme="snow" 
                    readOnly 
                    value={group.description} /> */}

                    {/* <JoditEditor
                      value={group.description}
                      config={{
                        readonly: true // all options from https://xdsoft.net/jodit/play.html
                      }}
                      
                    /> */}

                    {/* <div>
                      <input type="hidden" id="trix" value={group.description} />
                      <trix-editor input="trix"
                      ref={this.trixInput} 
                      />
                    </div> */}




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
