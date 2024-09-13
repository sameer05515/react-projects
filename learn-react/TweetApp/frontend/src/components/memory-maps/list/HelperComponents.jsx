import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import {
    fetchMemoryMaps,
    selectAllTreeMemoryMaps,
} from "../../../redux/slices/memoryMapSlice";
import MemoryMapItemV2 from "./MemoryMapItemV2";

const styles = {
    container: {
        // border: "1px solid #ddd",
        maxHeight: "75vh" /* Maximum height is 60% of the viewport height */,
        overflow:
            "auto" /* Scrollbars will appear if content exceeds these dimensions */,
    },
    header: {
        border: "1px solid #ddd",
        padding: "6px",
    },
    memoryMapList: {
        border: "1px solid #ddd",
        padding: "16px",
        fontSize: "10px",
        display: "flex",
        flexDirection: "column",
        width: "200px",
    },
    memoryMapItem: {
        border: "1px solid #ddd",
        padding: "4px",
        margin: "2px",
        display: "flex",
    },
    memoryMapItemV2: {
        border: "1px solid #ddd",
        padding: "4px",
        fontSize: "10px",
        margin: "2px",
        display: "flex",
    },
    memoryMapName: {
        flex: 4,
        wordWrap: "break-word",
        borderRight: "1px solid #ddd",
    },
    memoryMapActions: {
        flex: 1,
        borderRight: "1px solid #ddd",
    },
    showChildren: {
        flex: 1,
        borderRight: "1px solid #ddd",
        cursor: "pointer",
    },
    jsonPreview: {
        border: "1px solid #ddd",
        padding: "6px",
    },
};

const JSONPreview = ({ data }) => (
    <div style={styles.jsonPreview}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

const Header = ({
    navigate,
    onNextClick = () => { },
    onPrevClick = () => { },
    onSearchTextChange = () => { },
}) => (
    <div style={styles.header}>
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
        {/* <CustomButton onClick={() => navigate("create")}>Create</CustomButton>
        <CustomButton onClick={() => {onPrevClick && onPrevClick()}}>Previous</CustomButton>
        <CustomButton onClick={() => {onNextClick && onNextClick()}}>Next</CustomButton> */}
        <input
            type="text"
            placeholder="Search memory map by title"
            onChange={(e) => onSearchTextChange && onSearchTextChange(e.target.value)}
        />
    </div>
);

const MemoryMapListV1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const memoryMaps = useSelector(selectAllTreeMemoryMaps);

    useEffect(() => {
        dispatch(fetchMemoryMaps());
    }, [dispatch]);

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
        <div style={styles.container}>
            <Header navigate={navigate} />
            <h2>MemoryMapItems</h2>
            <MemoryMapItems
                memoryMaps={memoryMaps}
                handleShowChildren={handleShowChildren}
            />
            <h2>Tree</h2>
            <Tree
                data={memoryMaps}
                renderNode={(node) => (
                    <MemoryMapItemV2
                        node={node}
                        onAddUpdateSkeleton={handleAddUpdateSkeleton}
                        onEditMemoryMap={handleEditMemoryMap}
                    // onShowChildren={handleShowChildren}
                    />
                )}
            />
            <JSONPreview data={memoryMaps} />
        </div>
    );
};

const MemoryMapItems = ({ memoryMaps, handleShowChildren }) => (
    <div style={styles.memoryMapList}>
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
    <div style={styles.memoryMapItem}>
        <div style={styles.memoryMapName}>{memoryMap.name}</div>
        <div style={styles.memoryMapActions}>Actions</div>
        <div
            style={styles.showChildren}
            onClick={() => handleShowChildren(memoryMap.uniqueId)}
        >
            Show Children
        </div>
    </div>
);

export { Header, JSONPreview };
