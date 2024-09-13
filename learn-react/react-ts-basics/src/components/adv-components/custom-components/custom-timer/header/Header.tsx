// import Button from './UI/Button.tsx';

// import { useContext } from "react";
import Button from "../../custom-button/CustomButtonV3.tsx";
import { useTimersContext } from "../../../../../common/store/timers-context-v3.tsx";

export default function Header() {
  const timersContext = useTimersContext()!;
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timersContext.isRunning
            ? timersContext.stopTimers
            : timersContext.startTimers
        }
      >
        {timersContext.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
