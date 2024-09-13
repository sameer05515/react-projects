import { type PropsWithChildren } from "react";
import { buttonHoverStyle, buttonStyle, courseGoalCard } from "../common/styles";

type CourseGoalProps = PropsWithChildren<{
  title: string;
}>;

const CourseGoalV5 = ({ title, children }: CourseGoalProps) => {
  return (
    <article style={courseGoalCard}>
      <div>
        <h2>{title}</h2>
        {/* <p>{description}</p> */}
        {children}
      </div>
      <button style={{ ...buttonStyle, ...buttonHoverStyle }}>DELETE</button>
    </article>
  );
};

export default CourseGoalV5;
