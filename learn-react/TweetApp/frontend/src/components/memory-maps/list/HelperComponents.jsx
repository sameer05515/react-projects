import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import { selectAllTreeMemoryMaps } from "../../../redux/slices/memoryMapSlice";
import MemoryMapItemV2 from "./MemoryMapItemV2";

// Styles moved to Tailwind - keeping empty object for backwards compatibility
const styles = {};

const JSONPreview = ({ data }) => (
  <div className="border border-gray-300 p-1.5 bg-gray-50 rounded">
    <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const Header = ({
  navigate,
  onNextClick = () => {},
  onPrevClick = () => {},
  onSearchTextChange = () => {},
}) => (
  <div className="border border-gray-300 p-1.5 bg-gray-50 rounded mb-2 flex flex-col sm:flex-row gap-2 items-center">
    <ButtonGroup
      options={[
        {
          id: 1,
          children: "Create",
          onClick: () => navigate("/memory-maps/create"),
        },
        {
          id: 2,
          children: "Previous",
          onClick: () => {
            onPrevClick && onPrevClick();
          },
        },
        {
          id: 3,
          children: "Next",
          onClick: () => {
            onNextClick && onNextClick();
          },
        },
      ]}
    />
    <input
      type="text"
      placeholder="Search memory map by title"
      onChange={(e) => onSearchTextChange && onSearchTextChange(e.target.value)}
      className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
  </div>
);

export const MemoryMapListV1 = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const memoryMaps = useSelector(selectAllTreeMemoryMaps);

  const handleShowChildren = (parentId) => {
    console.log("Show children for parentId:", parentId);
  };

  const handleEditMemoryMap = (uniqueId) => {
    console.log("handleEditMemoryMap for uniqueId:", uniqueId);
    navigate(`${uniqueId}/edit`);
  };

  const handleAddUpdateSkeleton = (uniqueId, data) => {
    console.log("handleAddUpdateSkeleton for uniqueId:", uniqueId);
    // navigate(`${uniqueId}/edit/append-skeleton`);
    navigate(`${uniqueId}/edit/append-skeleton`, { state: { data } });
  };

  return (
    <div className="max-h-[75vh] overflow-auto">
      <Header navigate={navigate} />
      <h2 className="text-xl font-bold mb-2 mt-4">MemoryMapItems</h2>
      <MemoryMapItems
        memoryMaps={memoryMaps}
        handleShowChildren={handleShowChildren}
      />
      <h2 className="text-xl font-bold mb-2 mt-4">Tree</h2>
      <Tree
        data={memoryMaps}
        renderNode={(node) => (
          <MemoryMapItemV2
            node={node}
            onAddUpdateSkeleton={handleAddUpdateSkeleton}
            onEditMemoryMap={handleEditMemoryMap}
          />
        )}
      />
      <JSONPreview data={memoryMaps} />
    </div>
  );
};

const MemoryMapItems = ({ memoryMaps, handleShowChildren }) => (
  <div className="border border-gray-300 p-4 text-[10px] flex flex-col w-[200px]">
    {memoryMaps.map((m) => (
      <MemoryMapItem
        key={m.uniqueId}
        memoryMap={m}
        handleShowChildren={handleShowChildren}
      />
    ))}
  </div>
);

const MemoryMapItem = ({ memoryMap, handleShowChildren }) => (
  <div className="border border-gray-300 p-1 m-0.5 flex">
    <div className="flex-[4] break-words border-r border-gray-300 pr-2">{memoryMap.name}</div>
    <div className="flex-1 border-r border-gray-300 pr-2">Actions</div>
    <div
      className="flex-1 border-r border-gray-300 cursor-pointer hover:text-blue-600 transition-colors"
      onClick={() => handleShowChildren(memoryMap.uniqueId)}
    >
      Show Children
    </div>
  </div>
);

export { Header, JSONPreview };
