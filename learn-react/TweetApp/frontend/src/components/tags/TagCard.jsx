import React, { useState } from "react";
import { formatDateToDDMMMYYYYWithTime } from "../../common/service/commonService";
import CustomButton from "../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../common/components/hoverable-span/HoverableSpan";
import ReactHtmlParser from "react-html-parser";
import Breadcrumbs from "../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import { SmartPreviewer } from "../../common/components/smart-editor/SmartEditorV3";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import useGlobalServiceProvider from "../../common/hooks/useGlobalServiceProvider";

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
  const {BreadcrumbItemType}= useGlobalServiceProvider();
  const [showDescr, setShowDescr] = useState(showDescription);

  const handleEdit = () => {
    onEdit(tag);
  };

  const traverseTag = (increment = 0) => {
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
        {sectionsList && sectionsList.length > 0 && (
          <ul style={styles.ulStyle}>
            {sectionsList.map((t) => (
              <li style={styles.liStyles} key={t.uniqueId}>
                {(TagLinkedItemType.topic === type ||
                  TagLinkedItemType.task === type ||
                  TagLinkedItemType.question === type) && (
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
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const populateLinkedItemsV1 = (sectionsList, type = "") => {
    return (
      <>
        {sectionsList && sectionsList.length > 0 && (
          <Tree data={sectionsList} renderNode={(t) => (
            <>
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

              {(
                // TagLinkedItemType.topic === type ||
                // TagLinkedItemType.task === type ||
                TagLinkedItemType.question === type) && (
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
            </>
          )} />
        )}
        <JSONDataViewer metadata={{sectionsList, type}} title="sectionsList"/>
      </>
    );
  }

  const tagStyle = {
    backgroundColor: "#ccc",
    border: "1px solid #999",
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "4px",
  };

  const datesStyle = {
    fontSize: "12px",
    borderRadius: "4px",
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


        <CustomButton
          style={{ ...tagStyle, marginRight: "10px" }}
          onClick={() => handleMoveAnotherParent()}
        >
          Move to another parent
        </CustomButton>

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

      {tag.linkedTopicSections && tag.linkedTopicSections.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Linked Topic Sections:-</b> <br />
          {populateLinkedItems(
            tag.linkedTopicSections,
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

      {tag.linkedQuestions && tag.linkedQuestions.length > 0 && (
        <div style={styles.descriptionStyle}>
          <b>Linked Questions:-</b> <br />
          {populateLinkedItemsV1(tag.linkedQuestions, TagLinkedItemType.question)}
        </div>
      )}

      {showDescr && (
        <div
          style={{
            border: "1px solid #999",
            padding: "2px 5px",
            borderRadius: "4px",
            marginBottom: "10px",
            width: "67vw",
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

      <JSONDataViewer metadata={{ tag }} title="Tag Data" />

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
    fontWeight: "bold",
    fontSize: "22px",
    color: "#e91140",
  },
  ulStyle: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  liStyles: {
    marginLeft: "15px",
    paddingBottom: "3px",
  },
  sectionStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  descriptionStyle: {
    backgroundColor: "lightgoldenrodyellow",
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  topicSectionsStyle: {
    border: "1px solid #999",
    padding: "2px 5px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
};

const TagLinkedItemType = {
  topic: "topic",
  task: "task",
  topicSection: "topic-section",
  question: "question"
};

export default TagCard;
export { TagLinkedItemType };

