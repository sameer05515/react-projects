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

type TopicNode = {
  uniqueId: string;
  name: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TopicNode[];
  sections?: Array<{ uniqueId: string; name: string }>;
  description?: string;
  smartContent?: any;
  occurenceDate?: string;
  tags?: string[];
  _id?: string;
};

type TopicCardProps = {
  topic: TopicNode;
  showDescription?: boolean;
  selectedSectionId?: string | null;
  topicSections?: any[];
  pinnedTopics?: any[];
  isPinned?: boolean;
  onEdit?: (topic: TopicNode) => void;
  onTopicTraversal?: (increment: number) => void;
  onAddSubTopic?: (topic: TopicNode) => void;
  onChildTopicClick?: (topic: TopicNode) => void;
  onMoveAnotherParent?: (topic: TopicNode) => void;
  onAncestorClick?: (ancestor: any) => void;
  onPinTopic?: (topic: TopicNode, isPinned: boolean) => void;
  onAddSection?: (topic: TopicNode) => void;
  onEditSection?: (sectionUniqueId: string) => void;
  onTopicSectionClick?: (sectionUniqueId: string) => void;
  onLinkedTagSelection?: (tagUid: string) => void;
  onBaseSpanClick?: () => void;
};

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
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
}) => {
  const { BreadcrumbItemType } = useGlobalServiceProvider();
  const [showDescr, setShowDescr] = useState(showDescription);

  const filteredTags = useSelector(getTagsForGivenIds(topic?.tags || []));

  const selectedElementRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
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
        ] as any}
      />

      <div>
        <Breadcrumbs providedItem={topic as any} providedItemType={BreadcrumbItemType.TOPIC as any} ancestors={topic.ancestors as any} onAncestorClick={(a) => handleAncestorClick(a)} onBaseSpanClick={onBaseSpanClick} />
        <h3>{topic.name}</h3>
        <div className="text-xs rounded mb-2.5">
          <ListSection
            title="Tags:"
            items={filteredTags}
            errorMessage={"No tags added yet!"}
            renderItem={(tag, idx) => (
              <HoverableSpan className="bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded m-1.5 inline-block cursor-pointer hover:bg-gray-400 transition-colors" key={tag._id || `tag_${idx + 1}`} onClick={() => handleLinkedTagSelection(tag.uniqueId)}>
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
            {
              title: isPinned ? "Un-Pin topic" : "Pin topic",
              action: () => handlePinTopic(isPinned),
            },
            {
              title: "Convert to question",
              action: () => console.log("Yet to be implemented!!"),
            },
          ]}
          renderItem={({ title, action }, idx) => (
            <CustomButton key={`action_buttons_${idx + 1}`} className="bg-gray-300 border border-gray-600 px-1.5 py-0.5 text-xs rounded mr-2.5" onClick={action}>
              {title}
            </CustomButton>
          )}
        />

        <FloatingButton
          buttonClassName="mr-2.5 bg-gray-200 border border-gray-400 text-xs rounded px-2 py-1"
          buttonText={"Show Pinned Topics"}
          iconName={undefined as any}
        >
          <ListSection
            title="List of all pinned Topics:-"
            errorMessage=""
            items={pinnedTopics}
            renderItem={(t) => (
              <div className="ml-4 pb-1" key={t.uniqueId}>
                <HoverableSpan onClick={() => onChildTopicClick({ uniqueId: t.linkedUniqueId } as any)}>{t.title}</HoverableSpan>
              </div>
            )}
          />
        </FloatingButton>

        <FloatingButton
          buttonClassName="mr-2.5 bg-gray-200 border border-gray-400 text-xs rounded px-2 py-1"
          buttonText={"?"}
          iconName={undefined as any}
        >
          <div className="p-2.5">
            If this <b>{`${topic.name}`}</b> is a topic, It should answer below questions
          </div>
          {topic.name && <DynamicDataRenderer data={prepareQuestions(topic.name)} />}
        </FloatingButton>
        <br />
      </div>

      <ToggleablePanel
        className="mb-2.5 rounded border border-gray-300 bg-amber-50 px-1.5 py-1"
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
        className="mb-2.5 rounded border border-gray-300 bg-amber-50 px-1.5 py-1"
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
          onDragStart={undefined as any}
          onDrop={undefined as any}
        />
      </ToggleablePanel>

      <ToggleablePanel
        showContent={showDescr}
        title={`${topic.smartContent ? "Smart" : "Raw"} Description:-`}
        className="mb-2.5 w-[67vw] overflow-auto rounded border border-gray-600 p-1"
      >
        {topic.description && !topic.smartContent && (
          // ReactHtmlParser(topic.description || "")
          <SmartPreviewer data={{ content: topic.description || "", textOutputType: "html" }} />
        )}
        {topic.smartContent && <SmartPreviewer data={topic.smartContent} />}
      </ToggleablePanel>

      {topicSections && topicSections.length > 0 ? (
        <ToggleablePanel
          className="mb-2.5 rounded border border-gray-300 px-1.5 py-1"
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
                onEditSection={onEditSection as any}
                onLinkedTagSelection={handleLinkedTagSelection as any}
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
    </>
  );
};

export default TopicCard;
