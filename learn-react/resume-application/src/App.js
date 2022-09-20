// import logo from './logo.svg';
import './App.css';
import ResumeObject from './ResumeObject'
import ResumeHeader from './components/resume/ResumeHeader';
import CounterElement from './components/counter/CounterElement';
import LoginElement from './components/login/LoginElement';
import Card from './components/UI/Card';

function App() {
  return (
    <div className="App">
      <LoginElement />
      <CounterElement />
      <Card>
        <ResumeHeader resumeHeader={ResumeObject.resumeHeader} />
      </Card>
    </div>
  );
}

export default App;
