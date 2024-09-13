import { type ReactNode } from "react";
import { buttonHoverStyle, buttonStyle, courseGoalCard } from "../common/styles";

type CourseGoalProps = {
    title: string;
    // description: string;
    children: ReactNode
  };
  
  const CourseGoalV3 = ({ title, children }: CourseGoalProps) => {
    return (
      <article style={courseGoalCard}>
        <div>
          <h2>{title}</h2>
          {/* <p>{description}</p> */}
          {children}
        </div>
        <button style={{...buttonStyle, ...buttonHoverStyle}}>DELETE</button>
      </article>
    );
  };
  
  export default CourseGoalV3;
  