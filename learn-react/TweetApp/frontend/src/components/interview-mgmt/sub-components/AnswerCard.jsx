import React from "react";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartPreviewer } from "../../../common/components/Smart/Editor/v3";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";

const AnswerCard = ({ answer: ansObj, style = {}, onUpdateAnswerClick = () => { }, showContent }) => {
  const tagButtonClass = "bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded";

  return (
    <>
      <div
        className="border border-black p-2.5 m-1.5"
        style={style}
      >
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
            <div className="border border-gray-600 px-1.5 py-0.5 rounded mb-2.5 w-[67vw] overflow-auto">
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
