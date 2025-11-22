import React, { useState } from "react";
import { formatDateToDDMMMYYYYWithTime } from "../../common/service/commonService";
import CustomButton from "../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../common/components/hoverable-span/HoverableSpan";
// import ReactHtmlParser from "react-html-parser";
import Breadcrumbs from "../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import { SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
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
          <ul className="list-none pl-0 space-y-1">
            {childTagList.map((t) => (
              <li key={t.uniqueId} className="pl-2">
                <HoverableSpan
                  onClick={() => onChildTagClick(t)}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
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
          <ul className="list-none pl-0 space-y-1">
            {sectionsList.map((t) => (
              <li key={t.uniqueId} className="pl-2">
                {(TagLinkedItemType.topic === type || TagLinkedItemType.task === type || TagLinkedItemType.question === type) && (
                  <HoverableSpan
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={() => onLinkedItemClick({ uniqueId: t.uniqueId }, type)}
                  >
                    {t.name}
                  </HoverableSpan>
                )}
                {TagLinkedItemType.topicSection === type && (
                  <HoverableSpan
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={() =>
                      onLinkedItemClick(
                        { linkedTopicUniqueId: t.linkedTopicUniqueId, uniqueId: t.uniqueId },
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

  // Tailwind classes for tag buttons
  const tagButtonClass =
    "px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  return (
    <>
      <div className="mb-2.5 flex flex-wrap gap-2">
        <CustomButton className={tagButtonClass} onClick={() => traverseTag(-1)}>
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
        <CustomButton className={tagButtonClass} onClick={handleEdit}>
          Edit
        </CustomButton>
        {!showDescr && (
          <CustomButton className={tagButtonClass} onClick={() => setShowDescr(true)}>
            Show Description
          </CustomButton>
        )}
        {showDescr && (
          <CustomButton className={tagButtonClass} onClick={() => setShowDescr(false)}>
            Hide Description
          </CustomButton>
        )}
        <CustomButton className={tagButtonClass} onClick={() => handleAddSubTag()}>
          Add Sub-Tag
        </CustomButton>
        <CustomButton className={tagButtonClass} onClick={() => handleMoveAnotherParent()}>
          Move to another parent
        </CustomButton>
      </div>

      {tag.children && tag.children.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Child Tags</h3>
          {populateChildren(tag.children)}
        </section>
      )}

      {tag.linkedTopics && tag.linkedTopics.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Linked Topics</h3>
          {populateLinkedItems(tag.linkedTopics, TagLinkedItemType.topic)}
        </section>
      )}

      {tag.linkedTopicSections && tag.linkedTopicSections.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Linked Topic Sections</h3>
          {populateLinkedItems(tag.linkedTopicSections, TagLinkedItemType.topicSection)}
        </section>
      )}

      {tag.linkedTasks && tag.linkedTasks.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Linked Tasks</h3>
          {populateLinkedItems(tag.linkedTasks, TagLinkedItemType.task)}
        </section>
      )}

      {tag.linkedQuestions && tag.linkedQuestions.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Linked Questions</h3>
          {populateLinkedItems(tag.linkedQuestions, TagLinkedItemType.question)}
        </section>
      )}

      {showDescr && (
        <section className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 w-full max-w-4xl overflow-auto mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            {tag.smartContent ? "Smart" : "Raw"} Description
          </h3>
          {tag.description && !tag.smartContent && (
            <SmartPreviewer data={{ content: tag.description || "", textOutputType: "html" }} />
          )}
          {tag.smartContent && <SmartPreviewer data={tag.smartContent} />}
        </section>
      )}

      <JSONDataViewer metadata={{ tag }} title="Tag Data" />

      <div className="mt-4 flex flex-wrap gap-2">
        <CustomButton className={tagButtonClass} onClick={() => traverseTag(-1)}>
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
