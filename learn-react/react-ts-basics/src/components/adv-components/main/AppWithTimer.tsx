// import React from 'react'

// import "../common/index.css";
import AddTimer from "../custom-components/custom-timer/add-timer/AddTimer";
import Header from "../custom-components/custom-timer/header/Header";
import Timers from "../custom-components/custom-timer/timers/Timers";
import TimersContextProvider from "../../../common/store/timers-context-v3";

const AppWithTimer = () => {
  return (
    <TimersContextProvider>
      <div className="advanced-components">
        <Header />
        <main>
          <AddTimer />
          <Timers />
        </main>
      </div>
    </TimersContextProvider>
  );
};

export default AppWithTimer;
