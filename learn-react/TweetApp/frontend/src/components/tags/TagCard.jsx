import React, { useState } from "react";
import { formatDateToDDMMMYYYYWithTime } from "../../common/commonService";
import CustomButton from "../../common/components/CustomButton";
import HoverableSpan from "../../common/components/HoverableSpan";
import ReactHtmlParser from "react-html-parser";
import Breadcrumbs, {
  BreadcrumbItemType,
} from "../../common/components/GlobalBreadcrumb";
import { SmartPreviewer } from "../../common/components/SmartEditor";

const TagCard = ({
  tag,
  showDescription = false,
  onEdit = () => { },
  onTagTraversal = () => { },
  onAddSubTag = () => { },
  onChildTagClick = () => { },
  onMoveAnotherParent = () => { },
  onAncestorClick = () => { },
  onLinkedItemClick = () => { },
  onBaseSpanClick = () => { },
}) => {
  const [showDescr, setShowDescr] = useState(showDescription);

  const handleEdit = () => {
    // console.log(`Edit : ${JSON.stringify(tag)}`);
    // console.log(`typeof onEdit: ${typeof onEdit}`);
    onEdit(tag);
  };

  const traverseTag = (increment = 0) => {
    // console.log(`Soon tag will traverse and show data with increment: ${increment}`);
    onTagTraversal(increment);
  };

  const handleAddSubTag = () => {
    onAddSubTag(tag);
  };

  const handleMoveAnotherParent = () => {
    onMoveAnotherParent(tag);
  };

  const handleAncestorClick = (ancestor) => {
    onAncestorClick(ancestor);
  };

  const populateChildren = (childTagList) => {
    return (
      <>
        {childTagList && childTagList.length > 0 && (
          <ul style={styles.ulStyle}>
            {childTagList.map((t) => (
              <li style={styles.liStyles} key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTagClick(t)}>
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

  const populateLinkedItems = (sectionsList, type = "") => {
    return (
      <>
        {/* <pre>{JSON.stringify(sectionsList, null, 2)}</pre> */}
        {sectionsList && sectionsList.length > 0 && (
          <ul style={styles.ulStyle}>
            {sectionsList.map((t) => (
              <li style={styles.liStyles} key={t.uniqueId}>
                {(TagLinkedItemType.topic === type ||
                  TagLinkedItemType.task === type) && (
                    <HoverableSpan
                      onClick={() =>
                        onLinkedItemClick({ uniqueId: t.uniqueId }, type)
                      }
                    >
                      {t.name}
                    </HoverableSpan>
                  )}

                {TagLinkedItemType.topicSection === type && (
                  <HoverableSpan
                    onClick={() =>
                      onLinkedItemClick(
                        {
                          linkedTopicUniqueId: t.linkedTopicUniqueId,
                          uniqueId: t.uniqueId,
                        },
                        type
                      )
                    }
                  >
                    {t.name}
                  </HoverableSpan>
                )}
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
          onClick={() => traverseTag(-1)}
        >
          Previous
        </CustomButton>
        <CustomButton style={tagStyle} onClick={() => traverseTag(1)}>
          Next
        </CustomButton>
      </div>

      <div>
        {/* <div> */}
        <Breadcrumbs
          providedItem={tag}
          providedItemType={BreadcrumbItemType.TAG}
          ancestors={tag.ancestors}
          onAncestorClick={(a) => handleAncestorClick(a)}
          onBaseSpanClick={onBaseSpanClick}
        />
        <h3>{tag.name}</h3> <br />
        {/* <p>{tag.ancestors&& tag.ancestors.length>0 ? JSON.stringify(tag.ancestors):"Iss tag ka baap kon??"}</p> */}
        {/* </div> */}
        {/* <h1>selectedSectionId: {`${selectedSectionId}`}</h1> */}
        <div style={datesStyle}>
          <span style={{ marginRight: "10px" }}>
            <b>Created:</b> {formatDateToDDMMMYYYYWithTime(tag.createdDate)}
          </span>
          <span>
            <b>Last updated:</b>{" "}
            {formatDateToDDMMMYYYYWithTime(tag.updatedDate)}
          </span>
        </div>
      </div>
      {/* <p style={{ whiteSpace: "pre-line" }}>{tag.description}</p> */}
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
          onClick={() => handleAddSubTag()}
        >
          Add Sub-Tag
        </CustomButton>

        {/* <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleAddSection()}
        >
          Add Section
        </CustomButton> */}

        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleMoveAnotherParent()}
        >
          Move to another parent
        </CustomButton>

        {/* <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handlePinTopic(isPinned)}
        >
          {isPinned?'Un-Pin':'Pin'} tag
        </CustomButton> */}

        {/* <FloatingButton
          buttonStyle={{ ...tagStyle, marginRight: "10px" }}
          buttonText={"Show Pinned Topics"}
        >
          <div style={{ padding: "10px" }}>
            <b>List of all pinned Topics:-</b> 
          </div>
          {pinnedTopics && pinnedTopics.length > 0 && (
            <ul style={styles.ulStyle}>
              {pinnedTopics.map((t) => (
                <li style={styles.liStyles} key={t.uniqueId}>
                  <HoverableSpan onClick={() => onChildTopicClick({uniqueId: t.linkedUniqueId})}>
                    {t.name}
                  </HoverableSpan>
                </li>
              ))}
            </ul>
          )}
        </FloatingButton> */}

        {/* <FloatingButton
          buttonStyle={{ ...tagStyle, marginRight: "10px" }}
          buttonText={"?"}
        >
          <div style={{ padding: "10px" }}>
            If this <b>{`${tag.name}`}</b> is a tag, It should answer below
            questions
          </div>
          {tag.name && (
            <DynamicDataRenderer data={prepareQuestions(tag.name)} />
          )}
        </FloatingButton> */}
        <br />
      </div>

      {tag.children && tag.children.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Child Tags:-</b> <br />
          {populateChildren(tag.children)}
        </div>
      )}

      {tag.linkedTopics && tag.linkedTopics.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Linked Topics:-</b> <br />
          {populateLinkedItems(tag.linkedTopics, TagLinkedItemType.topic)}
        </div>
      )}

      {tag.linkedSections && tag.linkedSections.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Linked Topic Sections:-</b> <br />
          {populateLinkedItems(
            tag.linkedSections,
            TagLinkedItemType.topicSection
          )}
        </div>
      )}

      {tag.linkedTasks && tag.linkedTasks.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Linked Tasks:-</b> <br />
          {populateLinkedItems(tag.linkedTasks, TagLinkedItemType.task)}
        </div>
      )}

      {showDescr && (
        <div
          style={{
            border: "1px solid #999", // Grey border
            padding: "2px 5px", // Adjust padding as needed
            borderRadius: "4px",
            marginBottom: "10px",
            width: "77vw",
            overflow: "auto",
          }}
        >
          <b>{tag.smartContent ? "Smart" : "Raw"} Description:-</b> <br />
          {tag.description &&
            !tag.smartContent &&
            ReactHtmlParser(tag.description || "")}
          {tag.smartContent && <SmartPreviewer data={tag.smartContent} />}
        </div>
      )}

      <div>
        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => traverseTag(-1)}
        >
          Previous
        </CustomButton>
        <CustomButton style={tagStyle} onClick={() => traverseTag(1)}>
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
  },
};

const TagLinkedItemType = {
  topic: "topic",
  task: "task",
  topicSection: "topic-section",
};

export default TagCard;
export { TagLinkedItemType };

