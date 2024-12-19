import React from "react";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/smart-editor/SmartEditorV3";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";
import { styles } from "../common/util";
import AnswerCard from "./AnswerCard";
import Breadcrumbs from "../../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import useGlobalServiceProvider from "../../../common/hooks/useGlobalServiceProvider";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
    timeZoneName: 'short',
  }).format(date);
};

const QuestionCard = ({
  question,
  categoryId,
  onCreateAnswerClick = () => { },
  onUpdateAnswerClick = () => { },
  onAncestorClick = () => { },
  onBaseSpanClick = () => { },
  onChildTopicClick = () => { },
  onLinkedTagSelection = () => { }
}) => {
  const { availableTags} = useInterviewMgmt();
  const { BreadcrumbItemType } = useGlobalServiceProvider();

  const filteredTags = question?.tags?.map((uniqueId) =>
    availableTags.find((tag) => tag.uniqueId === uniqueId)
  );
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
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {question.rating}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {question.uniqueId}
            </span>
            <span style={{ marginRight: "10px" }}>
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
            <b>Last Updated:</b> <time dateTime={question.updatedDate}>
              {formatDate(question.updatedDate)}
            </time>
          </div>

          <div style={{ ...styles.datesStyle }}>
            <b>Tags: </b> {filteredTags?.length > 0 ? "" : "No tags added yet!"}
            {filteredTags.map(
              (tag) =>
                tag && (
                  <HoverableSpan
                    style={{ ...styles.tagStyle, margin: "5px" }}
                    key={tag._id}
                    onClick={() => handleLinkedTagSelection(tag.uniqueId)}
                  >
                    {tag.title}
                  </HoverableSpan>
                )
            )}
          </div>
          <div
            style={{
              border: "1px solid #999", // Grey border
              padding: "2px 5px", // Adjust padding as needed
              borderRadius: "4px",
              marginBottom: "10px",
              width: "67vw",
              overflow: "auto",
            }}
          >

            <ToggleablePanel title="Additional Description for Question:-" showContent={true}>
              {question.smartContent && (
                <SmartPreviewer data={question.smartContent} />
              )}
            </ToggleablePanel>
            {/* <b>Additional Description for Question:</b>
            {question.smartContent && (
              <SmartPreviewer data={question.smartContent} />
            )} */}
          </div>


          {question.children && question.children.length > 0 && (
            <div style={styles.descriptionStyle}>
              <ToggleablePanel title="Child Questions:-">
                <Tree data={question.children} renderNode={(t) =>
                  <>
                    <HoverableSpan onClick={() => onChildTopicClick(t)}>
                      {t.name}
                    </HoverableSpan>
                  </>
                } />
              </ToggleablePanel>
            </div>
          )}
        </div>
        <div>
          <div>
            <strong>{question.answers.length || 0} Answers</strong>
            <HoverableSpan
              style={{ padding: "0px 5px" }}
              onClick={() =>
                // alert("Add Answer functionality will be added soon")
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
