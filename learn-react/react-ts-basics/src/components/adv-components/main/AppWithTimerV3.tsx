// import React from 'react'

// import "../common/index.css";
import AddTimer from "../custom-components/custom-timer/add-timer/AddTimer";
import Header from "../custom-components/custom-timer/header/Header";
import Timers from "../custom-components/custom-timer/timers/TimersV3";
import TimersContextProvider from "../../../common/store/timers-context-v3";

const AppWithTimerV3 = () => {
  return (
    <TimersContextProvider>      
        <Header />
        <main>
          <AddTimer />
          <Timers />
        </main>      
    </TimersContextProvider>
  );
};

export default AppWithTimerV3;
