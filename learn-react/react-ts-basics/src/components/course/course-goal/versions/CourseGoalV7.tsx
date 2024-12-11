import { type FC, type PropsWithChildren } from "react";
import {
  buttonHoverStyle,
  buttonStyle,
  courseGoalCard,
} from "../common/styles";

type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  onDelete: (id: number) => void;
}>;

const CourseGoalV7: FC<CourseGoalProps> = ({
  id,
  title,
  onDelete,
  children,
}) => {
  return (
    <article style={courseGoalCard}>
      <div>
        <h2>{title}</h2>
        {/* <p>{description}</p> */}
        {children}
      </div>
      <button
        style={{ ...buttonStyle, ...buttonHoverStyle }}
        onClick={() => onDelete(id)}
      >
        DELETE
      </button>
    </article>
  );
};

export default CourseGoalV7;
