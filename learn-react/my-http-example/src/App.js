import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Words from './components/word-meaning/Words';
import Nav from './components/navbar/Nav';
import FileSearchView from './components/file-search/FileSearchView';
import CheckBoxTest from './components/check-box/CheckBoxTest';

const App = () => {

  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8989/words/findAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWords(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="jumbotron">
      <header className="lead">


        {/* {words.map(item => <li key={item.id}>{item.word}</li>)} */}
        {/* {words.map(item => <li key={item.id}>
            <div className="card" style={{width: "18rem"}}>
              <div className="card-body">
                <h5 className="card-title">{item.word}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.word}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                
              </div>
            </div>
          </li>)} */}
        {/* <Words words={words} /> */}
        <Router>
          <div className="App">
            <Nav />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/words" element={<Words words={words} />} />
              <Route path="/file-search" exact element={<FileSearchView />} />
              <Route path="/check-box" exact element={<CheckBoxTest />} />
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

function Home() {
  return <h1>Home page</h1>;
}

export default App;
