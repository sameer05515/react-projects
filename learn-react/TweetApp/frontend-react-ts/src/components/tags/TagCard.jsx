import React, { useState } from "react";
import { formatDateToDDMMMYYYYWithTime } from "../../common/service/commonService";
import CustomButton from "../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../common/components/hoverable-span/HoverableSpan";
// import ReactHtmlParser from "react-html-parser";
import Breadcrumbs from "../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import { SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import useGlobalServiceProvider from "../../common/hooks/useGlobalServiceProvider";

const TagCard = ({
  tag,
  showDescription = false,
  onEdit = () => {},
  onTagTraversal = () => {},
  onAddSubTag = () => {},
  onChildTagClick = () => {},
  onMoveAnotherParent = () => {},
  onAncestorClick = () => {},
  onLinkedItemClick = () => {},
  onBaseSpanClick = () => {},
}) => {
  const { BreadcrumbItemType } = useGlobalServiceProvider();
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
          <ul className="list-none pl-0">
            {childTagList.map((t) => (
              <li className="ml-4 pb-1" key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTagClick(t)}>{t.name}</HoverableSpan>
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
          <ul className="list-none pl-0">
            {sectionsList.map((t) => (
              <li className="ml-4 pb-1" key={t.uniqueId}>
                {(TagLinkedItemType.topic === type || TagLinkedItemType.task === type || TagLinkedItemType.question === type) && <HoverableSpan onClick={() => onLinkedItemClick({ uniqueId: t.uniqueId }, type)}>{t.name}</HoverableSpan>}

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
          <Tree
            data={sectionsList}
            renderNode={(t) => (
              <>
                {(TagLinkedItemType.topic === type || TagLinkedItemType.task === type) && <HoverableSpan onClick={() => onLinkedItemClick({ uniqueId: t.uniqueId }, type)}>{t.name}</HoverableSpan>}

                {// TagLinkedItemType.topic === type ||
                // TagLinkedItemType.task === type ||
                TagLinkedItemType.question === type && <HoverableSpan onClick={() => onLinkedItemClick({ uniqueId: t.uniqueId }, type)}>{t.name}</HoverableSpan>}

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
            )}
          />
        )}
        <JSONDataViewer metadata={{ sectionsList, type }} title="sectionsList" />
      </>
    );
  };

  // Tailwind classes for tag buttons
  const tagButtonClass = "bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded";

  return (
    <>
      <div className="mb-2.5">
        <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => traverseTag(-1)}>
          Previous
        </CustomButton>
        <CustomButton className={tagButtonClass} onClick={() => traverseTag(1)}>
          Next
        </CustomButton>
      </div>

      <div className="mb-4">
        <Breadcrumbs providedItem={tag} providedItemType={BreadcrumbItemType.TAG} ancestors={tag.ancestors} onAncestorClick={(a) => handleAncestorClick(a)} onBaseSpanClick={onBaseSpanClick} />
        <h3 className="text-xl font-semibold mb-2">{tag.name}</h3>
        <div className="text-xs rounded">
          <span className="mr-2.5">
            <b>Created:</b> {formatDateToDDMMMYYYYWithTime(tag.createdDate)}
          </span>
          <span>
            <b>Last updated:</b> {formatDateToDDMMMYYYYWithTime(tag.updatedDate)}
          </span>
        </div>
      </div>

      <div className="my-2.5 flex flex-wrap gap-2">
        <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={handleEdit}>
          Edit
        </CustomButton>
        {!showDescr && (
          <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => setShowDescr(true)}>
            Show Description
          </CustomButton>
        )}
        {showDescr && (
          <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => setShowDescr(false)}>
            Hide Description
          </CustomButton>
        )}
        <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => handleAddSubTag()}>
          Add Sub-Tag
        </CustomButton>

        <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => handleMoveAnotherParent()}>
          Move to another parent
        </CustomButton>
      </div>

      {tag.children && tag.children.length > 0 && (
        <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
          <b>Child Tags:-</b> <br />
          {populateChildren(tag.children)}
        </div>
      )}

      {tag.linkedTopics && tag.linkedTopics.length > 0 && (
        <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
          <b>Linked Topics:-</b> <br />
          {populateLinkedItems(tag.linkedTopics, TagLinkedItemType.topic)}
        </div>
      )}

      {tag.linkedTopicSections && tag.linkedTopicSections.length > 0 && (
        <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
          <b>Linked Topic Sections:-</b> <br />
          {populateLinkedItems(tag.linkedTopicSections, TagLinkedItemType.topicSection)}
        </div>
      )}

      {tag.linkedTasks && tag.linkedTasks.length > 0 && (
        <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
          <b>Linked Tasks:-</b> <br />
          {populateLinkedItems(tag.linkedTasks, TagLinkedItemType.task)}
        </div>
      )}

      {tag.linkedQuestions && tag.linkedQuestions.length > 0 && (
        <div className="bg-yellow-50 border border-gray-600 px-1.5 py-0.5 rounded mb-2.5">
          <b>Linked Questions:-</b> <br />
          {populateLinkedItemsV1(tag.linkedQuestions, TagLinkedItemType.question)}
        </div>
      )}

      {showDescr && (
        <div className="border border-gray-600 px-1.5 py-0.5 rounded mb-2.5 w-[67vw] overflow-auto">
          <b>{tag.smartContent ? "Smart" : "Raw"} Description:-</b> <br />
          {
            tag.description && !tag.smartContent && <SmartPreviewer data={{ content: tag.description || "", textOutputType: "html" }} />

            // ReactHtmlParser(tag.description || "")
          }
          {tag.smartContent && <SmartPreviewer data={tag.smartContent} />}
        </div>
      )}

      <JSONDataViewer metadata={{ tag }} title="Tag Data" />

      <div className="mt-4">
        <CustomButton className={`${tagButtonClass} mr-2.5`} onClick={() => traverseTag(-1)}>
          Previous
        </CustomButton>
        <CustomButton className={tagButtonClass} onClick={() => traverseTag(1)}>
          Next
        </CustomButton>
      </div>
    </>
  );
};

const TagLinkedItemType = {
  topic: "topic",
  task: "task",
  topicSection: "topic-section",
  question: "question",
};

export default TagCard;
export { TagLinkedItemType };
