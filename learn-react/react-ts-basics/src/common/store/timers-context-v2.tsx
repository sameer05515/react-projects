import { createContext, useContext, type ReactNode } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

export const TimersContext = createContext<TimersContextValue | null>(null);

// --------------------------

type TimersContextProviderProps = {
  children: ReactNode;
};

export const TimersContextProvider = ({
  children,
}: TimersContextProviderProps) => {
  const ctx: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer: (timerData) => {},
    startTimers: () => {},
    stopTimers: () => {},
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

// ------------------------

export const useTimersContext = () => {
  const timersCtx = useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("TimersContext is null- that should not be the case!!");
  }
  return timersCtx;
};
