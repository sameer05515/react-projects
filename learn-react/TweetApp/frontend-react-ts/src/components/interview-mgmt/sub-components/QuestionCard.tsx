import React from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/Smart/Editor/v3";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import useGlobalServiceProvider from "../../../common/hooks/useGlobalServiceProvider";
import { formatDateToDDMMMYYYYWithTime } from "../../../common/service/commonService";
import { getTagsForGivenIds } from "../../../redux/slices/tagsSlice";
import AnswerCard from "./AnswerCard";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(date);
};

interface QuestionCardProps {
  question: any;
  categoryId?: string;
  onCreateAnswerClick?: () => void;
  onUpdateAnswerClick?: (answer: any) => void;
  onAncestorClick?: (ancestor: any) => void;
  onBaseSpanClick?: () => void;
  onChildTopicClick?: (child: any) => void;
  onLinkedTagSelection?: (linkedTagUID: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  // categoryId,
  onCreateAnswerClick = () => {},
  onUpdateAnswerClick = () => {},
  onAncestorClick = () => {},
  onBaseSpanClick = () => {},
  onChildTopicClick = () => {},
  onLinkedTagSelection = () => {},
}) => {
  const { BreadcrumbItemType } = useGlobalServiceProvider();

  const filteredTags = useSelector(getTagsForGivenIds(question?.tags || []));

  const handleAncestorClick = (ancestor) => {
    onAncestorClick(ancestor);
  };
  const handleLinkedTagSelection = (linkedTagUID) => {
    onLinkedTagSelection(linkedTagUID);
  };

  return (
    <>
      <div>
        <div>
          <Breadcrumbs
            providedItem={question}
            providedItemType={BreadcrumbItemType.InterviewManagement}
            ancestors={question?.ancestors || []}
            onAncestorClick={(a) => handleAncestorClick(a)}
            onBaseSpanClick={onBaseSpanClick}
          />
          {/* {category} */}
          {/* <div style={styles.datesStyle}>
            <span className="mr-2.5">
              <strong>Rating:</strong> {question.rating}
            </span>
            <span className="mr-2.5">
              <strong>Unique ID:</strong> {question.uniqueId}
            </span>
            <span className="mr-2.5">
              <strong>Category Id:</strong> {categoryId}
            </span>
          </div> */}
          <h2>
            <b>Question: </b>
            {/* <HtmlTextRendrer htmlString={question.heading} /> */}
            {/* {question.heading} */}
            <SmartPreviewer
              data={{
                content: question.heading || "**tree node name is missing!**",
                textOutputType: SupportedTextFormats.MARKDOWN,
              }}
              markdownStyles={{ fontSize: "20px" }}
            />
          </h2>
          <RatingComponent rating={question.rating} />
          {/* <time dateTime={question.updatedDate}>{question.updatedDate}</time> */}
          <div>
            <b>Last Updated:</b>{" "}
            <time dateTime={question.updatedDate}>
              {formatDate(question.updatedDate)}
            </time>
          </div>

          <div className="mb-2">
            <span>
              <b>Last Revised On:- </b>{" "}
              {question.lastRevisedOn ? (
                formatDateToDDMMMYYYYWithTime(question.lastRevisedOn)
              ) : (
                <span className="text-red-600">{"Question never revised"}</span>
              )}
            </span>
          </div>

          <div className="text-xs rounded mb-2">
            <b>Tags: </b> {filteredTags?.length > 0 ? "" : "No tags added yet!"}
            {filteredTags.map(
              (tag) =>
                tag && (
                  <HoverableSpan
                    className="bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded m-1.5 inline-block cursor-pointer hover:bg-gray-400 transition-colors"
                    key={tag._id}
                    onClick={() => handleLinkedTagSelection(tag.uniqueId)}
                  >
                    {tag.title}
                  </HoverableSpan>
                )
            )}
          </div>
          <div className="border border-gray-600 px-1.5 py-0.5 rounded mb-2.5 w-[67vw] overflow-auto">
            <ToggleablePanel
              title="Additional Description for Question:-"
              showContent={true}
            >
              {question.smartContent && (
                <SmartPreviewer data={question.smartContent} />
              )}
            </ToggleablePanel>
          </div>

          {question.children && question.children.length > 0 && (
            <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
              <ToggleablePanel title="Child Questions:-">
                <Tree
                  data={question.children}
                  renderNode={(t) => (
                    <>
                      <HoverableSpan onClick={() => onChildTopicClick(t)}>
                        {t.name}
                      </HoverableSpan>
                    </>
                  )}
                />
              </ToggleablePanel>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2">
            <strong>{question.answers.length || 0} Answers</strong>
            <HoverableSpan
              className="px-1.5 cursor-pointer hover:underline"
              onClick={() =>
                onCreateAnswerClick && onCreateAnswerClick()
              }
            >
              Add New Answer
            </HoverableSpan>
          </div>
          <div>
            {/* <b>Count: </b> */}
            {question.answers &&
              question.answers.length > 0 &&
              question.answers.map((a) => (
                <AnswerCard
                  key={a.uniqueId}
                  answer={a}
                  onUpdateAnswerClick={onUpdateAnswerClick}
                  showContent={question.answers.length === 1}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
