import React, { useEffect, useRef, useState } from "react";
import {
  formatDateToDDMMMYYYYWithTime,
  prepareQuestions,
} from "../../../common/service/commonService";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import FloatingButton from "../../../common/components/floating-button/FloatingButton";
import DynamicDataRenderer from "../../../common/components/dynamic-data-renderer/DynamicDataRenderer";
// import { Breadcrumbs } from "./TopicBase";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import { SmartPreviewer } from "../../../common/components/smart-editor/SmartEditorV3";
import Breadcrumbs from "../../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import useGlobalServiceProvider from "../../../common/hooks/useGlobalServiceProvider";

const TopicCard = ({
  topic,
  tags = [],
  showDescription = false,
  selectedSectionId = null,
  topicSections = [],
  pinnedTopics = [],
  isPinned = false,
  onEdit = () => { },
  onTopicTraversal = () => { },
  onAddSubTopic = () => { },
  onChildTopicClick = () => { },
  onMoveAnotherParent = () => { },
  onAncestorClick = () => { },
  onPinTopic = () => { },
  onAddSection = () => {
    alert("Functionality will be added soon!");
  },
  onEditSection = () => {
    alert("Functionality will be added soon!");
  },
  onTopicSectionClick = () => {
    alert("Topic section click callback not provided.");
  },
  onLinkedTagSelection = () => { },
  onBaseSpanClick = () => { },
}) => {
  const {BreadcrumbItemType}= useGlobalServiceProvider();
  const [showDescr, setShowDescr] = useState(showDescription);
  const filteredTags = topic.tags?.map((uniqueId) =>
    tags.find((tag) => tag.uniqueId === uniqueId)
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
    onEdit(topic);
  };

  const traverseTopic = (increment = 0) => {
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

  const handlePinTopic = (isPinned) => {
    onPinTopic(topic, isPinned);
  };

  const handleAncestorClick = (ancestor) => {
    onAncestorClick(ancestor);
  };

  const handleLinkedTagSelection = (linkedTagUID) => {
    onLinkedTagSelection(linkedTagUID);
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
          providedItem={topic}
          providedItemType={BreadcrumbItemType.TOPIC}
          ancestors={topic.ancestors}
          onAncestorClick={(a) => handleAncestorClick(a)}
          onBaseSpanClick={onBaseSpanClick}
        />
        <h3>{topic.name}</h3> <br />
        <div style={{ ...datesStyle, }}>
          <b>Tags: </b> {filteredTags?.length > 0 ? '' : 'No tags added yet!'}
          {filteredTags.map(
            (tag) =>
              tag && (
                <HoverableSpan
                  style={{ ...tagStyle, margin: '5px' }}
                  key={tag._id}
                  onClick={() => handleLinkedTagSelection(tag.uniqueId)}
                >
                  {tag.title}
                </HoverableSpan>
              )
          )}
        </div>
        {/* <p>{topic.ancestors&& topic.ancestors.length>0 ? JSON.stringify(topic.ancestors):"Iss topic ka baap kon??"}</p> */}
        {/* </div> */}
        {/* <h1>selectedSectionId: {`${selectedSectionId}`}</h1> */}
        <div style={datesStyle}>
          <span style={{ marginRight: "10px" }}>
            <b>Occurred:</b> {formatDateToDDMMMYYYYWithTime(topic.occurenceDate)}
          </span>
          <span style={{ marginRight: "10px" }}>
            <b>Created:</b> {formatDateToDDMMMYYYYWithTime(topic.createdDate)}
          </span>
          <span>
            <b>Last updated:</b> {formatDateToDDMMMYYYYWithTime(topic.updatedDate)}
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
          onClick={() => handlePinTopic(isPinned)}
        >
          {isPinned ? "Un-Pin" : "Pin"} topic
        </CustomButton>

        <CustomButton
        style={{ ...tagStyle, marginRight: "10px" }}>
          Convert to question
        </CustomButton>

        <FloatingButton
          buttonStyle={{ ...tagStyle, marginRight: "10px" }}
          buttonText={"Show Pinned Topics"}
        >
          <div style={{ padding: "10px" }}>
            <b>List of all pinned Topics:-</b>
          </div>
          {pinnedTopics && pinnedTopics.length > 0 && (
            // <DynamicDataRenderer data={pinnedTopics} />
            <ul style={styles.ulStyle}>
              {pinnedTopics.map((t) => (
                <li style={styles.liStyles} key={t.uniqueId}>
                  <HoverableSpan
                    onClick={() =>
                      onChildTopicClick({ uniqueId: t.linkedUniqueId })
                    }
                  >
                    {t.title}
                  </HoverableSpan>
                </li>
              ))}
            </ul>
          )}
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
          <ToggleablePanel showContent={true} title={"Sections:-"}>
            {populateSections(topic.sections)}
          </ToggleablePanel>
          {/* <b></b> <br /> */}
        </div>
      )}

      {topic.children && topic.children.length > 0 && (
        <div style={styles.descriptionStyle}>
          <ToggleablePanel showContent={true} title={"Child Topics:-"}>
            <Tree data={topic.children} renderNode={(t) =>
              <>
                <HoverableSpan onClick={() => onChildTopicClick(t)}>
                  {t.name}
                </HoverableSpan>
              </>
            } />
          </ToggleablePanel>
          {/* <b>Child Topics:-</b> <br /> */}
          {/* {populateChildren(topic.children)} */}

        </div>
      )}

      {showDescr && (
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
          <ToggleablePanel showContent={true} title={`${topic.smartContent ? "Smart" : "Raw"} Description:-`}>
            {topic.description &&
              !topic.smartContent &&
              ReactHtmlParser(topic.description || "")}
            {topic.smartContent && <SmartPreviewer data={topic.smartContent} />}
          </ToggleablePanel>

          {/* </div>
          <b>{topic.smartContent ? "Smart" : "Raw"} Description:-</b> <br /> */}

        </div>
      )}


      {topicSections && topicSections.length > 0 && (
        <div style={styles.topicSectionsStyle}>
          <ToggleablePanel showContent={true} title={"Sections:-"}>
            {topicSections.map((ts, idx) => (
              <TopicSectionCard
                key={ts?.uniqueId || `section_${idx}`}
                data={ts}
                tags={tags}
                selectedElementRef={selectedElementRef}
                selectedSectionId={selectedSectionId}
                tagStyle={tagStyle}
                onEditSection={onEditSection}
                onLinkedTagSelection={handleLinkedTagSelection}
              />
            ))}
          </ToggleablePanel>
          {/* <b>Sections:-</b> <br />
          <ol>

          </ol> */}
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

const TopicSectionCard = ({
  data: ts,
  tags = [],
  selectedElementRef,
  selectedSectionId,
  tagStyle,
  onEditSection = () => { },
  onLinkedTagSelection = () => { },
}) => {
  const handleLinkedTagSelection = (linkedTagUID) => {
    onLinkedTagSelection(linkedTagUID);
  };

  const filteredTags =
    ts?.tags?.map((uniqueId) =>
      tags.find((tag) => tag.uniqueId === uniqueId)
    ) || [];

  if (!ts || !ts.name) {
    return <>Section data is null</>
  }

  return (
    <>
      <ToggleablePanel title={ts.name} showContent={true}>
        <div
          key={ts.uniqueId}
          style={{
            border: "1px solid #999", // Grey border
            padding: "2px 5px", // Adjust padding as needed
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <span
            ref={selectedSectionId === ts.uniqueId ? selectedElementRef : null}
          >
            {/* <h3>{ts.name}</h3> */}
          </span>

          <div style={{ margin: "10px 0" }}>
            <CustomButton
              style={{ ...tagStyle, marginRight: "10px" }}
              onClick={() => onEditSection(ts.uniqueId)}
            >
              Edit
            </CustomButton>
            <CustomButton style={{ ...tagStyle, marginRight: "10px" }}>
              {" "}
              Move up
            </CustomButton>
            <CustomButton style={{ ...tagStyle, marginRight: "10px" }}>
              {" "}
              Move down
            </CustomButton>
          </div>

          <SmartPreviewer data={ts.smartContent} />

          {filteredTags && filteredTags.length > 0 && (
            <div
              style={{
                backgroundColor: "lemonchiffon",
                border: "1px solid #999", // Grey border
                padding: "2px 5px", // Adjust padding as needed
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              <ToggleablePanel title="Tags:-">
                {filteredTags.map(
                  (tag) =>
                    tag && (
                      <HoverableSpan
                        style={{ ...styles.tagStyle, margin: '5px' }}
                        key={tag._id}
                        onClick={() => handleLinkedTagSelection(tag.uniqueId)}
                      >
                        {tag.title}
                      </HoverableSpan>
                    )
                )}
              </ToggleablePanel>
              {/* <b>Tags:-</b> <br /> */}

            </div>
          )}

        </div>
      </ToggleablePanel>

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
  },
};

export default TopicCard;
