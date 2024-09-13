// import logo from './logo.svg';
// import './App.css';

import { useState } from "react";
import BookList from "./components/BookList";
import CustomSelect from "./common/components/CustomSelect";
import { fewTutorialLinks } from "./common/constants";

function App() {
  const viewConstants = {
    BookList: "BookList",
    SecondView: "SecondView",
    ThirdView:'ThirdView'
  };
  const avblViews = [
    { name: viewConstants.BookList, description: "BookList" },
    {
      name: viewConstants.SecondView,
      description: "SecondView",
    },
    {
      name: viewConstants.ThirdView,
      description: "ThirdView",
    },
  ];

  const viewOptions = avblViews.map((av) => ({
    value: av,
    label: av.name,
  }));

  const [selectedView, setSelectedView] = useState(null);
  const [showHelpSection, setShowHelpSection] = useState(false);

  const handleItemClick = (item) => {
    setSelectedView((prev) => item);
  };

  const showComponentForView = (view) => {
    if (view && view.name) {
      switch (view.name) {
        case viewConstants.BookList: return <BookList />;
        case viewConstants.SecondView: return <>
          <b>SecondView</b>
        </>;
        default: return <>No component aligned for : {`${view.name}`}</>
      }
    }
  }

  return (
    <>
      <div>
        <h2>Rest Service consumer example app</h2>
        <div>
          <button onClick={() => setShowHelpSection((prev) => !prev)}>
            {showHelpSection ? "Hide" : "Show"} Help Section
          </button>

          {showHelpSection && <HelpSection data={fewTutorialLinks} />}
        </div>

        <div>
          <CustomSelect options={viewOptions} onChange={handleItemClick} />
          {selectedView && <ViewCard item={selectedView} />}
        </div>

        <div>
          {showComponentForView(selectedView)}          
        </div>
      </div>
    </>
  );
}

const ViewCard = ({ item, onClick = () => { } }) => {
  return (
    <div style={{ ...style }}>
      <pre onClick={() => onClick(item)}>{item.description}</pre>
    </div>
  );
};

const HelpSection = ({ data }) => {
  return (
    <div style={helpSectionStyle} >
      {
        data && data.length > 0 && data.map((d) => {
          return (
            <div key={d.id}>
              <a href={d.link} rel="noreferrer" target={'_blank'}>{d.description} </a>
            </div>
          )
        })
      }
    </div>
  )
}

const style = { border: "1px solid black", padding: "10px", margin: "5px" };
const helpSectionStyle={
  border: '1px solid',
  borderLeft: '5px solid blue',
  margin: '10px',
  padding: '10px',
  boxShadow: '5px 7px #888888'
};

export default App;
