// import Container from './UI/Container.tsx';

import Container from "../../../container/ContainerV2";
import { Timer as TimerProps } from "../../../../../../common/store/timers-context-v3";
// type TimerProps={
//   name: string;
//   duration: number;
// }

export default function Timer({name, duration}: TimerProps) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
