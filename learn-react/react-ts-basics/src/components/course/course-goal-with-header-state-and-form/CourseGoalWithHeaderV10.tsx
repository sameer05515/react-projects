import { useState } from "react";
import goalsImg from "../../../assets/goals.jpg";
import { CourseGoal } from "../common/data-types";
import CourseGoalListV2 from "../course-goal-list/CourseGoalListV2";
import HeaderV3 from "../course-header/HeaderV3";
import NewGoalV4 from "../create-goal/NewGoalV4";
// import '../common/course.css';

const CourseGoalWithHeaderV10 = () => {
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
      <NewGoalV4 onAddGoal={handleAddGoal}/>
      <CourseGoalListV2 goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
};

export default CourseGoalWithHeaderV10;
