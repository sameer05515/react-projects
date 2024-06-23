import BirdListV1 from "./sub-components/BirdListV1";
import BirdListV2 from "./sub-components/BirdListV2";
import BirdListV3 from "./sub-components/BirdListV3";
import BirdListV4 from "./sub-components/BirdListV4";
import LanguageSelectorV2_1_2_1 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV2_1_2_1";
import LanguageSelectorV1 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV1";
import LanguageSelectorV2 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV2";
import LanguageSelectorV2_1 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV2_1";
import LanguageSelectorV2_1_1 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV2_1_1";
import LanguageSelectorV2_1_2 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV2_1_2";
import LanguageSelectorV3 from "./sub-components/display-prev-selected-and-next-nodes/LanguageSelectorV3";
import TwoNodeComponent from "./sub-components/arrow-react-archer-examples/TwoNodeComponent";
import TwoNodeComponentV2 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV2";
import TwoNodeComponentV3 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV3";
import TwoNodeComponentV4 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV4";
import TwoNodeComponentV5 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV5";
import TwoNodeComponentV5_1 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV5.1";
import TwoNodeComponentV5_2 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV5.2";
import TwoNodeComponentV5_3 from "./sub-components/arrow-react-archer-examples/TwoNodeComponentV5.3";
import { UseNavigationExampleComponent } from "../../../common/hooks/navigation-util";
import MonthList from "./sub-components/dnd-playground/MonthList";
import TreeList from "./sub-components/dnd-playground/TreeList";
import TreeListV2 from "./sub-components/dnd-playground/TreeListV2";
import TreeListV3 from "./sub-components/dnd-playground/TreeListV3";
import TreeListV4 from "./sub-components/dnd-playground/TreeListV4";
import KeyframeAnimationDemo from "./sub-components/animation/KeyframeAnimationDemo";
import ParallaxScroll from "./sub-components/animation/ParallaxScroll";
import SpinExample from "./sub-components/animation/SpinExample";
import FlipExample from "./sub-components/animation/FlipExample";
import FlipExampleV3 from "./sub-components/animation/FlipExampleV3";
import FlipExampleV2 from "./sub-components/animation/FlipExampleV2";


const componentMapWithPurposes = {
    MyTest: {
        element: () => <>I am just to test</>,
        purpose: "To check if we can pass a dynamic functional component as Argument."
    },
    NonExistingComponent: {
        purpose: "Purpose less, ghumantu bhotiya"
    },
    BirdListV1: {
        element: BirdListV1,
        purpose: `Initial component React functional component that displays a list of bird names in the left section. 
        
        When you right-click on a bird name, a floating popup appears with options to edit, delete, or rename. 
        
        For now, the selected option logs a message to the console.`
    },
    BirdListV2: {
        element: BirdListV2,
        purpose: `
        refactored version of BirdListV1 component, renamed to BirdListV2,
        
        with common functionalities extracted into separate components for better maintainability and readability
        `
    },
    BirdListV3: {
        element: BirdListV3,
        purpose: `
        refactored version of BirdListV2 component, renamed to BirdListV3,
        
        refactored code with styles extracted
        `
    },
    BirdListV4: {
        element: BirdListV4,
        purpose: `
        a refactored version of BirdListV3 and PopupMenu components, 
        
        with styles extracted and popupOptions prop implemented
        `
    },
    LanguageSelectorV1: {
        element: LanguageSelectorV1,
        purpose: `I want to learn, to draw arrows between my currently selected node 
        
        with its previous and next nodes`
    },
    LanguageSelectorV2: {
        element: LanguageSelectorV2,
        purpose: `Enhancement of LanguageSelectorV1. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`
    },
    LanguageSelectorV3: {
        element: LanguageSelectorV3,
        purpose: `Enhancement of LanguageSelectorV2. 
        Here's an updated version of your component where each language, country, and idiom is treated as a separate node. 
        The react-archer library is used to draw arrows connecting the language to its related countries and idioms, 
        with countries positioned to the left and idioms to the right,`
    },
    LanguageSelectorV2_1: {
        element: LanguageSelectorV2_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`
    },
    LanguageSelectorV2_1_1: {
        element: LanguageSelectorV2_1_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`
    },
    LanguageSelectorV2_1_2: {
        element: LanguageSelectorV2_1_2,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`
    },
    LanguageSelectorV2_1_2_1: {
        element: LanguageSelectorV2_1_2_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`
    },
    TwoNodeComponent: {
        element: TwoNodeComponent,
        purpose: `React component that creates two nodes in a column, 
        with an arrow connecting the top node to the bottom node. 
        The arrow will only be shown when the top node is hovered over, using react-archer.`
    },
    TwoNodeComponentV2: {
        element: TwoNodeComponentV2,
        purpose: `Enhancement of React TwoNodeComponent, 
        with an arrow connecting the top node to the bottom node. 
        The arrow relation name will only be shown when the top node is hovered over, using react-archer.`
    },
    TwoNodeComponentV3: {
        element: TwoNodeComponentV3,
        purpose: `Enhancement of React TwoNodeComponentV2, 
        with an arrow connecting the top node to the bottom node. 
        The arrow relation name will only be shown when the top node is hovered over, using react-archer.`
    },
    TwoNodeComponentV4: {
        element: TwoNodeComponentV4,
        purpose: `Enhancement of React TwoNodeComponentV3, 
        Yes, if you pass a div as the label in the relations, 
        
        you can indeed attach a mouseEnter and mouseLeave event handler to that div to control the 
        visibility of the label directly when hovering over it. 
        
        This allows you to show the label only when hovering over the arrow's label itself.`
    },
    TwoNodeComponentV5: {
        element: TwoNodeComponentV5,
        purpose: `
        ### Changes Made:
            1. **HoverLabel Component**: Created a \`HoverLabel\` component to handle the label with hover effect.
            2. **Node Component**: Extracted a \`Node\` component for each node in the ArcherContainer, which accepts \`id\`, \`label\`, \`children\`, and \`relations\` as props.
            3. **Style Handling**: The hover logic is now encapsulated within the \`HoverLabel\` component, making it more reusable and easier to manage.

            This setup makes the components more modular and easier to reuse or extend in the future.
        `
    },
    TwoNodeComponentV5_1: {
        element: TwoNodeComponentV5_1,
        purpose: `
        Enhancement of React TwoNodeComponentV5
        `
    },
    TwoNodeComponentV5_2: {
        element: TwoNodeComponentV5_2,
        purpose: `
        Enhancement of React TwoNodeComponentV5_1
        `
    },
    TwoNodeComponentV5_3:{
        element: TwoNodeComponentV5_3,
        purpose: "A try to render dynamic data"
    },
    UseNavigationExampleComponent:{
        element:UseNavigationExampleComponent,
        purpose: "A try to centralise routing"
    },
    MonthList:{
        element: MonthList,
        purpose:"To learn drag and drop, so that I could enhance user experience"
    },
    TreeList:{
        element: TreeList,
        purpose:"Dnd in a Tree"
    },
    TreeListV2:{
        element: TreeListV2,
        purpose:"Enhancement of TreeList. Dnd in a Tree"
    },
    TreeListV3:{
        element: TreeListV3,
        purpose:"Enhancement of TreeListV2. Dnd in a Tree"
    },
    TreeListV4:{
        element: TreeListV4,
        purpose:"Enhancement of TreeListV3. Dnd in a Tree"
    },
    KeyframeAnimationDemo:{
        element:KeyframeAnimationDemo,
        purpose:"KeyframeAnimationDemo"
    },
    ParallaxScroll:{
        element:ParallaxScroll,
        purpose:"ParallaxScroll"
    },
    SpinExample:{
        element:SpinExample,
        purpose:"SpinExample"
    },
    FlipExample:{
        element:FlipExample,
        purpose:"FlipExample"
    },
    FlipExampleV2:{
        element:FlipExampleV2,
        purpose:"FlipExampleV2"
    },
    FlipExampleV3:{
        element:FlipExampleV3,
        purpose:"FlipExampleV3"
    }
};


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

const componentOptions = generateOptions(componentMapFromPurpose);

export { componentMapFromPurpose as componentMap, componentOptions, styles };