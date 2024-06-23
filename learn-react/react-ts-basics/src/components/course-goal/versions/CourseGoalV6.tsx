import { type FC, type PropsWithChildren } from "react";
import { buttonHoverStyle, buttonStyle, courseGoalCard } from "../common/styles";

type CourseGoalProps = PropsWithChildren<{
  title: string;
}>;

const CourseGoalV6: FC<CourseGoalProps> = ({ title, children }) => {
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

export default CourseGoalV6;
