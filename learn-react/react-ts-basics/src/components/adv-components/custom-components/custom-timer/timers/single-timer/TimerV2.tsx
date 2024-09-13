// import Container from './UI/Container.tsx';

import Container from "../../../container/ContainerV2";
import { Timer as TimerProps } from "../../../../../../common/store/timers-context-v3";
import { useState } from "react";
// type TimerProps={
//   name: string;
//   duration: number;
// }

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  setInterval(() => {
    setRemainingTime((prevTime)=> prevTime-50 );
  }, 50);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration*1000} value={remainingTime}/>
      </p>
      <p>remaining time</p>
    </Container>
  );
}
