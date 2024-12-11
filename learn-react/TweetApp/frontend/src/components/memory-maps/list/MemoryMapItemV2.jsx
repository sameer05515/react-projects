import React from "react";
import { styles } from "./util";
import {
    SmartPreviewer,
    availableOutputTypes as SupportedTextFormats,
} from "../../../common/components/smart-editor/SmartEditorV3";

const MemoryMapItemV2 = ({
    node: memoryMap,
    isSelected,
    onMemoryMapSelection,
    onItemRightClick,
}) => (
    <div style={styles.memoryMapItemV2}>
        <span
            style={{
                ...styles.memoryMapName,
                fontWeight: isSelected ? "bold" : "normal",
            }}
            onClick={() => onMemoryMapSelection(memoryMap)}
            onContextMenu={(e) => onItemRightClick(e, memoryMap)}
        >
            {/* {memoryMap.name} */}
            <SmartPreviewer
                data={{
                    content: memoryMap.name,
                    textOutputType: SupportedTextFormats.MARKDOWN,
                }}
                markdownStyles={{fontSize:'10px'}}
            />
            {/* <MarkdownComponent
                markdownText={memoryMap.name || "**tree node name is missing!**"}
            /> */}
        </span>
    </div>
);

export default MemoryMapItemV2;
