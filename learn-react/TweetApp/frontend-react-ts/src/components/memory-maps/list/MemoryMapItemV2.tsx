import React from "react";
import {
    SmartPreviewer,
    availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/Smart/Editor/v3";

const MemoryMapItemV2 = ({
    node: memoryMap,
    isSelected,
    onMemoryMapSelection,
    onItemRightClick,
}) => (
    <div className="text-[10px] my-0.5 flex cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors">
        <span
            className={`break-words ${isSelected ? "font-bold text-blue-700" : "font-normal"}`}
            onClick={() => onMemoryMapSelection(memoryMap)}
            onContextMenu={(e) => onItemRightClick(e, memoryMap)}
        >
            <SmartPreviewer
                data={{
                    content: memoryMap.name,
                    textOutputType: SupportedTextFormats.MARKDOWN,
                    textInputType: "TextArea",
                }}
                markdownStyles={{fontSize:'10px'}}
            />
        </span>
    </div>
);

export default MemoryMapItemV2;
