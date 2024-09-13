import { type FormEvent } from "react";

const NewGoalV2 = () => {
    const handleSubmit=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        new FormData(event.currentTarget);
    }
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" name="goal" />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" name="summary" />
      </p>
      <p>
        <button >Add Goal</button>
      </p>
    </form>
  );
};

export default NewGoalV2;
