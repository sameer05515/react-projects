import { courseGoalCard, whitespacePreWrap } from "../common/styles";

type CourseGoalProps = {
  title: string;
  description: string;
};

const CourseGoalV2 = ({ title, description }: CourseGoalProps) => {
  return (
    <article style={courseGoalCard}>
      <div>
        <h2>{title}</h2>
        <p style={whitespacePreWrap}>{description}</p>
      </div>
      <button>DELETE</button>
    </article>
  );
};

export default CourseGoalV2;
