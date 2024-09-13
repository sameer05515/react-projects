import { type ReactNode } from "react";
import { buttonHoverStyle, buttonStyle, courseGoalCard } from "../common/styles";

interface CourseGoalProps {
  title: string;
  // description: string;
  children: ReactNode;
}

const CourseGoalV4 = ({ title, children }: CourseGoalProps) => {
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

export default CourseGoalV4;
