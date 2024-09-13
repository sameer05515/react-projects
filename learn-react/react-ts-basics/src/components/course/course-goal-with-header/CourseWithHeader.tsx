import CourseGoalV6 from "../course-goal/versions/CourseGoalV6";
import Header from "../course-header/Header";
import goalsImg from '../../../assets/goals.jpg';
// import '../common/course.css';


const CourseGoalWithHeader = () => {
  return (
    <main>
        <Header image={{src:goalsImg, alt:"A list of goals"}}>
            <h1>Your course goals</h1>
        </Header>
        <CourseGoalV6 title="Learn React + TS">
            <p>Learn it from the ground up</p>
        </CourseGoalV6>
    </main>
  )
}

export default CourseGoalWithHeader