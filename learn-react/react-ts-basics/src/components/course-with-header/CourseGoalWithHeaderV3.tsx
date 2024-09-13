import CourseGoalV6 from "../course-goal/versions/CourseGoalV6";
import HeaderV3 from "../course-header/HeaderV3";
import goalsImg from '../../assets/goals.jpg'


const CourseGoalWithHeaderV3 = () => {
  return (
    <main>
        <HeaderV3 image={{src:goalsImg, alt:"A list of goals"}}>
            <h1>Your course goals</h1>
        </HeaderV3>
        <CourseGoalV6 title="Learn React + TS">
            <p>Learn it from the ground up</p>
        </CourseGoalV6>
    </main>
  )
}

export default CourseGoalWithHeaderV3