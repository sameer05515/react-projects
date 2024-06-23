import React, { useState, useMemo } from "react";
import { useSharedConfigurations } from "../external-import";
import ToggleButton from "./ToggleButton";
import Tree from "../../../../../common/components/TreeViewer";
import { buildTree } from "../../../../../common/utils/indentation-based-string-parser-to-tree-data";
import { addUniqueIds } from "../../../../../common/utils/object-and-array-operation-utils";

const styles = {
  container: {
    padding: "10px",
    border: "1px solid black",
  },
  toggleContainer: {
    margin: "5px",
    display: "flex",
    justifyContent: "flex-start",
  },
  contentItem: {
    margin: "10px 0",
  },
  configurationAndMetadataItem: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
  },
};

const Section = ({ title, children, isVisible = true }) => {
  if (!isVisible) return null;
  return (
    <div style={styles.contentItem}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const MetadataDisplay = ({ isVisible, content, title }) => {
  if (!isVisible) return null;
  return (
    <div style={styles.contentItem}>
      <h3>{title}</h3>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
};

const treeDataSources = {
  upcomingConfigurations: `
Change Orientation
  Show all levels horizontally/vertically. Adjust Arrows accordingly.
  Show Level Sections horizontally/vertically. Adjust Arrows accordingly.
  Show Nodes in Level Section, horizontally/vertically. Adjust Arrows accordingly.
  Limit max/min visible levels
  Limit number of nodes visible in a level. 
    Show scrollers, if more nodes in a level
  For each node, show facility to inject custom components.
    Put fallback mechanism, in case custom components not available
Changes related to style arrows
  Change arrow color.
  Change arrow width.
  Change 'strokeDasharray'.
Show Raw Data
  As JSON, or
  As Tree, or
  As Indented Text.
Validations or Error Management
  Show error, if any, occurred 
    during processing Raw Data.
    during rendering data in ReactArcherV1 component.
  Internal ID Management for more control and flexibility.
    Remove dependency to rely on 'uniqueId' of source.
Upcoming Configurations
  Add support for custom arrow heads.
  Implement customizable node shapes (e.g., rectangles, circles).
  Enable collapsible/expandable nodes for better data navigation.
  Allow dynamic reordering of levels and nodes.
  Integrate advanced filtering options based on node properties.
  Provide support for conditional rendering based on node data.
  Enable lazy loading of nodes for large data sets.
  Add animation effects for node transitions and changes.

  `,
  validations: `
    Array of objects should be provided.
    Each object should at least have fields of name, parentId, uniqueId.
    Check for cyclic dependencies in tree data.
    Ensure uniqueId is unique across all nodes.
  `,
  stepsOfProcessing: `
    Validate the input data for required fields.
    Convert indented string to hierarchical tree structure.
    Assign "level" and "parentId" to each node based on hierarchy.
    Render the tree data with appropriate configuration options (e.g., show/hide children).
  `,
  requirements: `
    Show all elements at the root level.
    Show children of root level grouped by their parentId on the same level.
    Provide options to toggle visibility of children.
    Allow configurations to adjust arrow directions, colors, and node alignments.
  `,
};

const ConfigurationAndMetadataDisplayComponent = ({ metadata = [] }) => {
  const [buttonStates, setButtonStates] = useState({
    showJson: false,
    showConfigurations: false,
  });

  const toggleButtonState = (key) => {
    setButtonStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const parsedTreeData = useMemo(() => {
    const parsedData = {};
    for (const [key, value] of Object.entries(treeDataSources)) {
      const { data } = buildTree(value);
      parsedData[key] = data?.map(d => addUniqueIds(d, true));
    }
    return parsedData;
  }, []);

  const {
    sharedData: {
      showMetaData: SHOW_METADATA,
      showAllChildren,
    },
    toggleShowMetaData,
    toggleShowAllChildren,
  } = useSharedConfigurations();

  return (
    <div style={styles.container}>
      <div style={styles.toggleContainer}>
        <ToggleButton
          title="JSON"
          isVisible={buttonStates.showJson}
          onToggle={() => toggleButtonState("showJson")}
        />
        <ToggleButton
          title="Configurations"
          isVisible={buttonStates.showConfigurations}
          onToggle={() => toggleButtonState("showConfigurations")}
        />
      </div>
      <div style={styles.toggleContainer}>
        <MetadataDisplay
          isVisible={buttonStates.showJson}
          content={metadata}
          title="Metadata"
        />
        {buttonStates.showConfigurations && (
          <div style={styles.configurationAndMetadataItem}>
            <ToggleButton
              title="METADATA"
              isVisible={SHOW_METADATA}
              onToggle={toggleShowMetaData}
            />
            <ToggleButton
              title="All Children"
              isVisible={showAllChildren}
              onToggle={toggleShowAllChildren}
            />
            <br />
            {Object.entries(parsedTreeData).map(([key, data]) => (
              <Section
                key={key}
                title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ":"}
                isVisible={SHOW_METADATA}
              >
                <Tree data={data} />
              </Section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationAndMetadataDisplayComponent;
