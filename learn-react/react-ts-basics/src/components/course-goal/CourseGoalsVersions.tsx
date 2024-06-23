import { whitespacePreWrap } from "./common/styles";
import CourseGoal from "./versions/CourseGoal";
import CourseGoalV2 from "./versions/CourseGoalV2";
import CourseGoalV3 from "./versions/CourseGoalV3";
import CourseGoalV4 from "./versions/CourseGoalV4";
import CourseGoalV5 from "./versions/CourseGoalV5";
import CourseGoalV6 from "./versions/CourseGoalV6";


const CourseGoalsVersions = () => {
  return (
    <main>
        <CourseGoal title="CourseGoal" description="Component in TSX" />
      <CourseGoalV2
        title="CourseGoalV2"
        description={`To enhance readability, we should declare prop types separately as below
        type CourseGoalProps = {
          title: string;
          description: string;
        };`}
      />
      <CourseGoalV3 title="CourseGoalV3">
        <p>
          To use `children` we need to declare type as
          <code>{' import { type ReactNode } from "react";'}</code>
        </p>
      </CourseGoalV3>
      <CourseGoalV4 title="CourseGoalV4">
        <p>
          To use `children` we need to declare type as
          <code>{' import { type ReactNode } from "react";'}</code>
          <br />
          and `interface` is used to define propTypes
        </p>
      </CourseGoalV4>
      <CourseGoalV5 title="CourseGoalV5">
        <p>
          To use `children` we need to declare type as
          <code>{' import { type PropsWithChildren } from "react";'}</code>
          <br />
          and `PropsWithChildren` is used to define propTypes
          <code style={whitespacePreWrap}>{` 
          type CourseGoalProps = PropsWithChildren<{
            title: string;
          }>;`}</code>
          <div style={whitespacePreWrap}>
            {`
              All React components (built-in components and also your custom components) do accept a special key prop which is used by React to track specific component instances.

              For example, the key prop should always be set when outputting a list of components.

              This key prop can be set on custom components even if you didn't specify it in your props type!

              For example, the following component code will work:
              `}
          </div>
          <code style={whitespacePreWrap}>
            {`
              type UserProps = {
                name: string;
              };
              
              function User({ name }: UserProps) {
                return <li>User: {name}</li>;
              }
              
              function App() {
                const users = [{ name: 'John' }, { name: 'Mary' }, { name: 'Luke' }];
              
                return (
                  <>
                    <ul>
                      {users.map((user, index) => (
                        <User key={user} name={user.name} />
                      ))}
                    </ul>
                  </>
                );
              }            
            `}
          </code>
        </p>
      </CourseGoalV5>
      <CourseGoalV6 title="CourseGoalV6">
        <p style={whitespacePreWrap}>
          To declare propTypes we can also use FC from react, if we are delaring
          component as <i>functional component</i>. To use this we need to
          declare type as
          <br />
          <code>{`
import { type FC, type PropsWithChildren } from "react";

type CourseGoalProps = PropsWithChildren<{
  title: string;
}>;

const CourseGoalV6: FC<CourseGoalProps> = ({ title, children }) =>{
return <> {title}: {children}</>
}
          
          `}</code>
          <br />
          and `interface` is used to define propTypes
        </p>
      </CourseGoalV6>
    </main>
  )
}

export default CourseGoalsVersions