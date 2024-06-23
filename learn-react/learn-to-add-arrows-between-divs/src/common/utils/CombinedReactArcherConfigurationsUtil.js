import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    addLevelAndParentIdFields,
    filterNodesByFieldValue,
    flattenTreeData,
    getDistinctValuesForField,
    toggleShowChildrenById,
    toggleShowChildrenForAll,
} from "./tree-data-operation-utils";

const defaultStyles = {
    levelItemStyle: {
        display: "flex",
        justifyContent: "space-between",
        gap: "5px",
    },
    nodeChildrenItemStyle: {
        marginBottom: "50px",
        display: "flex",
        justifyContent: "space-between",
    },
    nodeItemStyle: {
        padding: "10px",
        border: "1px solid red",
        fontSize: "10px",
    },
    configurationAndMetadataItemStyle: {
        padding: "10px",
        border: "10px solid green",
        fontSize: "10px",
        flex: "1",
    },
};

// Initial shared data
const initialSharedData = {
    showMetaData: false,
    showAllChildren: false,
    styles: defaultStyles,
};

// Create a context for shared configurations and data
const SharedConfigurationsContext = createContext();

// Create a provider component
const SharedConfigurationsProvider = ({ children, data }) => {
    const [sharedData, setSharedData] = useState(initialSharedData);
    const [dataWithLevelAndParentIdField, setDataWithLevelAndParentIdField] =
        useState([]);

    useEffect(() => {
        setDataWithLevelAndParentIdField(
            addLevelAndParentIdFields(data, (node) => ({
                showChildren: sharedData.showAllChildren || false,
                hasChildren: node?.children?.length > 0,
            }))
        );
    }, [data]);

    const toggleShowMetaData = () => {
        setSharedData((prev) => ({ ...prev, showMetaData: !prev.showMetaData }));
    };

    const toggleShowAllChildren= () => {
        setSharedData((prev) => ({ ...prev, showAllChildren: !prev.showAllChildren }));
        setDataWithLevelAndParentIdField((prevData) =>
            toggleShowChildrenForAll(prevData)
        );
    }

    const flattenedData = useMemo(
        () =>
            flattenTreeData(
                dataWithLevelAndParentIdField,
                (node) => node.showChildren
            ),
        [dataWithLevelAndParentIdField]
    );

    const levelCompArr = useMemo(() => {
        const distinctLevels = getDistinctValuesForField(
            flattenedData,
            "level"
        );
        return distinctLevels.map((level) => ({
            level,
            levelData:
                filterNodesByFieldValue(flattenedData, level, "level") || [],
        }));
    }, [flattenedData]);

    const getNodeChildrenCompArr = (levelData) => {
        const distinctParentIds = getDistinctValuesForField(levelData, "parentId");
        return distinctParentIds.map((parentId) => ({
            parentId,
            nodeChildrenData:
                filterNodesByFieldValue(levelData, parentId, "parentId") || [],
        }));
    };

    const toggleShowChildrenForId = (id) => {
        setDataWithLevelAndParentIdField((prevData) =>
            toggleShowChildrenById(prevData, id)
        );
    };

    

    return (
        <SharedConfigurationsContext.Provider
            value={{    
                sharedData,
                toggleShowMetaData,
                dataWithLevelAndParentIdField,
                levelCompArr,
                getNodeChildrenCompArr,
                toggleShowChildrenForId,
                toggleShowAllChildren,
            }}
        >
            {children}
        </SharedConfigurationsContext.Provider>
    );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = () => useContext(SharedConfigurationsContext);

export { SharedConfigurationsProvider, useSharedConfigurations };
