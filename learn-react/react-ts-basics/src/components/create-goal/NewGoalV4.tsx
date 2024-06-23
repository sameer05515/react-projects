import { FC, useState, type FormEvent } from "react";

type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

const initialFormData = {
  enteredGoal: "",
  enteredSummary: "",
};

const NewGoalV4: FC<NewGoalProps> = ({ onAddGoal }) => {
  // const goalRef= useRef<HTMLInputElement>(null);
  // const summaryRef= useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    enteredGoal: string;
    enteredSummary: string;
  }>(initialFormData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // new FormData(event.currentTarget);
    if (!formData?.enteredGoal || !formData?.enteredSummary) {
      // alert('Bhosriwale! goal ya summary me kuch miss kiye ho. isko kon bharega??');
      return;
    }

    const enteredGoal = formData.enteredGoal;
    const enteredSummary = formData.enteredSummary;
    onAddGoal(enteredGoal, enteredSummary);
    // event.currentTarget.reset();
    setFormData(() => initialFormData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input
          id="goal"
          type="text"
          name="enteredGoal"
          value={formData.enteredGoal}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input
          id="summary"
          type="text"
          name="enteredSummary"
          value={formData.enteredSummary}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </p>
      <p>
        {formData?.enteredGoal && formData?.enteredSummary && (
          <button type="submit" onClick={handleSubmit}>
            Add Goal
          </button>
        )}
      </p>
    </form>
  );
};

export default NewGoalV4;
