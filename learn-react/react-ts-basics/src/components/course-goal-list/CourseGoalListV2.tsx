import { type FC } from "react";
import { type CourseGoal as CourseGoalType } from "../common/data-types";
import CourseGoalV7 from "../course-goal/versions/CourseGoalV7";

type CourseGoalListProps = {
  goals: CourseGoalType[];
  onDeleteGoal: (id: number) => void;
};

const CourseGoalList: FC<CourseGoalListProps> = ({
  goals = [],
  onDeleteGoal: onDelete,
}) => {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoalV7 id={goal.id} title={goal.title} onDelete={onDelete}>
            <p>{goal.description}</p>
          </CourseGoalV7>
        </li>
      ))}
    </ul>
  );
};

export default CourseGoalList;
