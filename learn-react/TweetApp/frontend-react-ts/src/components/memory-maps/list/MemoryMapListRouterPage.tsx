import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"; // ✅ Added useCallback and useMemo for Phase 3
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/store";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/Smart/Editor/v3";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import useFlatTreeData from "../../../common/hooks/useFlatTreeData";
import useDataFetching from "../../../common/hooks/useDataFetching/v2";
import { addUniqueIdsToTree } from "../../../common/util/id-adder-util";
import { buildTree } from "../../../common/util/indentation-based-string-parser-to-tree-data";
import { fetchMemoryMaps, selectAllTreeMemoryMaps } from "../../../redux/slices/memoryMapSlice";
// import PopupMenuV3 from "../../miscelleneous/misc/sub-components/PopupMenuV3";
import PopupMenuV3 from "../../../ApnaPlayground/MiscellaneousExamples/PopupMenu/v3";
import CopyButton from "../copy-to-clipboard/CopyButton";
import { Header } from "./HelperComponents";
import MemoryMapItemV2 from "./MemoryMapItemV2";

interface MemoryMapWithDetails {
  uniqueId: string;
  name: string;
  skeleton?: string;
  details?: any[];
  references?: any[];
  [key: string]: any;
}

const MemoryMapList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch memory maps data only when component mounts (with smart caching)
  useDataFetching(
    fetchMemoryMaps,
    (state: RootState) => state.memoryMaps
  );

  const memoryMaps = useSelector((state: RootState) => selectAllTreeMemoryMaps(state));
  const [selectedMemoryMap, setSelectedMemoryMap] = useState<MemoryMapWithDetails | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const selectedElementRef = useRef<HTMLSpanElement>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const { data: memoryMapDataToBeViewed } = location.state || {};

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
    if (memoryMapDataToBeViewed) {
      setSelectedMemoryMap({ ...memoryMapDataToBeViewed } as MemoryMapWithDetails);
    }
  }, [memoryMapDataToBeViewed]);

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [selectedMemoryMap]);

  // ✅ Phase 3: Memoize callbacks to prevent unnecessary re-renders
  const handleMemoryMapSelection = useCallback((selectedMap: any) => {
    if (!selectedMap) return;
    navigate(`/memory-maps/${selectedMap.uniqueId}`, {
      state: { data: selectedMap },
    });
  }, [navigate]);

  const handleRightClick = useCallback((event: React.MouseEvent, selectedMap: any) => {
    event.preventDefault();
    handleMemoryMapSelection(selectedMap);
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  }, [handleMemoryMapSelection]);

  const handlePopupOption = useCallback((option: any) => {
    setPopupVisible(false);
    option.action();
  }, []);

  const handleEditMemoryMap = useCallback(() => {
    if (!selectedMemoryMap) return;
    navigate(`/memory-maps/${selectedMemoryMap.uniqueId}/edit`, {
      state: { data: selectedMemoryMap },
    });
  }, [navigate, selectedMemoryMap]);

  const handleAddUpdateSkeleton = useCallback(() => {
    if (!selectedMemoryMap) return;
    navigate(
      `/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton`,
      {
        state: { data: selectedMemoryMap },
      }
    );
  }, [navigate, selectedMemoryMap]);

  const handleAddUpdateSkeletonUsingTreeEditor = useCallback(() => {
    if (!selectedMemoryMap) return;
    navigate(
      `/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton-v2`,
      {
        state: { data: selectedMemoryMap },
      }
    );
  }, [navigate, selectedMemoryMap]);

  // ✅ Phase 3: Memoize tree data calculation
  const getTreeDataFromSelectedSkeleton = useMemo(() => {
    if (!selectedMemoryMap?.skeleton) return [];
    const { data: treeData } = buildTree(selectedMemoryMap.skeleton);
    return addUniqueIdsToTree(treeData, "", false);
  }, [selectedMemoryMap?.skeleton]);

  // ✅ Phase 3: Memoize popup options
  const popupOptions = useMemo(() => [
    {
      title: "Add Update Skeleton-Using Raw Text",
      action: handleAddUpdateSkeleton,
    },
    {
      title: "Add Update Skeleton-Using Tree Editor",
      action: handleAddUpdateSkeletonUsingTreeEditor,
    },
    { title: "Edit", action: handleEditMemoryMap },
  ], [handleAddUpdateSkeleton, handleAddUpdateSkeletonUsingTreeEditor, handleEditMemoryMap]);

  // ✅ Phase 3: Memoize filtered memory maps to avoid re-filtering on every render
  const filteredMemoryMaps = useMemo(() => {
    const result = searchString
      ? memoryMaps?.filter(({ name }) =>
          name.toLowerCase().includes(searchString.toLowerCase())
        ) || []
      : memoryMaps;

    const calculatedData = addUniqueIdsToTree(result, "", false);
    return calculatedData;
  }, [memoryMaps, searchString]);

  return (
    <div className="flex flex-col max-h-[90vh] max-w-[95vw] pl-6 overflow-auto">
      <Header
        navigate={navigate}
        onNextClick={() => handleMemoryMapSelection(nextTreeNode)}
        onPrevClick={() => handleMemoryMapSelection(prevTreeNode)}
        onSearchTextChange={(text) => setSearchString(text?.trim() || null)}
      />
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1 overflow-auto">
          {/* ✅ Phase 3: Now a memoized value, not a function */}
          <Tree
            data={filteredMemoryMaps}
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
                textInputType: "TextArea",
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
              {/* ✅ Phase 3: Now a memoized value, not a function */}
              <Tree
                data={getTreeDataFromSelectedSkeleton}
                expandAll={true}
                renderNode={(node) => (
                  <SmartPreviewer
                    data={{
                      content: node?.name || "**tree node name is missing!**",
                      textOutputType: SupportedTextFormats.MARKDOWN,
                      textInputType: "TextArea",
                    }}
                    markdownStyles={{ fontSize: "10px" }}
                  />
                )}
              />
            </div>
          )}
          {(selectedMemoryMap?.details?.length ?? 0) > 0 && (
            <div className="mt-4 text-gray-600">Details related to memory map will be shown soon!!</div>
          )}
          {(selectedMemoryMap?.references?.length ?? 0) > 0 && (
            <div className="mt-4 text-gray-600">References related to memory map will be shown soon!!</div>
          )}
        </div>
      </div>
      {popupVisible && (
        <PopupMenuV3
          position={popupPosition}
          popupOptions={popupOptions}
          onOptionSelect={handlePopupOption}
          popupOptionClassName="text-xs"
        />
      )}
    </div>
  );
};

export { MemoryMapList };
