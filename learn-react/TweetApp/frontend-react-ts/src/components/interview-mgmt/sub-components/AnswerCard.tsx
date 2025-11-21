import React from "react";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartPreviewer } from "../../../common/components/Smart/Editor/v3";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";

interface AnswerCardProps {
  answer: any;
  className?: string;
  onUpdateAnswerClick?: (answer: any) => void;
  showContent?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer: ansObj, className = "", onUpdateAnswerClick = () => { }, showContent }) => {
  const tagButtonClass = "bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded";

  return (
    <>
      <div className={`m-1.5 border border-gray-800 p-2.5 ${className}`}>
        <div>
          <RatingComponent rating={ansObj.rating} />
          <div className="my-2.5">
            <CustomButton
              className={`${tagButtonClass} mr-2.5`}
              onClick={() => { onUpdateAnswerClick && onUpdateAnswerClick(ansObj) }}
            >
              Edit
            </CustomButton>
          </div>

          <ToggleablePanel title={ansObj.name + "..."} showContent={showContent && showContent===true}>
            <div className="mb-2.5 w-[67vw] overflow-auto rounded border border-gray-600 px-1.5 py-0.5">
              {ansObj.smartContent && (
                <SmartPreviewer data={ansObj.smartContent} />
              )}
            </div>
          </ToggleablePanel>

        </div>
      </div>
    </>
  );
};

export default AnswerCard;
