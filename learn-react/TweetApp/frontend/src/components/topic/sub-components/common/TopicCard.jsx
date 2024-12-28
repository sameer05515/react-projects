import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import DynamicDataRenderer from "../../../../common/components/dynamic-data-renderer/DynamicDataRenderer";
import FloatingButton from "../../../../common/components/floating-button/FloatingButton";
import Breadcrumbs from "../../../../common/components/global-breadcrumbs/GlobalBreadcrumb";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import { SmartPreviewer } from "../../../../common/components/smart-editor/SmartEditorV3";
import ToggleablePanel from "../../../../common/components/toggleable-panel/ToggleablePanel";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";
import useGlobalServiceProvider from "../../../../common/hooks/useGlobalServiceProvider";
import {
  formatDateToDDMMMYYYYWithTime,
  prepareQuestions,
} from "../../../../common/service/commonService";
import ButtonGroup from "../../../../common/components/button-group/ButtonGroup";
import ListSection from "../../../../common/components/list-section/ListSection";
import { topicAndSectionStyles as styles } from "../styles";
import TopicSectionCard from "./TopicSectionCard";

const TopicCard = ({
  topic,
  tags = [],
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
        ]}
      />

      <div>
        <Breadcrumbs
          providedItem={topic}
          providedItemType={BreadcrumbItemType.TOPIC}
          ancestors={topic.ancestors}
          onAncestorClick={(a) => handleAncestorClick(a)}
          onBaseSpanClick={onBaseSpanClick}
        />
        <h3>{topic.name}</h3>
        <div style={{ ...styles.topicDatesStyle }}>
          <ListSection
            title="Tags:"
            items={filteredTags}
            errorMessage={"No tags added yet!"}
            renderItem={(tag, idx) => (
              <HoverableSpan
                style={{ ...styles.topicTagStyle, margin: "5px" }}
                key={tag._id || `tag_${idx + 1}`}
                onClick={() => handleLinkedTagSelection(tag.uniqueId)}
              >
                {tag.title}
              </HoverableSpan>
            )}
          />
        </div>
        <div style={styles.topicDatesStyle}>
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
              <span key={id} style={{ marginRight: "10px" }}>
                <b>{title}:</b>
                {formatDateToDDMMMYYYYWithTime(data)}
              </span>
            )}
          />
        </div>
      </div>

      <div style={{ margin: "10px 0" }}>
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
            <CustomButton
              key={`action_buttons_${idx + 1}`}
              style={{ ...styles.topicTagStyle, marginRight: "10px" }}
              onClick={action}
            >
              {title}
            </CustomButton>
          )}
        />

        <FloatingButton
          buttonStyle={{ ...styles.topicTagStyle, marginRight: "10px" }}
          buttonText={"Show Pinned Topics"}
        >
          <ListSection
            title="List of all pinned Topics:-"
            errorMessage=""
            items={pinnedTopics}
            renderItem={(t) => (
              <div style={styles.liStyles} key={t.uniqueId}>
                <HoverableSpan
                  onClick={() =>
                    onChildTopicClick({ uniqueId: t.linkedUniqueId })
                  }
                >
                  {t.title}
                </HoverableSpan>
              </div>
            )}
          />
        </FloatingButton>

        <FloatingButton
          buttonStyle={{ ...styles.topicTagStyle, marginRight: "10px" }}
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

      <ToggleablePanel
        panelContainerStyle={styles.sectionStyle}
        showContent={topic?.sections?.length > 0}
        title={`Sections [${topic?.sections?.length || 0}]:-`}
      >
        <ListSection
          title=""
          errorMessage="No Sections Added Yet!!"
          items={topic.sections}
          renderItem={(t) => (
            <div style={styles.liStyles} key={t.uniqueId}>
              <HoverableSpan onClick={() => onTopicSectionClick(t.uniqueId)}>
                {t.name}
              </HoverableSpan>
            </div>
          )}
        />
      </ToggleablePanel>

      <ToggleablePanel
        showContent={topic?.children?.length > 0}
        title={`Child Topics [${topic?.children?.length || 0}]:-`}
        panelContainerStyle={styles.descriptionStyle}
      >
        <Tree
          data={topic.children}
          errorMessageOnNoData="No Child Topic Added Yet!!"
          renderNode={(t) => (
            <>
              <HoverableSpan onClick={() => onChildTopicClick(t)}>
                {t.name}
              </HoverableSpan>
            </>
          )}
        />
      </ToggleablePanel>

      <ToggleablePanel
        showContent={showDescr}
        title={`${topic.smartContent ? "Smart" : "Raw"} Description:-`}
        panelContainerStyle={{
          border: "1px solid #999", // Grey border
          padding: "2px 5px", // Adjust padding as needed
          borderRadius: "4px",
          marginBottom: "10px",
          width: "67vw",
          overflow: "auto",
        }}
      >
        {topic.description &&
          !topic.smartContent &&
          ReactHtmlParser(topic.description || "")}
        {topic.smartContent && <SmartPreviewer data={topic.smartContent} />}
      </ToggleablePanel>

      {topicSections && topicSections.length > 0 ? (
        <ToggleablePanel
          panelContainerStyle={styles.topicSectionsStyle}
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
                tags={tags}
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
    </>
  );
};

export default TopicCard;
