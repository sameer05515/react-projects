import { type ReactNode, type FC } from "react";
import { type CourseGoal as CourseGoalType } from "../common/data-types";
import CourseGoalV7 from "../course-goal/versions/CourseGoalV7";
import InfoBox from "../info-box/InfoBox";

type CourseGoalListProps = {
  goals: CourseGoalType[];
  onDeleteGoal: (id: number) => void;
};

const CourseGoalListV3: FC<CourseGoalListProps> = ({
  goals = [],
  onDeleteGoal: onDelete,
}) => {
  if (goals?.length === 0) {
    return (
      <InfoBox mode="hint">
        No course goals added yet. Start adding some!!
      </InfoBox>
    );
  }

  let warningBox: ReactNode;

  if(goals.length>=3){
    warningBox = (
        <InfoBox mode="warning" severity="high">            
            You're collecting a lot of goals. Don't put too much on your plate!!
        </InfoBox>
    );
  }

  return (
    <>
    {warningBox}
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoalV7 id={goal.id} title={goal.title} onDelete={onDelete}>
            <p>{goal.description}</p>
          </CourseGoalV7>
        </li>
      ))}
    </ul>
    </>
  );
};

export default CourseGoalListV3;
