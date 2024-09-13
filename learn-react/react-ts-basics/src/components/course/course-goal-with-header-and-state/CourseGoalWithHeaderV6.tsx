import HeaderV3 from "../course-header/HeaderV3";
import goalsImg from "../../../assets/goals.jpg";
import { useState } from "react";
import CourseGoalListV2 from "../course-goal-list/CourseGoalListV2";
import { CourseGoal } from "../common/data-types";
// import '../common/course.css';

const CourseGoalWithHeaderV6 = () => {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  const handleAddGoal = () => {
    const newGoal: CourseGoal = {
      id: Math.random(),
      title: "Learn React + TS: " + ((goals?.length || 0) + 1),
      description: "Learn it in Depth: " + ((goals?.length || 0) + 1),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals((prevGoals) => {
      const updatedList = prevGoals?.filter(
        ({ id: goalKiId }) => id !== goalKiId
      );
      return [...updatedList];
    });
  };
  return (
    <main>
      <HeaderV3 image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your course goals</h1>
      </HeaderV3>
      <button onClick={handleAddGoal}>Add Goal</button>
      <CourseGoalListV2 goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
};

export default CourseGoalWithHeaderV6;
