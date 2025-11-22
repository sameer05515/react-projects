import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/Smart/Editor/v3";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import useFlatTreeData from "../../../common/hooks/useFlatTreeData";
import { useReduxDataFetching } from "../../../common/hooks/useDataFetching";
import { addUniqueIdsToTree } from "../../../common/util/id-adder-util";
import { buildTree } from "../../../common/util/indentation-based-string-parser-to-tree-data";
import { fetchMemoryMaps, selectAllTreeMemoryMaps } from "../../../redux/slices/memoryMapSlice";
// import PopupMenuV3 from "../../miscelleneous/misc/sub-components/PopupMenuV3";
import PopupMenuV3 from "../../../ApnaPlayground/MiscellaneousExamples/PopupMenu/v3";
import CopyButton from "../copy-to-clipboard/CopyButton";
import { Header } from "./HelperComponents";
import MemoryMapItemV2 from "./MemoryMapItemV2";

const MemoryMapList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch memory maps data only when component mounts (with smart caching)
  useReduxDataFetching(
    fetchMemoryMaps,
    (state) => state.memoryMaps
  );

  const memoryMaps = useSelector(selectAllTreeMemoryMaps);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const selectedElementRef = useRef(null);
  const [searchString, setSearchString] = useState(null);
  const { data: memoryMapDataToBeViewed } = location.state || {};

  const selectedMemoryMap = useMemo(() => {
    if (!memoryMapDataToBeViewed) return null;
    return { ...memoryMapDataToBeViewed };
  }, [memoryMapDataToBeViewed]);

  const { prevItem: prevTreeNode, nextItem: nextTreeNode } = useFlatTreeData(
    memoryMaps,
    selectedMemoryMap?.uniqueId
  );

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [selectedMemoryMap]);

  const handleRightClick = (event, selectedMap) => {
    event.preventDefault();
    handleMemoryMapSelection(selectedMap);
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  };

  const handlePopupOption = (option) => {
    setPopupVisible(false);
    option.action();
  };

  const handleEditMemoryMap = () => {
    navigate(`/memory-maps/${selectedMemoryMap.uniqueId}/edit`, {
      state: { data: selectedMemoryMap },
    });
  };

  const handleAddUpdateSkeleton = () => {
    navigate(
      `/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton`,
      {
        state: { data: selectedMemoryMap },
      }
    );
  };

  const handleAddUpdateSkeletonUsingTreeEditor = () => {
    navigate(
      `/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton-v2`,
      {
        state: { data: selectedMemoryMap },
      }
    );
  };

  const handleMemoryMapSelection = (selectedMap) => {
    if (!selectedMap) return;
    // setSelectedMemoryMap(() => ({ ...selectedMap }));
    navigate(`/memory-maps/${selectedMap.uniqueId}`, {
      state: { data: selectedMap },
    });
  };

  const getTreeDataFromSelectedSkeleton = () => {
    if (!selectedMemoryMap?.skeleton) return [];
    const { data: treeData } = buildTree(selectedMemoryMap.skeleton);
    return addUniqueIdsToTree(treeData, "", false);
  };

  const popupOptions = [
    {
      title: "Add Update Skeleton-Using Raw Text",
      action: handleAddUpdateSkeleton,
    },
    {
      title: "Add Update Skeleton-Using Tree Editor",
      action: handleAddUpdateSkeletonUsingTreeEditor,
    },
    { title: "Edit", action: handleEditMemoryMap },
  ];

  const filteredMemoryMaps = () => {
    const result = searchString
      ? memoryMaps?.filter(({ name }) =>
          name.toLowerCase().includes(searchString.toLowerCase())
        ) || []
      : memoryMaps;

    const calculatedData = addUniqueIdsToTree(result, "", false);
    // console.log('Filtered data calculated', JSON.stringify(calculatedData[0]));
    return calculatedData;
  };

  return (
    <div className="flex flex-col max-h-[90vh] max-w-[95vw] pl-6 overflow-auto">
      <Header
        navigate={navigate}
        onNextClick={() => handleMemoryMapSelection(nextTreeNode)}
        onPrevClick={() => handleMemoryMapSelection(prevTreeNode)}
        onSearchTextChange={(text) => setSearchString(() => text?.trim() || "")}
      />
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1 overflow-auto">
          <Tree
            data={filteredMemoryMaps()}
            renderNode={(node) => (
              <>
                <MemoryMapItemV2
                  node={node}
                  isSelected={selectedMemoryMap?.uniqueId === node.uniqueId}
                  onMemoryMapSelection={(node) =>
                    handleMemoryMapSelection(node)
                  }
                  onItemRightClick={handleRightClick}
                />
                <span
                  ref={
                    selectedMemoryMap?.uniqueId === node.uniqueId
                      ? selectedElementRef
                      : null
                  }
                ></span>
              </>
            )}
          />
        </div>
        <div
          className="flex-[4] overflow-auto p-2.5"
          onClick={() => setPopupVisible(false)}
        >
          <h4 className="text-lg font-semibold mb-4">
            <SmartPreviewer
              data={{
                content: selectedMemoryMap?.name || "",
                textOutputType: SupportedTextFormats.MARKDOWN,
              }}
            />
          </h4>
          {!selectedMemoryMap?.skeleton ? (
            <div className="text-gray-500 italic">
              This section will show the skeleton by default. Later on, based on
              actions, we will show JsonPreview or details or references.
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <CopyButton
                  buttonText={"Copy skeleton to clipboard"}
                  textToCopy={selectedMemoryMap.skeleton}
                  onCopy={handleCopy}
                />
                {copied && <span className="text-green-600 mb-2.5 block ml-2">Copied!</span>}
              </div>
              <Tree
                data={getTreeDataFromSelectedSkeleton()}
                expandAll={true}
                renderNode={(node) => (
                  <SmartPreviewer
                    data={{
                      content: node?.name || "**tree node name is missing!**",
                      textOutputType: SupportedTextFormats.MARKDOWN,
                    }}
                    markdownStyles={{ fontSize: "10px" }}
                  />
                )}
              />
            </div>
          )}
          {selectedMemoryMap?.details?.length > 0 && (
            <div className="mt-4 text-gray-600">Details related to memory map will be shown soon!!</div>
          )}
          {selectedMemoryMap?.references?.length > 0 && (
            <div className="mt-4 text-gray-600">References related to memory map will be shown soon!!</div>
          )}
        </div>
      </div>
      {popupVisible && (
        <PopupMenuV3
          position={popupPosition}
          popupOptions={popupOptions}
          onOptionSelect={handlePopupOption}
          popupOptionStyle={{ fontSize: "12px" }}
        />
      )}
    </div>
  );
};

export { MemoryMapList };
