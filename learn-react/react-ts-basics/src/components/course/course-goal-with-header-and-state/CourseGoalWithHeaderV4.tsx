import { useState } from "react";
import goalsImg from "../../../assets/goals.jpg";
// import '../common/course.css';
import CourseGoalV6 from "../course-goal/versions/CourseGoalV6";
import HeaderV3 from "../course-header/HeaderV3";

type CourseGoal = {
  title: string;
  description: string;
  id: number;
};
const CourseGoalWithHeaderV4 = () => {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  const handleAddGoal = () => {
    const newGoal: CourseGoal = {
      id: Math.random(),
      title: "Learn React + TS: " + ((goals?.length || 0) + 1),
      description: "Learn it in Depth: " + ((goals?.length || 0) + 1),
    };
    setGoals((prev) => [...prev, newGoal]);
  };
  return (
    <main>
      <HeaderV3 image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your course goals</h1>
      </HeaderV3>
      <button onClick={handleAddGoal}>Add Goal</button>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoalV6 title={goal.title}>
              <p>{goal.description}</p>
            </CourseGoalV6>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CourseGoalWithHeaderV4;
