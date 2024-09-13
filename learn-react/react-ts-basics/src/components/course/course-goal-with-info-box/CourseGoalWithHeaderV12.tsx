import HeaderV3 from "../course-header/HeaderV3";
import goalsImg from "../../../assets/goals.jpg";
import { useState } from "react";
import CourseGoalListV4 from "../course-goal-list/CourseGoalListV4";
import { CourseGoal } from "../common/data-types";
import NewGoalV3 from "../create-goal/NewGoalV3";
// import '../common/course.css';

const CourseGoalWithHeaderV12 = () => {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  const handleAddGoal = (goal: string, summary: string) => {
    const newGoal: CourseGoal = {
      id: Math.random(),
      title: goal,
      description: summary,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleDeleteGoal = (id: number):void => {
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
      {/* <button onClick={handleAddGoal}>Add Goal</button> */}
      <NewGoalV3 onAddGoal={handleAddGoal}/>
      <CourseGoalListV4 goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
};

export default CourseGoalWithHeaderV12;
