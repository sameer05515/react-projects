import { useState } from "react";
import styles from "./styles.v3.module.css";
import MDSectionV7 from "../../common/components/markdown-component/v7";
// import styles from "./MetaLearningCycle.module.css"; // Import the CSS module

const MetaLearningCycleV3 = () => {
  const [title, setTitle] = useState("Meta-Learning Cycle");
  const [description, setDescription] = useState("Click a stage to learn more.");

  const handleStageClick = (stage, desc) => {
    setTitle(stage);
    setDescription(desc);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className={styles.container}>
          {/* Background Circle */}
          <div className="position-absolute w-100 h-100 rounded-circle bg-white shadow-lg"></div>

          {/* Center Title & Description */}
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h5 className="fw-bold">{title}</h5>
            <p className="text-secondary">{description}</p>
          </div>

          {/* Stages with Click Events */}
          <div
            className={`${styles.stage} ${styles.top} bg-primary text-white shadow`}
            onClick={() =>
              handleStageClick("Discomfort", "This is where you push yourself beyond your current abilities.")
            }
          >
            Discomfort
          </div>

          <div
            className={`${styles.stage} ${styles.right} bg-success text-white shadow`}
            onClick={() => handleStageClick("Improvement", "You start to see progress and gain skills.")}
          >
            Improvement
          </div>

          <div
            className={`${styles.stage} ${styles.bottom} bg-warning text-white shadow`}
            onClick={() => handleStageClick("Plateau", "You reach a point where progress seems to slow down.")}
          >
            Plateau
          </div>

          <div
            className={`${styles.stage} ${styles.left} bg-danger text-white shadow`}
            onClick={() => handleStageClick("Success", "You achieve your goals and experience mastery.")}
          >
            Success
          </div>
        </div>
      </div>
      <div className="row p-4 vh-100 lh-lg">
        <div className="col-md-12">
          <b>Summary : </b> Meta Learning to Learn 10x Fast
        </div>
        <div className="col-md-6">
          <div>
            <b>Neuroscience Behind Learning</b>
            <p>
              <span>* Neuroplasticity: Brain forms stronger connections with Practice</span> <br />
              <span>* Dopamine: Motivation and reward system that keeps you engaged</span>
            </p>
          </div>
          <div>
            <b>4 Stages of Learning</b>
            <ol>
              <li>
                <b>Discomfort: </b> Initial struggle when learning something new.
              </li>
              <li>
                <b>Improvement: </b> Confidence grows with progress.
              </li>
              <li>
                <b>Plateau: </b> Frustrating phase where results show down.
              </li>
              <li>
                <b>Success: </b> Mastery achieved with persistence
              </li>
            </ol>
          </div>
        </div>
        <div className="col-md-6">
          <b>5 ways to learn faster</b>
          <ul>
            <li>
              <b>80/20 Rule: </b> Focus on the 20% that gives 80% of the results.
            </li>
            <li>
              <b>Clear Intentions: </b> Ask yourself why you are learning to stay motivated.
            </li>
            <li>
              <b>Teach Others: </b> Explaining what you learn helps retention.
            </li>
            <li>
              <b>Get Feedback: </b> Learn faster by correcting mistakes in real-time.
            </li>
            <li>
              <b>Shift your Identity: </b> Embrace mistakes and grow from them.
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 vh-100 lh-lg">
        <MDSectionV7 mdFileUrl="/meta-learning/v1.md" />
      </div>
    </>
  );
};

export default MetaLearningCycleV3;
