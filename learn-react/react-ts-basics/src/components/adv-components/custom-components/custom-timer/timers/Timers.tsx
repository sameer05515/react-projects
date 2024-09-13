import { useTimersContext } from "../../../../../common/store/timers-context-v3";
import Timer from "./single-timer/Timer";


export default function Timers() {
  const {timers}=useTimersContext();
  return <ul>{
    timers.map((timer, idx)=>(
      <li key={`timer_no_${idx+1}`}>
        <Timer {...timer}/>
      </li>
    ))
    }</ul>;
}
