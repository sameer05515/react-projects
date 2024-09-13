import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MarkdownComponent from "../../../common/components/MarkdownComponent";
import Tree from "../../../common/components/TreeViewer";
import useFlatTreeData from "../../../common/hooks/useFlatTreeData";
import { buildTree } from "../../../common/util/indentation-based-string-parser-to-tree-data";
import {
    fetchMemoryMaps,
    selectAllTreeMemoryMaps,
} from "../../../redux/slices/memoryMapSlice";
import PopupMenuV3 from "../../miscelleneous/misc/sub-components/PopupMenuV3";
import CopyButton from "../copy-to-clipboard/CopyButton";
import { Header } from "./HelperComponents";
import MemoryMapItemV2 from "./MemoryMapItemV2";
import { styles } from "./util";
import { addUniqueIdsToTree } from "../../../common/util/id-adder-util";

const MemoryMapList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const memoryMaps = useSelector(selectAllTreeMemoryMaps);
    const [selectedMemoryMap, setSelectedMemoryMap] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [copied, setCopied] = useState(false);
    const selectedElementRef = useRef(null);
    const [searchString, setSearchString] = useState(null);
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
        dispatch(fetchMemoryMaps());
    }, [dispatch]);

    useEffect(()=>{
        if(memoryMapDataToBeViewed){
            setSelectedMemoryMap(()=>({...memoryMapDataToBeViewed}))
        }

    },[memoryMapDataToBeViewed])

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
        navigate(`/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton`, {
            state: { data: selectedMemoryMap },
        });
    };

    const handleAddUpdateSkeletonUsingTreeEditor = () => {
        navigate(`/memory-maps/${selectedMemoryMap.uniqueId}/edit/append-skeleton-v2`, {
            state: { data: selectedMemoryMap },
        });
    };

    const handleMemoryMapSelection = (selectedMap) => {
        if (!selectedMap) return;
        // setSelectedMemoryMap(() => ({ ...selectedMap }));
        navigate(`/memory-maps/${selectedMap.uniqueId}`, {
            state:{data: selectedMap}
        })
    };

    const getTreeDataFromSelectedSkeleton = () => {
        if (!selectedMemoryMap?.skeleton) return [];
        const { data: treeData } = buildTree(selectedMemoryMap.skeleton);
        return addUniqueIdsToTree(treeData,"", false);
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
        const result= searchString
            ? memoryMaps?.filter(({ name }) =>
                name.toLowerCase().includes(searchString.toLowerCase())
            ) || []
            : memoryMaps;
        
        const calculatedData= addUniqueIdsToTree(result, "", false);
        // console.log('Filtered data calculated', JSON.stringify(calculatedData[0]));
        return calculatedData;
    };

    return (
        <div style={styles.container}>
            <Header
                navigate={navigate}
                onNextClick={() => handleMemoryMapSelection(nextTreeNode)}
                onPrevClick={() => handleMemoryMapSelection(prevTreeNode)}
                onSearchTextChange={(text) => setSearchString(() => text?.trim() || "")}
            />
            <div style={styles.content}>
                <div style={styles.treeContainer}>
                    <Tree
                        data={filteredMemoryMaps()}
                        renderNode={(node) => (
                            <>
                                <MemoryMapItemV2
                                    node={node}
                                    isSelected={selectedMemoryMap?.uniqueId === node.uniqueId}
                                    // onMemoryMapSelection={setSelectedMemoryMap}
                                    onMemoryMapSelection={(node)=>handleMemoryMapSelection(node)}
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
                    style={styles.detailsContainer}
                    onClick={() => setPopupVisible(false)}
                >
                    {!selectedMemoryMap?.skeleton ? (
                        <>
                            This section will show the skeleton by default. Later on, based on
                            actions, we will show JsonPreview or details or references.
                        </>
                    ) : (
                        <div>
                            <CopyButton
                                buttonText={"Copy skeleton to clipboard"}
                                textToCopy={selectedMemoryMap.skeleton}
                                onCopy={handleCopy}
                            />
                            {copied && <span style={styles.copiedMessage}>Copied!</span>}
                            {/* <CustomButton onClick={()=>{}}>Expand All</CustomButton> */}
                            <Tree
                                data={getTreeDataFromSelectedSkeleton()}
                                expandAll={true}
                                renderNode={(node) => (
                                    <MarkdownComponent
                                        markdownText={node.name || "**tree node name is missing!**"}
                                    />
                                )}
                            />
                        </div>
                    )}
                    {selectedMemoryMap?.details?.length > 0 && (
                        <>Details related to memory map will be shown soon!!</>
                    )}
                    {selectedMemoryMap?.references?.length > 0 && (
                        <>References related to memory map will be shown soon!!</>
                    )}
                    {/* <JSONPreview
                        data={{ prevTreeNode, nextTreeNode, selectedMemoryMap }}
                    /> */}
                </div>
            </div>
            {popupVisible && (
                <PopupMenuV3
                    position={popupPosition}
                    popupOptions={popupOptions}
                    onOptionSelect={handlePopupOption}
                    popupOptionStyle={styles.popupOption}
                />
            )}
        </div>
    );
};

export { MemoryMapList };
