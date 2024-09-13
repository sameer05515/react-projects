import React from "react";
import {
    ArrowConnectorExample,
    ArrowConnectorExampleWithStyledBox1,
    ArrowConnectorExampleWithStyledBox2,
    ArrowConnectorExampleWithStyledBox3,
    Component1,
    Component2,
    Component3,
} from "../../components/examples/arrow-connector/ArrowConnectorExamples";
import {
    ReactArcherApp1,
    ReactArcherApp2,
    ReactArcherApp3,
    ReactArcherApp4,
    ReactArcherApp5,
    ReactArcherApp6,
    ReactArcherApp7
} from "../../components/examples/react-archer/react-archer-examples-pt-1";
import {
    ReactArcherApp6 as ReactArcherApp6Old,
    ReactArcherApp7 as ReactArcherApp7Old,
} from "../../components/examples/react-archer/react-archer-examples-pt-2";
import { ReactArcherApp8 } from "../../components/examples/react-archer/react-archer-examples-pt-3";
import { ReactArcherApp9 } from "../../components/examples/react-archer/react-archer-examples-pt-4";
import ReactArcherApp10 from "../../components/examples/react-archer/react-archer-examples-pt-5";
import ReactArcherApp11 from "../../components/examples/react-archer/react-archer-examples-pt-6";
import ReactArcherApp12 from "../../components/examples/react-archer/react-archer-examples-pt-7";
import ReactArcherBaseExample from "../../components/examples/react-archer/ReactArcherBaseExample";
import SharedDataUseExample1 from "../../components/examples/shared-data-use/SharedDataUseExample1";
import SharedDataUseExample2 from "../../components/examples/shared-data-use/SharedDataUseExample2";
import SimpleCompNoBakwas from "../../components/examples/react-archer/simply-bakwas/SimpleCompNoBakwas";
import MoreCompNoBakwasWithContext from "../../components/examples/react-archer/simply-more-bakwas/MoreCompNoBakwasWithContext";
import TransformTreeDataGroupByLevelAndParentId from "../../components/examples/transform-tree-data/TransformTreeDataGroupByLevelAndParentId";
import ReactArcherV1 from "../../components/releases/react-archer-releases/v1.0/ReactArcherApp1.0";
import { ArrayType } from "./object-and-array-operation-utils";
import ReactArcherApp4FromTemp from "../../components/examples/react-archer/temp";
import TransformTreeDataGroupByLevelAndParentId2 from "../../components/examples/transform-tree-data/TransformTreeDataGroupByLevelAndParentId2";
import TransformTreeDataGroupByLevelAndParentId3 from "../../components/examples/transform-tree-data/TransformTreeDataGroupByLevelAndParentId3";
import ReactArcherV1ShouldRenderIndentedString from "../../components/releases/react-archer-releases/use-case-verification/ShouldRenderIndentedString";
import ReactArcherV1ShouldHaveIsolatedContexts from "../../components/releases/react-archer-releases/use-case-verification/ShouldHaveIsolatedContexts";
import Tree from "../components/TreeViewer";

//TO-DO
const componentMapWithPurposes={
    MyTest: {
        element: () => <>I am just to test</>,
        purpose: "To check if we can pass a dynamic functional component as Argument."
    },
    NonExistingComponent: {
        purpose: "Purpose less, ghumantu bhotiya"
    },
    Component1: {
        element: Component1,
        purpose: "To check if we can import a pre-defined simple component and pass as argument to my map"
    },
    Component2: {
        element: Component2,
        purpose: "Default purpose for Component2"
    },
    Component3: {
        element: ({data=[]})=><><Component3/><br/><Tree data={data}/></>,
        purpose: "To test Tree data"
    },
    ArrowConnectorExample: {
        element: ArrowConnectorExample,
        purpose: "Default purpose for ArrowConnectorExample"
    },
    ArrowConnectorExampleWithStyledBox1: {
        element: ArrowConnectorExampleWithStyledBox1,
        purpose: "Default purpose for ArrowConnectorExampleWithStyledBox1"
    },
    ArrowConnectorExampleWithStyledBox2: {
        element: ArrowConnectorExampleWithStyledBox2,
        purpose: "Default purpose for ArrowConnectorExampleWithStyledBox2"
    },
    ArrowConnectorExampleWithStyledBox3: {
        element: ArrowConnectorExampleWithStyledBox3,
        purpose: "Default purpose for ArrowConnectorExampleWithStyledBox3"
    },
    ReactArcherBaseExample: {
        element: ReactArcherBaseExample,
        purpose: "Default purpose for ReactArcherBaseExample"
    },
    ReactArcherApp1: {
        element: ReactArcherApp1,
        purpose: "Default purpose for ReactArcherApp1"
    },
    ReactArcherApp2: {
        element: ReactArcherApp2,
        purpose: "Default purpose for ReactArcherApp2"
    },
    ReactArcherApp3: {
        element: ReactArcherApp3,
        purpose: "Default purpose for ReactArcherApp3"
    },
    ReactArcherApp4: {
        element: ReactArcherApp4,
        purpose: "Default purpose for ReactArcherApp4"
    },
    ReactArcherApp4FromTemp: {
        element: ReactArcherApp4FromTemp,
        purpose: "Default purpose for ReactArcherApp4FromTemp"
    },
    ReactArcherApp5: {
        element: ReactArcherApp5,
        purpose: "Default purpose for ReactArcherApp5"
    },
    ReactArcherApp6Old: {
        element: ReactArcherApp6Old,
        purpose: "Default purpose for ReactArcherApp6Old"
    },
    ReactArcherApp6: {
        element: ReactArcherApp6,
        purpose: "Default purpose for ReactArcherApp6"
    },
    ReactArcherApp7Old: {
        element: ReactArcherApp7Old,
        purpose: "Default purpose for ReactArcherApp7Old"
    },
    ReactArcherApp7: {
        element: ReactArcherApp7,
        purpose: "Default purpose for ReactArcherApp7"
    },
    ReactArcherApp8: {
        element: ReactArcherApp8,
        purpose: "Default purpose for ReactArcherApp8"
    },
    ReactArcherApp9: {
        element: ReactArcherApp9,
        purpose: "Default purpose for ReactArcherApp9"
    },
    SimpleCompNoBakwas: {
        element: SimpleCompNoBakwas,
        purpose: "Default purpose for SimpleCompNoBakwas"
    },
    ReactArcherApp10: {
        element: ReactArcherApp10,
        purpose: "Default purpose for ReactArcherApp10"
    },
    ReactArcherApp11: {
        element: ReactArcherApp11,
        purpose: "Default purpose for ReactArcherApp11"
    },
    SharedDataUseExample1: {
        element: SharedDataUseExample1,
        purpose: "Default purpose for SharedDataUseExample1"
    },
    SharedDataUseExample2: {
        element: SharedDataUseExample2,
        purpose: "Default purpose for SharedDataUseExample2"
    },
    MoreCompNoBakwasWithContext: {
        element: MoreCompNoBakwasWithContext,
        purpose: "Default purpose for MoreCompNoBakwasWithContext"
    },
    ReactArcherApp12: {
        element: ReactArcherApp12,
        purpose: "Default purpose for ReactArcherApp12"
    },
    ReactArcherV1: {
        element: ReactArcherV1,
        purpose: "Default purpose for ReactArcherV1"
    },
    ReactArcherV1ShouldRenderIndentedString: {
        element: ReactArcherV1ShouldRenderIndentedString,
        purpose: "To test: ReactArcherV1 Should Render IndentedString"
    },
    ReactArcherV1ShouldHaveIsolatedContexts:{
        element: ReactArcherV1ShouldHaveIsolatedContexts,
        purpose: "To test: 2 ReactArcherV1 components should Have Isolated Contexts"
    },
    TransformTreeDataGroupByLevelAndParentId: {
        element: TransformTreeDataGroupByLevelAndParentId,
        purpose: "Default purpose for TransformTreeDataGroupByLevelAndParentId"
    },
    TransformTreeDataGroupByLevelAndParentId2: {
        element: TransformTreeDataGroupByLevelAndParentId2,
        purpose: "Default purpose for TransformTreeDataGroupByLevelAndParentId2"
    },
    TransformTreeDataGroupByLevelAndParentId3:{
        element: TransformTreeDataGroupByLevelAndParentId3
    }
}

// Completed componentMapWithPurposes
const componentMapFromPurpose = Object.keys(componentMapWithPurposes).reduce((acc, key) => {
    acc[key] = componentMapWithPurposes[key].element || (() => <h2>No component found for: '{key}'</h2>);
    return acc;
}, {});

// Common method to generate options
const generateOptions = (obj) => {
    return Object.keys(obj).map((key) => ({
        value: key,
        label: key,
    }));
};

// Generate options using the common method
const componentOptions = generateOptions(componentMapFromPurpose);
const arrayTypeOptions = generateOptions(ArrayType);

// Define styles object
const styles = {
    configurationContainer: {
        padding: "10px",
        gap: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        maxWidth: "600px",
        margin: "20px 5px",
    },
    select: {
        marginBottom: "10px",
    },
    selectedType: {
        marginBottom: "20px",
        fontWeight: "bold",
        color: "#333",
    },
    resultContainer: {
        margin: "5px",
    },
    treeDataInputContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        marginBottom: "10px",
    },
};

export { arrayTypeOptions, componentMapFromPurpose as componentMap, componentOptions, styles };
