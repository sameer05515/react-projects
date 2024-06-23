
import HeaderV3 from "../course-header/HeaderV3";
import goalsImg from "../../assets/goals.jpg";
import { useState } from "react";
import CourseGoalList from "../course-goal-list/CourseGoalList";
import { CourseGoal } from "../common/data-types";

const CourseGoalWithHeaderV5 = () => {
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
      <CourseGoalList goals={goals}/>
    </main>
  );
};

export default CourseGoalWithHeaderV5;
