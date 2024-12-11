import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";
import { GraphNode } from "@/lib/topics";


interface Styles {
    levelItemStyle: React.CSSProperties;
    nodeChildrenItemStyle: React.CSSProperties;
    nodeItemStyle: React.CSSProperties;
    configurationAndMetadataItemStyle: React.CSSProperties;
}

interface SharedData {
    // showMetaData: boolean;
    // showAllChildren: boolean;
    styles: Styles;
}

interface SharedConfigurationsContextType {
    sharedData: SharedData;
    // toggleShowMetaData: () => void;
    // dataWithLevelAndParentIdField: NodeData[];
    // levelCompArr: LevelComp[];
    // getNodeChildrenCompArr: (levelData: NodeData[]) => ParentComp[];
    // toggleShowChildrenForId: (id: string) => void;
    // toggleShowAllChildren: () => void;
}



// const initialSharedData: SharedData = {
//     showMetaData: false,
//     showAllChildren: false,
//     styles: defaultStyles,
// };

const defaultStyles: Styles = {
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
const initialSharedData:SharedData = {
    //graphData:[],
    // showMetaData: false,
    // showAllChildren: false,
    styles: defaultStyles,
};

// Create a context for shared configurations and data
// const SharedConfigurationsContext = createContext<SharedConfigurationsContextProps>(initialSharedData);
// Create a context for shared configurations and data
const SharedConfigurationsContext = createContext<SharedConfigurationsContextType | undefined>(undefined);

// Create a provider component
interface SharedConfigurationsProviderProps {
    children: ReactNode;
    data: GraphNode[];
}


const SharedConfigurationsProvider = ({ children, data }: SharedConfigurationsProviderProps) => {
    const [sharedData, setSharedData] = useState<SharedData>(initialSharedData);
    const [dataWithLevelAndParentIdField, setDataWithLevelAndParentIdField] = useState<GraphNode[]>([]);

    // useEffect(() => {
    //     setDataWithLevelAndParentIdField(
    //         addLevelAndParentIdFields(data, (node: NodeData) => ({
    //             showChildren: sharedData.showAllChildren || false,
    //             hasChildren: node?.children?.length > 0,
    //         }))
    //     );
    // }, [data, sharedData.showAllChildren]);

    // const toggleShowMetaData = () => {
    //     setSharedData((prev) => ({ ...prev, showMetaData: !prev.showMetaData }));
    // };

    // const toggleShowAllChildren = () => {
    //     setSharedData((prev) => ({ ...prev, showAllChildren: !prev.showAllChildren }));
    //     setDataWithLevelAndParentIdField((prevData) =>
    //         toggleShowChildrenForAll(prevData)
    //     );
    // };

    // const flattenedData = useMemo(
    //     () =>
    //         flattenTreeData(
    //             dataWithLevelAndParentIdField,
    //             (node) => node.showChildren
    //         ),
    //     [dataWithLevelAndParentIdField]
    // );

    // const levelCompArr = useMemo(() => {
    //     const distinctLevels = getDistinctValuesForField(flattenedData, "level");
    //     return distinctLevels.map((level) => ({
    //         level,
    //         levelData: filterNodesByFieldValue(flattenedData, level, "level") || [],
    //     }));
    // }, [flattenedData]);

    // const getNodeChildrenCompArr = (levelData: NodeData[]): ParentComp[] => {
    //     const distinctParentIds = getDistinctValuesForField(levelData, "parentId");
    //     return distinctParentIds.map((parentId) => ({
    //         parentId,
    //         nodeChildrenData: filterNodesByFieldValue(levelData, parentId, "parentId") || [],
    //     }));
    // };

    // const toggleShowChildrenForId = (id: string) => {
    //     setDataWithLevelAndParentIdField((prevData) =>
    //         toggleShowChildrenById(prevData, id)
    //     );
    // };

    return (
        <SharedConfigurationsContext.Provider
            value={{
                sharedData,
                // toggleShowMetaData,
                // dataWithLevelAndParentIdField,
                // levelCompArr,
                // getNodeChildrenCompArr,
                // toggleShowChildrenForId,
                // toggleShowAllChildren,
            }}
        >
            {children}
        </SharedConfigurationsContext.Provider>
    );
};

// Custom hook to use shared configurations and data
const useSharedConfigurations = (): SharedConfigurationsContextType => {
    const context = useContext(SharedConfigurationsContext);
    if (!context) {
        throw new Error("useSharedConfigurations must be used within a SharedConfigurationsProvider");
    }
    return context;
};

export { SharedConfigurationsProvider, useSharedConfigurations };
