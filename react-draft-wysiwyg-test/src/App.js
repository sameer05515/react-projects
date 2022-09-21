import './App.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor/>
      </header>
    </div>
  );
}

export default App;
