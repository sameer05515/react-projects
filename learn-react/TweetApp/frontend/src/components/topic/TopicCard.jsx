import React, { useEffect, useRef, useState } from "react";
import {
  formatDateToDDMMMYYYY,
  prepareQuestions,
} from "../../common/commonService";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../../common/components/CustomButton";
import FloatingButton from "../../common/components/FloatingButton";
import DynamicDataRenderer from "../../common/components/DynamicDataRenderer";
import { Breadcrumbs } from "./TopicBase";
import HoverableSpan from "../../common/components/HoverableSpan";
import { SmartPreviewer } from "../../common/components/SmartEditor";

const TopicCard = ({
  topic,
  tags = [],
  showDescription = false,
  selectedSectionId = null,
  topicSections = [],
  pinnedTopics=[],
  onEdit = () => { },
  onTopicTraversal = () => { },
  onAddSubTopic = () => { },
  onChildTopicClick = () => { },
  onMoveAnotherParent = () => { },
  onAncestorClick = () => { },
  onAddSection = () => {
    alert("Functionality will be added soon!");
  },
  onEditSection = () => {
    alert("Functionality will be added soon!");
  },
  onTopicSectionClick = () => {
    alert("Topic section click callback not provided.");
  },
}) => {
  const [showDescr, setShowDescr] = useState(showDescription);
  const filteredTags = topic.tags?.map((tagId) =>
    tags.find((tag) => tag.tagId === tagId)
  );

  const selectedElementRef = useRef(null);

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedSectionId]);

  const handleEdit = () => {
    // console.log(`Edit : ${JSON.stringify(topic)}`);
    // console.log(`typeof onEdit: ${typeof onEdit}`);
    onEdit(topic);
  };

  const traverseTopic = (increment = 0) => {
    // console.log(`Soon topic will traverse and show data with increment: ${increment}`);
    onTopicTraversal(increment);
  };

  const handleAddSubTopic = () => {
    onAddSubTopic(topic);
  };

  const handleAddSection = () => {
    onAddSection(topic);
  };

  const handleMoveAnotherParent = () => {
    onMoveAnotherParent(topic);
  };

  const handleAncestorClick = (ancestor) => {
    onAncestorClick(ancestor);
  };

  const populateChildren = (childTopicList) => {
    return (
      <>
        {childTopicList && childTopicList.length > 0 && (
          <ul style={styles.ulStyle}>
            {childTopicList.map((t) => (
              <li style={styles.liStyles} key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTopicClick(t)}>
                  {t.name}
                </HoverableSpan>
                {populateChildren(t.children)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const populateSections = (sectionsList) => {
    return (
      <>
        {/* <pre>{JSON.stringify(sectionsList, null, 2)}</pre> */}
        {sectionsList && sectionsList.length > 0 && (
          <ul style={styles.ulStyle}>
            {sectionsList.map((t) => (
              <li style={styles.liStyles} key={t.uniqueId}>
                <HoverableSpan onClick={() => onTopicSectionClick(t.uniqueId)}>
                  {t.name}
                </HoverableSpan>
                {/* {populateChildren(t.children)} */}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const tagStyle = {
    backgroundColor: "#ccc", // Grey background color
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
  };

  const datesStyle = {
    //padding: "10px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    //margin: "10px",
  };

  return (
    <>
      <div>
        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => traverseTopic(-1)}
        >
          Previous
        </CustomButton>
        <CustomButton style={tagStyle} onClick={() => traverseTopic(1)}>
          Next
        </CustomButton>
      </div>

      <div>
        {/* <div> */}
        <Breadcrumbs
          topic={topic}
          ancestors={topic.ancestors}
          onAncestorClick={(a) => handleAncestorClick(a)}
        />
        <h3>{topic.name}</h3> <br />
        {/* <p>{topic.ancestors&& topic.ancestors.length>0 ? JSON.stringify(topic.ancestors):"Iss topic ka baap kon??"}</p> */}
        {/* </div> */}
        {/* <h1>selectedSectionId: {`${selectedSectionId}`}</h1> */}
        <div style={datesStyle}>
          <span style={{ marginRight: "10px" }}>
            <b>Occurred:</b> {formatDateToDDMMMYYYY(topic.occurenceDate)}
          </span>
          <span style={{ marginRight: "10px" }}>
            <b>Created:</b> {formatDateToDDMMMYYYY(topic.createdDate)}
          </span>
          <span>
            <b>Last updated:</b> {formatDateToDDMMMYYYY(topic.updatedDate)}
          </span>
        </div>
      </div>
      {/* <p style={{ whiteSpace: "pre-line" }}>{topic.description}</p> */}
      {/* Add Edit and Show Description buttons */}
      <div style={{ margin: "10px 0" }}>
        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={handleEdit}
        >
          Edit
        </CustomButton>
        {!showDescr && (
          <CustomButton
            style={{ ...tagStyle, marginRight: "10px" }}
            onClick={() => setShowDescr(true)}
          >
            Show Description
          </CustomButton>
        )}
        {showDescr && (
          <CustomButton
            style={{ ...tagStyle, marginRight: "10px" }}
            onClick={() => setShowDescr(false)}
          >
            Hide Description
          </CustomButton>
        )}
        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleAddSubTopic()}
        >
          Add subtopic
        </CustomButton>

        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleAddSection()}
        >
          Add Section
        </CustomButton>

        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleMoveAnotherParent()}
        >
          Move to another parent
        </CustomButton>

        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => alert('Pinning a topic will be shown soon!!')}
        >
          Pin topic
        </CustomButton>

        <FloatingButton
          buttonStyle={{ ...tagStyle, marginRight: "10px" }}
          buttonText={"Show Pinned Topics"}
        >
          <div style={{ padding: "10px" }}>
            Soon all pinned Topics will be shown
          </div>
          {/* {topic.name && (
            <DynamicDataRenderer data={prepareQuestions(topic.name)} />
          )} */}
        </FloatingButton>

        <FloatingButton
          buttonStyle={{ ...tagStyle, marginRight: "10px" }}
          buttonText={"?"}
        >
          <div style={{ padding: "10px" }}>
            If this <b>{`${topic.name}`}</b> is a topic, It should answer below
            questions
          </div>
          {topic.name && (
            <DynamicDataRenderer data={prepareQuestions(topic.name)} />
          )}
        </FloatingButton>
        <br />
      </div>

      {topic.sections && topic.sections.length > 0 && (
        <div style={styles.sectionStyle}>
          <b>Sections:-</b> <br />
          {populateSections(topic.sections)}
        </div>
      )}

      {topic.children && topic.children.length > 0 && (
        <div
          style={styles.descriptionStyle}
        >
          <b>Child Topics:-</b> <br />
          {populateChildren(topic.children)}
        </div>
      )}

      {showDescr &&
        <div
          style={{
            border: "1px solid #999", // Grey border
            padding: "2px 5px", // Adjust padding as needed
            borderRadius: "4px",
            marginBottom: "10px",
            width: '77vw',
            overflow: 'auto'
          }}>
          <b>{topic.smartContent ? "Smart" : "Raw"} Description:-</b> <br />
          {topic.description && !topic.smartContent && ReactHtmlParser(topic.description || "")}
          {topic.smartContent && <SmartPreviewer data={topic.smartContent} />}
        </div>
      }
      {filteredTags.map(
        (tag) =>
          tag && (
            <span style={tagStyle} key={tag._id}>
              {tag.name}
            </span>
          )
      )}

      {topicSections && topicSections.length > 0 && (
        <div
          style={styles.topicSectionsStyle}
        >
          <b>Sections:-</b> <br />
          <ol>
            {topicSections.map((ts) => (
              <li
                key={ts.uniqueId}
                style={{
                  border: "1px solid #999", // Grey border
                  padding: "2px 5px", // Adjust padding as needed
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              >
                <span ref={
                  selectedSectionId === ts.uniqueId
                    ? selectedElementRef
                    : null
                }>
                  <h3>{ts.name}</h3>
                </span>

                <div style={{ margin: "10px 0" }}>
                  <CustomButton
                    style={{ ...tagStyle, marginRight: "10px" }}
                    onClick={() => onEditSection(ts.uniqueId)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton style={{ ...tagStyle, marginRight: "10px" }}> Move up</CustomButton>
                  <CustomButton style={{ ...tagStyle, marginRight: "10px" }}> Move down</CustomButton>
                </div>

                <SmartPreviewer data={ts.smartContent} />

                {/* <pre>{`${JSON.stringify(ts.smartContent, null, 2)}`}</pre> */}
              </li>
            ))}
          </ol>
        </div>
      )}



      <div>
        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => traverseTopic(-1)}
        >
          Previous
        </CustomButton>
        <CustomButton style={tagStyle} onClick={() => traverseTopic(1)}>
          Next
        </CustomButton>
      </div>
    </>
  );
};

const styles = {
  selected: {
    fontWeight: "bold" /* Make selected link text bold */,
    fontSize: "22px" /* Increase font size for selected link */,
    color: "#e91140",
  },
  ulStyle: {
    listStyleType: "none", // Remove bullets
    paddingLeft: 0, // Remove left padding
  },
  liStyles: {
    marginLeft: "15px", // Add some space between list items
    paddingBottom: "3px",
  },
  sectionStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    borderRadius: "4px",
    marginBottom: "10px",
  },
  descriptionStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    borderRadius: "4px",
    marginBottom: "10px",
  },
  topicSectionsStyle: {
    // backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    borderRadius: "4px",
    marginBottom: "10px",
  }
};

export default TopicCard;
