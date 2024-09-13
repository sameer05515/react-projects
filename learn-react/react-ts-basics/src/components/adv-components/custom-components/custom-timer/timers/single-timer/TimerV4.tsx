// import Container from './UI/Container.tsx';

import Container from "../../../container/ContainerV2";
import { Timer as TimerProps } from "../../../../../../common/store/timers-context-v3";
import { useEffect, useRef, useState } from "react";
// type TimerProps={
//   name: string;
//   duration: number;
// }

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 50);
    }, 50);

    interval.current = timer;

    return () => clearInterval(timer);
  }, []);

  const formattedRemainingtime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingtime}</p>
    </Container>
  );
}
