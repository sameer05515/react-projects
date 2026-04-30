import React, { useEffect, useRef, useState } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import ButtonGroup from "../../../../common/components/button-group/ButtonGroup";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import DynamicDataRenderer from "../../../../common/components/dynamic-data-renderer/DynamicDataRenderer";
import FloatingButton from "../../../../common/components/floating-button/FloatingButton";
import Breadcrumbs from "../../../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import ListSection from "../../../../common/components/list-section/ListSection";
import { SmartPreviewer } from "../../../../common/components/Smart/Editor/v3";
import ToggleablePanel from "../../../../common/components/toggleable-panel/ToggleablePanel";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";
import useGlobalServiceProvider from "../../../../common/hooks/useGlobalServiceProvider";
import { formatDateToDDMMMYYYYWithTime, prepareQuestions } from "../../../../common/service/commonService";
import { getTagsForGivenIds } from "../../../../redux/slices/tagsSlice";
import TopicSectionCard from "./TopicSectionCard";

const CARD_CONTAINER_CLASS = "rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden";
const CARD_PADDING_CLASS = "p-4";

const TopicCard = ({
  topic,
  variant = "full", // "full" | "compact"
  showDescription = false,
  selectedSectionId = null,
  topicSections = [],
  pinnedTopics = [],
  isPinned = false,
  onEdit = () => {},
  onTopicTraversal = () => {},
  onAddSubTopic = () => {},
  onChildTopicClick = () => {},
  onMoveAnotherParent = () => {},
  onAncestorClick = () => {},
  onPinTopic = () => {},
  onPublish = null,
  publishing = false,
  publishError = null,
  onAddSection = () => {
    alert("Functionality will be added soon!");
  },
  onEditSection = () => {
    alert("Functionality will be added soon!");
  },
  onTopicSectionClick = () => {
    alert("Topic section click callback not provided.");
  },
  onLinkedTagSelection = () => {},
  onBaseSpanClick = () => {},
  onTopicClick = null, // for compact: navigate to topic view
}) => {
  const { BreadcrumbItemType } = useGlobalServiceProvider();
  const [showDescr, setShowDescr] = useState(showDescription);

  const filteredTags = useSelector(getTagsForGivenIds(topic?.tags || []));

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

  if (variant === "compact") {
    return (
      <div
        className={`${CARD_CONTAINER_CLASS} ${CARD_PADDING_CLASS} cursor-pointer hover:bg-slate-50 transition-colors`}
        role={onTopicClick ? "button" : undefined}
        tabIndex={onTopicClick ? 0 : undefined}
        onClick={onTopicClick ? () => onTopicClick(topic) : undefined}
        onKeyDown={
          onTopicClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTopicClick(topic);
                }
              }
            : undefined
        }
      >
        <h3 className="text-base font-semibold text-slate-800 mb-1.5">
          {topic.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <ListSection
            title=""
            items={filteredTags}
            errorMessage=""
            renderItem={(tag, idx) => (
              <HoverableSpan
                className="bg-slate-100 border border-slate-300 text-slate-800 px-1.5 py-0.5 text-xs rounded inline-block cursor-pointer hover:bg-slate-200 transition-colors"
                key={tag._id || `tag_${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkedTagSelection(tag.uniqueId);
                }}
              >
                {tag.title}
              </HoverableSpan>
            )}
          />
        </div>
        <div className="text-xs text-slate-500">
          {formatDateToDDMMMYYYYWithTime(topic.occurenceDate)}
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_CONTAINER_CLASS} ${CARD_PADDING_CLASS}`}>
      <ButtonGroup
        options={[
          {
            id: 1,
            children: "<<",
            title: "Previous",
            onClick: () => traverseTopic(-1),
          },
          {
            id: 2,
            children: ">>",
            title: "Next",
            onClick: () => traverseTopic(1),
          },
        ]}
      />

      <div>
        <Breadcrumbs providedItem={topic} providedItemType={BreadcrumbItemType.TOPIC} ancestors={topic.ancestors} onAncestorClick={(a) => handleAncestorClick(a)} onBaseSpanClick={onBaseSpanClick} />
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-slate-800">{topic.name}</h3>
          <CustomButton
            className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-xs rounded font-medium"
            onClick={handleAddSubTopic}
          >
            Add subtopics
          </CustomButton>
        </div>
        <div className="text-xs rounded mb-2.5">
          <ListSection
            title="Tags:"
            items={filteredTags}
            errorMessage={"No tags added yet!"}
            renderItem={(tag, idx) => (
              <HoverableSpan className="bg-slate-100 border border-slate-300 text-slate-800 px-1.5 py-0.5 text-xs rounded m-1.5 inline-block cursor-pointer hover:bg-slate-200 transition-colors" key={tag._id || `tag_${idx + 1}`} onClick={() => handleLinkedTagSelection(tag.uniqueId)}>
                {tag.title}
              </HoverableSpan>
            )}
          />
        </div>
        <div className="text-xs rounded mb-2.5">
          <ListSection
            title=""
            items={[
              {
                id: "dates_data_1",
                title: "Occurred",
                data: topic.occurenceDate,
              },
              {
                id: "dates_data_2",
                title: "Created",
                data: topic.occurenceDate,
              },
              {
                id: "dates_data_3",
                title: "Last updated",
                data: topic.occurenceDate,
              },
            ]}
            errorMessage=""
            renderItem={({ id, title, data }, idx) => (
              <span key={id} className="mr-2.5">
                <b>{title}:</b>
                {formatDateToDDMMMYYYYWithTime(data)}
              </span>
            )}
          />
        </div>
      </div>

      <div className="my-2.5">
        <ListSection
          title=""
          errorMessage=""
          items={[
            { title: "Edit", action: handleEdit },
            {
              title: !showDescr ? "Show Description" : "Hide Description",
              action: () => setShowDescr(!showDescr),
            },
            { title: "Add subtopic", action: () => handleAddSubTopic() },
            { title: "Add Section", action: () => handleAddSection() },
            {
              title: "Move to another parent",
              action: () => handleMoveAnotherParent(),
            },
            ...(onPublish && topic
              ? [
                  topic.published
                    ? { title: "Published", action: null, isPublishedLabel: true }
                    : {
                        title: publishing ? "Publishing…" : "Publish",
                        action: () => onPublish(),
                        disabled: publishing,
                      },
                ]
              : []),
            {
              title: isPinned ? "Un-Pin topic" : "Pin topic",
              action: () => handlePinTopic(isPinned),
            },
            {
              title: "Convert to question",
              action: () => console.log("Yet to be implemented!!"),
            },
          ]}
          renderItem={({ title, action, disabled, isPublishedLabel }, idx) => {
            // Primary actions use blue, secondary actions use gray
            const isPrimaryAction = ["Edit", "Add subtopic", "Add Section", "Pin topic", "Publish"].includes(title);
            // const buttonClass = isPrimaryAction && !isPublishedLabel
            //   ? "bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 text-xs rounded mr-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            //   : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-1.5 py-0.5 text-xs rounded mr-2.5 disabled:opacity-60 disabled:cursor-not-allowed";
            const buttonClass = "bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 text-xs rounded mr-2.5 disabled:opacity-60 disabled:cursor-not-allowed";
            if (isPublishedLabel) {
              return (
                <span key={`action_buttons_${idx + 1}`} className="bg-green-100 text-green-800 border border-green-300 px-1.5 py-0.5 text-xs rounded mr-2.5">
                  {title}
                </span>
              );
            }
            return (
              <CustomButton key={`action_buttons_${idx + 1}`} className={buttonClass} onClick={action} disabled={disabled}>
                {title}
              </CustomButton>
            );
          }}
        />
        {publishError && (
          <p className="text-red-600 text-sm mt-1 mb-1" role="alert">
            {publishError}
          </p>
        )}

        <FloatingButton
          buttonClassName="mr-2.5 bg-blue-600 hover:bg-blue-800 text-blue-800 border border-blue-300 text-xs rounded px-2 py-1"
          buttonText={"Show Pinned Topics"}
        >
          <ListSection
            title="List of all pinned Topics:-"
            errorMessage=""
            items={pinnedTopics}
            renderItem={(t) => (
              <div className="ml-4 pb-1" key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTopicClick({ uniqueId: t.linkedUniqueId })}>{t.title}</HoverableSpan>
              </div>
            )}
          />
        </FloatingButton>

        <FloatingButton
          buttonClassName="mr-2.5 bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300 text-xs rounded px-2 py-1"
          buttonText={"?"}
        >
          <div className="p-2.5">
            If this <b>{`${topic.name}`}</b> is a topic, It should answer below questions
          </div>
          {topic.name && <DynamicDataRenderer data={prepareQuestions(topic.name)} />}
        </FloatingButton>
        <br />
      </div>

      <ToggleablePanel
        className="mb-2.5 rounded border border-slate-200 bg-amber-50/80 px-1.5 py-1"
        showContent={topic?.sections?.length > 0}
        title={`Sections [${topic?.sections?.length || 0}]:-`}
      >
        <ListSection
          title=""
          errorMessage="No Sections Added Yet!!"
          items={topic.sections}
          renderItem={(t) => (
            <div className="ml-4 pb-1" key={t.uniqueId}>
              <HoverableSpan onClick={() => onTopicSectionClick(t.uniqueId)}>{t.name}</HoverableSpan>
            </div>
          )}
        />
      </ToggleablePanel>

      <ToggleablePanel
        className="mb-2.5 rounded border border-slate-200 bg-amber-50/80 px-1.5 py-1"
        showContent={topic?.children?.length > 0}
        title={`Child Topics [${topic?.children?.length || 0}]:-`}
      >
        <Tree
          data={topic.children}
          errorMessageOnNoData="No Child Topic Added Yet!!"
          renderNode={(t) => (
            <>
              <HoverableSpan onClick={() => onChildTopicClick(t)}>{t.name}</HoverableSpan>
            </>
          )}
        />
      </ToggleablePanel>

      <ToggleablePanel
        showContent={showDescr}
        title={`${topic.smartContent ? "Smart" : "Raw"} Description:-`}
        className="mb-2.5 w-[67vw] overflow-auto rounded border border-slate-300 p-1"
      >
        {topic.description && !topic.smartContent && (
          // ReactHtmlParser(topic.description || "")
          <SmartPreviewer data={{ content: topic.description || "", textOutputType: "html" }} />
        )}
        {topic.smartContent && <SmartPreviewer data={topic.smartContent} />}
      </ToggleablePanel>

      {topicSections && topicSections.length > 0 ? (
        <ToggleablePanel
          className="mb-2.5 rounded border border-slate-200 px-1.5 py-1"
          showContent={topic?.sections?.length > 0}
          title={`Sections [${topic?.sections?.length || 0}]:-`}
        >
          <ListSection
            title=""
            errorMessage=""
            items={topicSections}
            renderItem={(ts, idx) => (
              <TopicSectionCard
                key={ts?.uniqueId || `section_${idx}`}
                data={ts}
                // tags={tags}
                selectedElementRef={selectedElementRef}
                selectedSectionId={selectedSectionId}
                onEditSection={onEditSection}
                onLinkedTagSelection={handleLinkedTagSelection}
              />
            )}
          />
        </ToggleablePanel>
      ) : null}

      <ButtonGroup
        options={[
          {
            id: 1,
            children: "<<",
            title: "Previous",
            onClick: () => traverseTopic(-1),
          },
          {
            id: 2,
            children: ">>",
            title: "Next",
            onClick: () => traverseTopic(1),
          },
        ]}
      />
    </div>
  );
};

export default TopicCard;
