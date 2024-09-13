import CourseGoalV6 from "../course-goal/versions/CourseGoalV6";
import HeaderV2 from "../course-header/HeaderV2";
import goalsImg from '../../assets/goals.jpg'


const CourseGoalWithHeaderV2 = () => {
  return (
    <main>
        <HeaderV2 image={{src:goalsImg, alt:"A list of goals"}}>
            <h1>Your course goals</h1>
        </HeaderV2>
        <CourseGoalV6 title="Learn React + TS">
            <p>Learn it from the ground up</p>
        </CourseGoalV6>
    </main>
  )
}

export default CourseGoalWithHeaderV2