import React, { memo, useMemo, useCallback } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import { SmartPreviewer } from "../../../../common/components/smart-editor/SmartEditorV3";
import ToggleablePanel from "../../../../common/components/toggleable-panel/ToggleablePanel";
import ListSection from "../../../../common/components/list-section/ListSection";
import { topicAndSectionStyles as styles } from "../styles";

const TopicSectionCard = ({
  data: ts,
  tags = [],
  selectedElementRef,
  selectedSectionId,
  onEditSection = () => {},
  onLinkedTagSelection = () => {},
}) => {
  // Callback for linked tag selection
  const handleLinkedTagSelection = useCallback(
    (linkedTagUID) => {
      onLinkedTagSelection(linkedTagUID);
    },
    [onLinkedTagSelection]
  );

  // Filter tags based on unique IDs
  const filteredTags = useMemo(() => {
    if (!ts?.tags) return [];
    return ts.tags.map((uniqueId) =>
      tags.find((tag) => tag.uniqueId === uniqueId)
    );
  }, [ts?.tags, tags]);

  // Define button actions
  const buttonActions = useMemo(
    () => [
      {
        id: 1,
        title: "Edit",
        action: () => onEditSection(ts.uniqueId),
      },
      {
        id: 2,
        title: "Move up",
        action: () => console.log("Move up action not implemented"),
      },
      {
        id: 3,
        title: "Move down",
        action: () => console.log("Move down action not implemented"),
      },
    ],
    [ts.uniqueId, onEditSection]
  );

  if (!ts || !ts.name) {
    return <>Section data is null</>;
  }

  return (
    <ToggleablePanel title={ts.name} showContent={true}>
      <div key={ts.uniqueId} style={styles.tagContainerStyle}>
        <span
          ref={selectedSectionId === ts.uniqueId ? selectedElementRef : null}
        ></span>

        {/* Action Buttons */}
        <div style={{ margin: "10px 0" }}>
          <ListSection
            title=""
            errorMessage=""
            items={buttonActions}
            renderItem={({ id, title, action }) => (
              <CustomButton
                key={id}
                style={{ ...styles.topicTagStyle, marginRight: "10px" }}
                onClick={action}
              >
                {title}
              </CustomButton>
            )}
          />
        </div>

        {/* Smart Content Preview */}
        <SmartPreviewer data={ts.smartContent} />

        {/* Tag List */}
        {filteredTags.length > 0 && (
          <ToggleablePanel
            panelContainerStyle={styles.tagPanelStyle}
            title="Tags:"
            showContent={true}
          >
            <ListSection
              errorMessage=""
              items={filteredTags}
              title=""
              renderItem={(tag) =>
                tag && (
                  <HoverableSpan
                    style={{ ...styles.topicTagStyle, margin: "5px" }}
                    key={tag._id}
                    onClick={() => handleLinkedTagSelection(tag.uniqueId)}
                  >
                    {tag.title}
                  </HoverableSpan>
                )
              }
            />
          </ToggleablePanel>
        )}
      </div>
    </ToggleablePanel>
  );
};

export default memo(TopicSectionCard);