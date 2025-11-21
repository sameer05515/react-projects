import { useState } from "react";

const MetaLearningCycleV1 = () => {
  const [title, setTitle] = useState("Meta-Learning Cycle");
  const [description, setDescription] = useState("Click a stage to learn more.");

  const handleStageClick = (stage/**: string */, desc/**: string */) => {
    setTitle(stage);
    setDescription(desc);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-96 h-96">
        {/* Background Circle */}
        <div className="absolute w-full h-full rounded-full bg-white shadow-lg"></div>

        {/* Center Title & Description */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h5 className="font-bold">{title}</h5>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Stages with Click Events */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
          <div
            className="rounded-full bg-blue-600 text-white p-3 shadow-sm cursor-pointer w-[100px] hover:bg-blue-700 transition-colors"
            onClick={() => handleStageClick("Discomfort", "This is where you push yourself beyond your current abilities.")}
          >
            Discomfort
          </div>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-center">
          <div
            className="rounded-full bg-green-600 text-white p-3 shadow-sm cursor-pointer w-[100px] hover:bg-green-700 transition-colors"
            onClick={() => handleStageClick("Improvement", "You start to see progress and gain skills.")}
          >
            Improvement
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <div
            className="rounded-full bg-yellow-600 text-white p-3 shadow-sm cursor-pointer w-[100px] hover:bg-yellow-700 transition-colors"
            onClick={() => handleStageClick("Plateau", "You reach a point where progress seems to slow down.")}
          >
            Plateau
          </div>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-center">
          <div
            className="rounded-full bg-red-600 text-white p-3 shadow-sm cursor-pointer w-[100px] hover:bg-red-700 transition-colors"
            onClick={() => handleStageClick("Success", "You achieve your goals and experience mastery.")}
          >
            Success
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaLearningCycleV1;
