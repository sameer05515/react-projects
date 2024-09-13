import { useMemo } from "react";
import {
    addLevelAndParentIdFields,
    filterNodesByFieldValue,
    flattenTreeData,
    getDistinctValuesForField,
} from "../utils/tree-data-operation-utils";

const useTreeData = (data) => {
    const dataWithLevelAndParentIdField = useMemo(
        () =>
            addLevelAndParentIdFields(data, (node) => ({
                showChildren: true,
                hasChildren: node?.children?.length > 0,
            })),
        [data]
    );

    const flattenedData = useMemo(
        () => flattenTreeData(dataWithLevelAndParentIdField),
        [dataWithLevelAndParentIdField]
    );

    const levelCompArr = useMemo(() => {
        let currentLevel = 0;
        const levelComponentArr = [];

        while (true) {
            const levelArr = filterNodesByFieldValue(flattenedData, currentLevel, "level");
            if (levelArr.length === 0) break;
            levelComponentArr.push({ level: currentLevel, levelData: levelArr });
            currentLevel++;
        }

        return levelComponentArr;
    }, [flattenedData]);

    const getNodeChildrenCompArr = (levelData) => {
        const distinctParentIds = getDistinctValuesForField(levelData, "parentId");
        return distinctParentIds.map((parentId) => ({
            parentId,
            nodeChildrenData:
                filterNodesByFieldValue(levelData, parentId, "parentId") || [],
        }));
    };

    return {
        dataWithLevelAndParentIdField,
        levelCompArr,
        getNodeChildrenCompArr,
    };
};

export default useTreeData;
