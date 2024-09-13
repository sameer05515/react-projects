import { type FC } from "react";
import { type CourseGoal as CourseGoalType} from "../common/data-types";
import CourseGoalV6 from "../course-goal/versions/CourseGoalV6";

type CourseGoalListProps={
    goals:CourseGoalType[]
}


const CourseGoalList: FC<CourseGoalListProps> = ({goals=[]}) => {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoalV6 title={goal.title}>
            <p>{goal.description}</p>
          </CourseGoalV6>
        </li>
      ))}
    </ul>
  );
};

export default CourseGoalList;
