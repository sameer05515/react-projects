import { FC, useRef, type FormEvent } from "react";

type NewGoalProps={
  onAddGoal: (goal: string, summary: string)=> void;
}


const NewGoalV3: FC<NewGoalProps> = ({onAddGoal}) => {
    const goalRef= useRef<HTMLInputElement>(null);
    const summaryRef= useRef<HTMLInputElement>(null);

    const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        // new FormData(event.currentTarget);

        const enteredGoal= goalRef.current!.value;
        const enteredSummary= summaryRef.current!.value;
        onAddGoal(enteredGoal,enteredSummary);
        event.currentTarget.reset();
    }
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" name="goal" ref={goalRef} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" name="summary" ref={summaryRef} />
      </p>
      <p>
        <button >Add Goal</button>
      </p>
    </form>
  );
};

export default NewGoalV3;
