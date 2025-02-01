import { useState } from "react";

const MetaLearningCycleV2 = () => {
  const [title, setTitle] = useState("Meta-Learning Cycle");
  const [description, setDescription] = useState("Click a stage to learn more.");

  const handleStageClick = (stage/**: string */, desc/**: string */) => {
    setTitle(stage);
    setDescription(desc);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="position-relative" style={{ width: "24rem", height: "24rem" }}>
        {/* Background Circle */}
        <div className="position-absolute w-100 h-100 rounded-circle bg-white shadow-lg"></div>

        {/* Center Title & Description */}
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h5 className="fw-bold">{title}</h5>
          <p className="text-secondary">{description}</p>
        </div>

        {/* Stages with Click Events */}
        <div className="position-absolute top-0 start-50 translate-middle text-center">
          <div
            className="rounded-circle bg-primary text-white py-2 px-3 shadow-sm cursor-pointer w-25"
            onClick={() => handleStageClick("Discomfort", "This is where you push yourself beyond your current abilities.")}
          >
            Discomfort
          </div>
        </div>

        <div className="position-absolute top-50 end-0 translate-middle text-center me-5">
          <div
            className="rounded-circle bg-success text-white py-2 px-3 shadow-sm cursor-pointer w-25"
            onClick={() => handleStageClick("Improvement", "You start to see progress and gain skills.")}
          >
            Improvement
          </div>
        </div>

        <div className="position-absolute bottom-0 start-50 translate-middle text-center">
          <div
            className="rounded-circle bg-warning text-white py-2 px-3 shadow-sm cursor-pointer w-25"
            onClick={() => handleStageClick("Plateau", "You reach a point where progress seems to slow down.")}
          >
            Plateau
          </div>
        </div>

        <div className="position-absolute top-50 start-0 translate-middle text-center ms-5">
          <div
            className="rounded-circle bg-danger text-white py-2 px-3 shadow-sm cursor-pointer w-25"
            onClick={() => handleStageClick("Success", "You achieve your goals and experience mastery.")}
          >
            Success
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaLearningCycleV2;
