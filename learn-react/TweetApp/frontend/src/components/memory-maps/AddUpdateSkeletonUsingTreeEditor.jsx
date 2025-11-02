import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMemoryMaps, updateMemoryMapForGivenSkeleton } from "../../redux/slices/memoryMapSlice";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import { buildTree } from "../../common/util/indentation-based-string-parser-to-tree-data";
import TextDiffViewer from "./diff/TextDiffViewerV2";
import { addUniqueIdsToTree, processTreeNodes } from "../../common/util/id-adder-util";
import ToggleablePanel from "../../common/components/toggleable-panel/ToggleablePanel";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
// import PopupMenuV3 from "../miscelleneous/misc/sub-components/PopupMenuV3";
import PopupMenuV3 from "../../ApnaPlayground/MiscellaneousExamples/PopupMenu/v3";
import Popup from "../../common/components/custom-popup/Popup";
import CustomButton from "../../common/components/custom-button/CustomButton";
// import MarkdownComponent from "../../common/components/markdown-component/MarkdownComponent";
import { toast } from "react-toastify";
import { SkeletonTextType } from "./util/constants";
import { SmartPreviewer, availableOutputTypes as SupportedTextFormats } from "../../common/components/Smart/Editor/v3";

// Styles moved to Tailwind CSS classes

export const AddUpdateSkeletonUsingTreeEditorForMemoryMapItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: initialFormData } = location.state || {};
  const dispatch = useDispatch();

  const [isValidSkeleton, setIsValidSkeleton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultData, setResultData] = useState([]);

  const [draggedNode, setDraggedNode] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupOptions = [
    {
      title: "Make a Root node",
      action: () => moveNodeToAnotherParentId(selectedTreeNode, ""),
    },
    {
      title: "Add Children",
      action: () => {
        setChildrenMode(true);
        setShowAddChildrenOrSiblingsNodesPopup(true);
      },
    },
    {
      title: "Add Siblings",
      action: () => {
        setChildrenMode(false);
        setShowAddChildrenOrSiblingsNodesPopup(true);
      },
    },
    { title: "Edit", action: () => setShowEditTreeNodePopup(true) },
  ];

  const [selectedTreeNode, setSelectedTreeNode] = useState(null);

  const [childrenMode, setChildrenMode] = useState(false);

  const [showAddChildrenOrSiblingsNodesPopup, setShowAddChildrenOrSiblingsNodesPopup] = useState(false);
  const [showEditTreeNodePopup, setShowEditTreeNodePopup] = useState(false);

  const [formData, setFormData] = useState({
    uniqueId: initialFormData?.uniqueId || "",
    name: initialFormData?.name || "",
    skeleton: initialFormData?.skeleton || "",
    skeletonTextType: initialFormData?.skeletonTextType || SkeletonTextType.IndentedString,
  });

  const handleRightClick = (event, selectedMap) => {
    event.preventDefault();
    if (!selectedMap) return;
    setSelectedTreeNode(() => ({ ...selectedMap }));
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  };

  useEffect(() => {
    previewSkeleton();
  }, []);

  // Find a node by uniqueId
  // const findNodeById = (nodes, id) => {
  //   for (const node of nodes) {
  //     if (node.uniqueId === id) {
  //       return node;
  //     }
  //     if (node.children) {
  //       const found = findNodeById(node.children, id);
  //       if (found) return found;
  //     }
  //   }
  //   return null;
  // };

  // Remove a node by uniqueId
  const removeNodeById = (nodes, id) => {
    return nodes.filter((node) => {
      if (node.uniqueId === id) return false;
      if (node.children) {
        node.children = removeNodeById(node.children, id);
      }
      return true;
    });
  };

  // Add node to target's children
  const addNodeToParent = (nodes, parentId, newNode) => {
    return nodes.map((node) => {
      if (node.uniqueId === parentId) {
        node.children = [...(node.children || []), newNode];
      } else if (node.children) {
        node.children = addNodeToParent(node.children, parentId, newNode);
      }
      return node;
    });
  };

  const isDescendant = (parentNode, targetNodeId) => {
    // Recursively check if the targetNodeId is a child or descendant of parentNode
    if (!parentNode.children || parentNode.children.length === 0) return false;

    for (let child of parentNode.children) {
      if (child.uniqueId === targetNodeId || isDescendant(child, targetNodeId)) {
        return true;
      }
    }
    return false;
  };

  const moveNodeToAnotherParentId = (nodeToBeMoved, parentID = "") => {
    if (!nodeToBeMoved) return;

    // Remove dragged node from its current parent
    const updatedTreeWithoutDraggedNode = removeNodeById(resultData, nodeToBeMoved.uniqueId);

    let updatedTreeWithDraggedNode = [];

    if (!parentID || parentID.trim().length === 0) {
      updatedTreeWithDraggedNode = [...(updatedTreeWithoutDraggedNode || []), nodeToBeMoved];
    } else {
      // Add dragged node to the target node's children
      updatedTreeWithDraggedNode = addNodeToParent(updatedTreeWithoutDraggedNode, parentID, nodeToBeMoved);
    }

    // Update treeData with new structure
    setResultData(() => [...updatedTreeWithDraggedNode]);
    refreshSkeleton(updatedTreeWithDraggedNode); // Refresh the skeleton
  };

  const handleDrop = (targetNode) => {
    if (!draggedNode) return;

    // 1. Validation: A node cannot be dropped onto itself
    if (draggedNode.uniqueId === targetNode.uniqueId) {
      console.log("Cannot drop a node onto itself.");
      return;
    }

    // 2. Validation: A node cannot be dropped onto one of its own descendants
    if (isDescendant(draggedNode, targetNode.uniqueId)) {
      console.log("Cannot drop a node onto one of its own descendants.");
      return;
    }

    moveNodeToAnotherParentId(draggedNode, targetNode.uniqueId);

    // // Remove dragged node from its current parent
    // const updatedTreeWithoutDraggedNode = removeNodeById(
    //     resultData,
    //     draggedNode.uniqueId
    // );

    // // Add dragged node to the target node's children
    // const updatedTreeWithDraggedNode = addNodeToParent(
    //     updatedTreeWithoutDraggedNode,
    //     targetNode.uniqueId,
    //     draggedNode
    // );

    // // Update treeData with new structure
    // setResultData(() => [...updatedTreeWithDraggedNode]);
    // refreshSkeleton(updatedTreeWithDraggedNode); // Refresh the skeleton
  };

  const handlePopupOption = (option) => {
    setPopupVisible(false);
    option.action();
  };

  const validate = () => {
    if (!isValidSkeleton) {
      setErrorMessage("Please preview and validate skeleton text first!!");
      return false;
    }
    return true;
  };

  const upsertSkeleton = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(
        updateMemoryMapForGivenSkeleton({
          ...formData,
          uniqueId: formData.uniqueId,
        })
      );
    }
    dispatch(fetchMemoryMaps());
    toast.success("MemoryMap's skeleton upserted successfully");
    // navigate(-1);
  };

  const previewSkeleton = () => {
    if (!formData.skeleton?.trim()) {
      //setErrorMessage("Please provide some valid skeleton text!!");
      return;
    }
    const { data: treeData, isValid, message } = buildTree(formData.skeleton);

    if (isValid) {
      setIsValidSkeleton(true);
      setResultData(addUniqueIdsToTree(treeData, "preview_Skeleton".toUpperCase(), false));
    } else {
      setIsValidSkeleton(false);
      setErrorMessage(message || "Missing Error message");
    }
  };

  const handleAddChildrenOrSiblingsNodesSubmit = (data) => {
    if (!data) return;

    console.log("[handleAddChildrenOrSiblingsNodesSubmit]: Edited data", JSON.stringify(data));
    let updatedResultData = [...resultData]; // Clone the resultData

    if (!data.uniqueId) {
      // If no uniqueId, treat it as adding siblings at the root level
      updatedResultData = [...updatedResultData, ...data.children];
    } else {
      // Update existing tree by adding children
      updatedResultData = processTreeNodes(resultData, (node) => {
        if (node.uniqueId === data.uniqueId) {
          return {
            ...node,
            children: [...(node.children || []), ...data.children],
          };
        }
        return node; // Return unchanged node
      });
    }

    // Update state
    setResultData(() => addUniqueIdsToTree(updatedResultData, "", false));
    refreshSkeleton(updatedResultData); // Refresh the skeleton
    setShowAddChildrenOrSiblingsNodesPopup(false); // Close the popup
    // if(!selectedTreeNode?.uniqueId || selectedTreeNode.uniqueId===''){
    //     previewSkeleton();
    // }
    setIsValidSkeleton(true);
  };

  const handleEditTreeNodeSubmit = (data) => {
    if (!data) return;
    console.log("Edited data", JSON.stringify(data));

    const updatedResultData = processTreeNodes(resultData, (node) => ({
      ...node,
      name: node.uniqueId === data.uniqueId ? data.name : node.name,
    }));
    setResultData(() => [...updatedResultData]);
    refreshSkeleton(updatedResultData);
    setShowEditTreeNodePopup(false);
  };

  const refreshSkeleton = (treeData = []) => {
    if (!treeData || !Array.isArray(treeData) || treeData.length === 0) {
      return;
    }

    const generateResultText = (nodes = [], depth = 0) => {
      let result = "";
      nodes.forEach((node) => {
        // Add tabs based on depth and then add the node's name
        result += `${"\t".repeat(depth)}${node.name}\n`;

        // If the node has children, recursively call the function and increase the depth
        if (node.children && node.children.length > 0) {
          result += generateResultText(node.children, depth + 1);
        }
      });

      return result;
    };

    const result = generateResultText(treeData);

    setFormData((prev) => ({ ...prev, skeleton: result }));
  };

  return (
    <div onClick={() => setPopupVisible(false)}>
      {showAddChildrenOrSiblingsNodesPopup && selectedTreeNode && (
        <AddChildrenOrSiblingsNodesPopup initialFormData={selectedTreeNode} addAsChildren={childrenMode} onClose={() => setShowAddChildrenOrSiblingsNodesPopup(false)} onSubmit={handleAddChildrenOrSiblingsNodesSubmit} />
      )}

      {showEditTreeNodePopup && selectedTreeNode && <EditTreeNodePopup initialFormData={selectedTreeNode} onClose={() => setShowEditTreeNodePopup(false)} onSubmit={handleEditTreeNodeSubmit} />}

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">AddUpdateSkeletonUsingTreeEditor</h2>
        <h2 className="text-xl font-semibold mb-4"> {formData?.skeleton ? "Update " : "Add "}Skeleton</h2>
        {!initialFormData?.uniqueId ? (
          <p className="text-red-600 font-semibold">Invalid memory map provided. Unable to process!!</p>
        ) : (
          <span className="text-gray-700">
            Memory map name : <span className="font-bold">{initialFormData?.name}</span>
          </span>
        )}

        {errorMessage && <div className="text-red-600 font-bold mb-2.5">{errorMessage}</div>}

        <div className="flex flex-col items-start mt-5 px-5">
          {!resultData.length && !formData.skeleton?.trim() && (
            <button
              className="px-5 py-2.5 text-base rounded border-none bg-blue-600 text-white cursor-pointer mt-2.5 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setSelectedTreeNode(() => ({ uniqueId: "", children: [] }));
                setChildrenMode(() => false);
                setShowAddChildrenOrSiblingsNodesPopup(true);
              }}
            >
              Add First node
            </button>
          )}

          {resultData.length > 0 && isValidSkeleton && (
            <div className="border border-gray-300 mt-5 w-full h-[50vh] overflow-auto">
            <Tree
              data={resultData}
              expandAll={true}
              areNodesDraggable={true}
              onDragStart={(node) => setDraggedNode(node)}
              onDrop={(node) => handleDrop(node)}
              renderNode={(node) => (
                <>
                  <TreeNodeItem node={node} isSelected={selectedTreeNode?.uniqueId === node.uniqueId} onTreeNodeSelection={setSelectedTreeNode} onItemRightClick={handleRightClick} />
                </>
              )}
            />
          </div>
        )}
        {/* <textarea
                    style={styles.textarea}
                    value={formData.skeleton}
                    onChange={(e) =>
                        {
                            setIsValidSkeleton(false);
                            setFormData((prev) => ({ ...prev, skeleton: e.target.value }));
                        }
                    }
                /> */}

        {/* {formData.skeleton.trim() && (
                    <button
                        style={styles.button}
                        onClick={previewSkeleton}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        onFocus={(e) => e.currentTarget.style.outline = styles.buttonFocus.outline}
                        onBlur={(e) => e.currentTarget.style.outline = 'none'}
                    >
                        Validate and preview rendered skeleton
                    </button>
                )} */}

          <div className="flex flex-row gap-2.5 mt-2.5">
            {formData?.skeleton?.trim() && isValidSkeleton && resultData?.length > 0 && (
              <button
                className="px-5 py-2.5 text-base rounded border-none bg-blue-600 text-white cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={upsertSkeleton}
              >
                Upsert
              </button>
            )}
            <button
              className="px-5 py-2.5 text-base rounded border-none bg-gray-600 text-white cursor-pointer transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>

          <div className="mt-5 w-full">
          <JSONDataViewer
            title="X-Ray for data"
            metadata={{
              draggedNode,
              formData,
              selectedTreeNode,
              isValidSkeleton,
              resultData,
            }}
          />
          <ToggleablePanel title="Diff" showContent={false}>
            <TextDiffViewer oldContent={initialFormData?.skeleton} newContent={formData?.skeleton} />
          </ToggleablePanel>
          </div>
        </div>

        {popupVisible && <PopupMenuV3 position={popupPosition} popupOptions={popupOptions} onOptionSelect={handlePopupOption} popupOptionStyle={{ fontSize: "12px" }} />}
      </div>
    </div>
  );
};

const TreeNodeItem = ({ node: treeNode, isSelected, onTreeNodeSelection, onItemRightClick }) => (
  <div className="text-[10px] my-0.5 flex cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors">
    <span
      className={`break-words ${isSelected ? "font-bold text-blue-700" : "font-normal"}`}
      onClick={() => onTreeNodeSelection(treeNode)}
      onContextMenu={(e) => onItemRightClick(e, treeNode)}
    >
      <SmartPreviewer
        data={{
          content: treeNode?.name || "**tree node name is missing!**",
          textOutputType: SupportedTextFormats.MARKDOWN,
        }}
        markdownStyles={{ fontSize: "12px" }}
      />
    </span>
  </div>
);

const AddChildrenOrSiblingsNodesPopup = ({ onClose = () => {}, initialFormData = {}, addAsChildren = false, onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    uniqueId: (addAsChildren ? initialFormData?.uniqueId : initialFormData?.parentId) || "",
    addAsChildren: addAsChildren || false,
    text: "",
    children: [],
  });

  const [formErrors, setFormErrors] = useState([]);

  const validateForm = () => {
    const errors = [];
    if (!formData.text || formData.text.trim().length === 0) {
      errors.push("Text should not be empty");
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const dataToBeSubmitted = {
      uniqueId: formData.uniqueId,
      children: formData.children,
    };
    // if (!initialFormData?.uniqueId) {
    //     dataToBeSubmitted.uniqueId = `${CONSTANTS.DRAFT_DETAIL_ID_PREFIX + getDateAsMillisecondsString()}`;
    // }
    onSubmit(dataToBeSubmitted);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    const children = value
      ? value
          .trim()
          .split("\n")
          .filter((line) => line && line.trim().length > 0)
          .map((line) => ({
            name: line.trim(),
          }))
      : [];
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      children: [...children],
    }));
  };

  return (
    <Popup headerText="AddChildrenOrSiblingsNodesPopupe" onClose={onClose}>
      <div>
        <div>
          <JSONDataViewer metadata={{ formData }} />
        </div>

        <div className="block p-2.5 mb-4">
          <label className="w-[9%] font-bold text-gray-700 inline-block mb-2" htmlFor="text">
            name:
          </label>
          <textarea type="text" id="text" name="text" placeholder="Enter children names" value={formData.text} onChange={handleInputChange} rows={10} className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="block p-2.5 mb-4">
          {formErrors.length > 0 && (
            <div className="space-y-1">
              {formErrors.map((error, index) => (
                <span key={index} className="text-red-600 block">
                  {error}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <CustomButton onClick={handleSubmit}>Submit</CustomButton>
          <CustomButton onClick={onClose}>Cancel</CustomButton>
        </div>
      </div>
    </Popup>
  );
};

const EditTreeNodePopup = ({ onSubmit = () => {}, onClose = () => {}, initialFormData = {} }) => {
  const [formData, setFormData] = useState({
    uniqueId: initialFormData?.uniqueId || "",
    name: initialFormData?.name || "",
    //children: initialFormData?.children || [],
    //parentId: initialFormData?.parentId || ""
  });

  // const [formErrors, setFormErrors] = useState([]);
  const [, setFormErrors] = useState([]);

  const validateForm = () => {
    const errors = [];
    if (!formData.name || formData.name.trim().length === 0) {
      errors.push("Name should not be empty");
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const dataToBeSubmitted = { ...initialFormData, ...formData };
    // if (!initialFormData?.uniqueId) {
    //     dataToBeSubmitted.uniqueId = `${CONSTANTS.DRAFT_DETAIL_ID_PREFIX + getDateAsMillisecondsString()}`;
    // }
    onSubmit(dataToBeSubmitted);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Popup headerText="EditTreeNodePopup" onClose={onClose}>
      <div>
        <div>
          <JSONDataViewer metadata={{ formData }} />
        </div>
        <div className="block p-2.5 mb-4">
          <label className="w-[9%] font-bold text-gray-700 inline-block mb-2" htmlFor="name">
            name:
          </label>
          <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <CustomButton onClick={handleSubmit}>Submit</CustomButton>
          <CustomButton onClick={onClose}>Cancel</CustomButton>
        </div>
      </div>
    </Popup>
  );
};
