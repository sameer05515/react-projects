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
import SPPTableV1_0_0 from "./sub-components/reusable-comparison-component/SPPTableV1_0_0";
import SmartEditorV4Dashboard_V1_0_0 from "../../apna-playground/smart-editor/main/SmartEditorV4Dashboard_V1_0_0";
import AppChatGPTDashboardV1_0_0 from "../../apna-playground/chatgpt-renderer/AppChatGPTDashboardV1_0_0";
import VideoDownloader from '../../apna-playground/video-download/VideoDownloader';


export const ComponentModules = {
    TestingPurpose: "Testing Purpose",
    MyCompaniesAndProjectsExplorer:
        "To collect all My (personal and official) Projects Information",
    NewComponentDesign_SPPTable: "New Component Design: SPPTable",
    Upgrade_MemoryMaps_component_to_MemoryMapsV1_1_0:
        "[MILESTONE_1]: Upgrade MemoryMaps component to MemoryMapsV1_1_0",
    Upgrade_SmartEditorV3_component_to_SmartEditorV4:
        "Upgrade: SmartEditorV3 component to SmartEditorV4",
    Explore_and_Upgrade_ChatGPTRenderer_Project:"Explore and Upgrade: ChatGPTRenderer Project"
};

const moduleWithPurposes = [
    {
        module: ComponentModules.TestingPurpose,
        overallPurpose: " Build and test new testing components"
    },
    {
        module: ComponentModules.Upgrade_SmartEditorV3_component_to_SmartEditorV4,
        overallPurpose: `
        ================================================================

        ######
            [Abbreviations used]: 
                SE- SmartEditorV3
                SP- SmartPreviewerV4
                
        #######
  
        Overall Target:
            Target version: SmartEditorV4
                Expectations:
                    1. Create a reusable SmartEditorV4 component:
                        - The user can input a text, either from a textarea or a CKEditor ( or via a SkeletonEditor, actual implementation can be varied) .
                        - Input text can be previewed as
                            - raw text (visible in a 'p'),
                            - html,
                            - yaml,
                            - markdown-text,
                            - TIS-text (tabbed indented string format) visible in
                                - raw text format,
                                - JSON format,
                                - with TreeViewer ,
                            - YAML-Text visible in raw-text format, 
                                - raw text format,
                                - JSON format,
                                - with TreeViewer ,
                    2. Proper Error handling should be taken care
                    3. Documented artifact for
                        - Existing functionality and bugs/issues of SmartEditorV3
                        - Bug-fixes done in SmartEditorV4
                        - List of new functionality introduced in SmartEditorV4

            Brainstorming:
                1. Why this change needed?
                    - Reason 1:- Due to introduction of 'TIS format', 'MemoryMapSkeleton' and 'TreeView' components
                        - Current 'SmartEditorV3' can only take a raw text in TIS format and render into a Tree Structure.
                            - Although, this is working well. But, to edit TIS format text, again we need to manually edit in text-area. However, this same operation (editing a TIS text) is done interactively, in 'AddUpdateSkeletonUsingTreeEditor' with use of TreeView and PopupMenu3 to edit a 'MemoryMapSkeleton' (in MemoryMaps mmodule). 
                                However current 'MemoryMapSkeleton' and 'MemoryMapSkeleton' are limited to render only a single line.
                                    This is because, in backend the TIS text is saved as raw string.
                                Due to this limitation, difficulty has been observed in below use cases
                                    a). [Problem Statement]: #1:  User can not save a multi-line text in a node
                                        -[Workaround]: As a workaround, User has to break all his thoughts into multiple lines
                                            If user wants to save a multi-line text, (say, code or configurations), then he has to compromise with its ( multi-line text's ) look and feel.
                                        - [Possible solution]: Since, in backend, TIS is saved as string, we can directly convert the TIS to equivalent YAML text.
                                            At time of edit or render existing TIS (which would be then in YAML format), there will be change
                                                Parse the text from YAML to JSON (in place of, existing 'TIS to JSON' parsing) and then render with help of 'TreeView' component.
                                                    Note: In current version of TreeView, we can pass our custom renderers via its 'renderNode' prop
        ================================================================
        `
    },
    {
        module: ComponentModules.NewComponentDesign_SPPTable,
        overallPurpose: `
          ================================================================
  
          Overall Target:
              Target version: SPPTableV1_1_0
              Expectations:
                  1. Create a reusable comparison table component:
                      - The user can provide data in a specific format, which will be rendered as a table.
                      - The user can edit individual cells.
                      - Each editable cell can contain markdown text for formatting.
                      - Provide customizable table styles (e.g., header color, border style, etc.).
                      - Support for sorting and filtering rows based on column values.

          Note:- 
                This Module's development is now being developed in 'next-ts-basics' project. 
                Please refer board of 'next-ts-basics' project.
                Reasons for why it is moved will be published accordingly.
          
          ================================================================
      `,
    },
    {
        module: ComponentModules.Upgrade_MemoryMaps_component_to_MemoryMapsV1_1_0,
        overallPurpose: `
        ==========================================================

        Overall Target:
            Target version: MemoryMapsV1_1_0
            Expectations:
                1. [MILESTONE_1]: Upgrade MemoryMaps component to MemoryMapsV1_1_0
        ===========================================================
        `
    },
    {
        module:ComponentModules.Explore_and_Upgrade_ChatGPTRenderer_Project,
        overallPurpose:`
        ==========================================================

        Overall Target:
            Target version: TBD
            Expectations:
                1. [MILESTONE_1]: Explore ChatGPTRenderer Project implementation
                2. [MILESTONE_2]: Identify area of improvements
                3. [MILESTONE_3]: Upgrade
        ===========================================================
        `
    }
];

const componentMapWithPurposes = {
    MyTest: {
        element: () => <>I am just to test</>,
        purpose:
            "To check if we can pass a dynamic functional component as Argument.",
    },
    NonExistingComponent: {
        purpose: "Purpose less, ghumantu bhotiya",
    },
    BirdListV1: {
        element: BirdListV1,
        purpose: `Initial component React functional component that displays a list of bird names in the left section. 
        
        When you right-click on a bird name, a floating popup appears with options to edit, delete, or rename. 
        
        For now, the selected option logs a message to the console.`,
    },
    BirdListV2: {
        element: BirdListV2,
        purpose: `
        refactored version of BirdListV1 component, renamed to BirdListV2,
        
        with common functionalities extracted into separate components for better maintainability and readability
        `,
    },
    BirdListV3: {
        element: BirdListV3,
        purpose: `
        refactored version of BirdListV2 component, renamed to BirdListV3,
        
        refactored code with styles extracted
        `,
    },
    BirdListV4: {
        element: BirdListV4,
        purpose: `
        a refactored version of BirdListV3 and PopupMenu components, 
        
        with styles extracted and popupOptions prop implemented
        `,
    },
    LanguageSelectorV1: {
        element: LanguageSelectorV1,
        purpose: `I want to learn, to draw arrows between my currently selected node 
        
        with its previous and next nodes`,
    },
    LanguageSelectorV2: {
        element: LanguageSelectorV2,
        purpose: `Enhancement of LanguageSelectorV1. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`,
    },
    LanguageSelectorV3: {
        element: LanguageSelectorV3,
        purpose: `Enhancement of LanguageSelectorV2. 
        Here's an updated version of your component where each language, country, and idiom is treated as a separate node. 
        The react-archer library is used to draw arrows connecting the language to its related countries and idioms, 
        with countries positioned to the left and idioms to the right,`,
    },
    LanguageSelectorV2_1: {
        element: LanguageSelectorV2_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`,
    },
    LanguageSelectorV2_1_1: {
        element: LanguageSelectorV2_1_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`,
    },
    LanguageSelectorV2_1_2: {
        element: LanguageSelectorV2_1_2,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`,
    },
    LanguageSelectorV2_1_2_1: {
        element: LanguageSelectorV2_1_2_1,
        purpose: `Enhancement of LanguageSelectorV2. 
        To draw arrows between the nodes (languages, countries, and idioms) in a React component,
         we can use the react-archer library,`,
    },
    TwoNodeComponent: {
        element: TwoNodeComponent,
        purpose: `React component that creates two nodes in a column, 
        with an arrow connecting the top node to the bottom node. 
        The arrow will only be shown when the top node is hovered over, using react-archer.`,
    },
    TwoNodeComponentV2: {
        element: TwoNodeComponentV2,
        purpose: `Enhancement of React TwoNodeComponent, 
        with an arrow connecting the top node to the bottom node. 
        The arrow relation name will only be shown when the top node is hovered over, using react-archer.`,
    },
    TwoNodeComponentV3: {
        element: TwoNodeComponentV3,
        purpose: `Enhancement of React TwoNodeComponentV2, 
        with an arrow connecting the top node to the bottom node. 
        The arrow relation name will only be shown when the top node is hovered over, using react-archer.`,
    },
    TwoNodeComponentV4: {
        element: TwoNodeComponentV4,
        purpose: `Enhancement of React TwoNodeComponentV3, 
        Yes, if you pass a div as the label in the relations, 
        
        you can indeed attach a mouseEnter and mouseLeave event handler to that div to control the 
        visibility of the label directly when hovering over it. 
        
        This allows you to show the label only when hovering over the arrow's label itself.`,
    },
    TwoNodeComponentV5: {
        element: TwoNodeComponentV5,
        purpose: `
        ### Changes Made:
            1. **HoverLabel Component**: Created a \`HoverLabel\` component to handle the label with hover effect.
            2. **Node Component**: Extracted a \`Node\` component for each node in the ArcherContainer, which accepts \`id\`, \`label\`, \`children\`, and \`relations\` as props.
            3. **Style Handling**: The hover logic is now encapsulated within the \`HoverLabel\` component, making it more reusable and easier to manage.

            This setup makes the components more modular and easier to reuse or extend in the future.
        `,
    },
    TwoNodeComponentV5_1: {
        element: TwoNodeComponentV5_1,
        purpose: `
        Enhancement of React TwoNodeComponentV5
        `,
    },
    TwoNodeComponentV5_2: {
        element: TwoNodeComponentV5_2,
        purpose: `
        Enhancement of React TwoNodeComponentV5_1
        `,
    },
    TwoNodeComponentV5_3: {
        element: TwoNodeComponentV5_3,
        purpose: "A try to render dynamic data",
    },
    UseNavigationExampleComponent: {
        element: UseNavigationExampleComponent,
        purpose: "A try to centralise routing",
    },
    MonthList: {
        element: MonthList,
        purpose: "To learn drag and drop, so that I could enhance user experience",
    },
    TreeList: {
        element: TreeList,
        purpose: "Dnd in a Tree",
    },
    TreeListV2: {
        element: TreeListV2,
        purpose: "Enhancement of TreeList. Dnd in a Tree",
    },
    TreeListV3: {
        element: TreeListV3,
        purpose: "Enhancement of TreeListV2. Dnd in a Tree",
    },
    TreeListV4: {
        element: TreeListV4,
        purpose: "Enhancement of TreeListV3. Dnd in a Tree",
    },
    KeyframeAnimationDemo: {
        element: KeyframeAnimationDemo,
        purpose: "KeyframeAnimationDemo",
    },
    ParallaxScroll: {
        element: ParallaxScroll,
        purpose: "ParallaxScroll",
    },
    SpinExample: {
        element: SpinExample,
        purpose: "SpinExample",
    },
    FlipExample: {
        element: FlipExample,
        purpose: "FlipExample",
    },
    FlipExampleV2: {
        element: FlipExampleV2,
        purpose: "FlipExampleV2",
    },
    FlipExampleV3: {
        element: FlipExampleV3,
        purpose: "FlipExampleV3",
    },
    SPPTableV1_0_0: {
        element: SPPTableV1_0_0,
        purpose: `
        Target:
            Target version: SPPTableV1_1_0
            Expectations:
                1. Create a reusable comparison table component:
                    - The user can provide data in a specific format, which will be rendered as a table.
                    - The user can edit individual cells.
                    - Each editable cell can contain markdown text for formatting.
                    - Provide customizable table styles (e.g., header color, border style, etc.).
                    - Support for sorting and filtering rows based on column values.
    
        Tasks:
            [Commpleted] - Implement a basic table component.
            [Planned] - Enhance it further to meet the specified targets.
            [Planned] - Add support for validation in editable cells (optional).
            [Planned] - Include export and import options for the table data (optional).
            [Planned] - Add row and column operations like adding/removing rows or columns dynamically.
            [Planned] - Support responsive design to ensure table works across different devices.
            [Planned] - Allow table data to be stored and retrieved via local storage or external API.
            [Planned] - Add cell-level formatting options such as font style, text alignment, and background color.

        Note:- This Module's development is now being developed in 'next-ts-basics' project. Please refer board of 'next-ts-basics' project.
        `,
        module: ComponentModules.NewComponentDesign_SPPTable,
    },
    SmartEditorV4Dashboard_V1_0_0: {
        element: SmartEditorV4Dashboard_V1_0_0,
        purpose: `
        [ACHIEVEMENTS / EFFORTS]: AT A GLANCE: IN THIS VERSION
        - working for creating basic setup for
            Rendering different format of text by using 'SmartEditorV3' and 'SmartEditorV4[_unstable]'
                Note : Unstable tag will be removed, once component will be groomed properly.
            Compare the results and match output with 'expectation' mentioned in the provided ''


        - Below are observations for 'SmartEditorV3'
            functionalities
                TBD
            limitations
                TBD
            Potential Bugs and possible improvements
                -[PB/PI]: [Planned]: - Few fieldNames and constant names like 'availableOutputTypes' or 'availableInputTypes' or 'inputOutputMapping' looks confusing in 'SmartEditorV3'
                    We should think to change the variable names, as well as values of fields, such as 
                        'availableOutputTypes' to 'smartEditorOutputTypes' or 'SE_Output_Formats'
                        'availableInputTypes' to 'smartEditorInputTypes' or 'SE_Input_Tools_Options'
                    Also we should create a separate options for 'SmartPreviewerV3'.
                    [Explaination: For this change-request]: Now we have multiple format and tools, in which a 'SmartEditorV3' can take input and use tools to edit text and then output a result text.
                    

        [TASKS STATUS]: in current dashboard version 'SmartEditorV4Dashboard[V1_0_0]' (with 'SmartEditorV3') :
        - [Planned]: Understand and document current functionalities, limitations , bugs and possible improvements of 'SmartEditorV3'
        - [Planned]: Paralelly fix/acknowledge changes in snapshot version 'SmartEditorV4[_unstable]'.
        - [Planned]: Create a list for: 
            - 'Input-formats' in which SE can take input via 'initialValue' props
            - 'Input-Tools' currently used by SE : For sake of quickness, 'TextArea' and 'CKEditor'
            - 'Input-formats' in which SP can take input via 'initialValue' props 


        `,
        isExperimentalComponent: true,
        module: ComponentModules.Upgrade_SmartEditorV3_component_to_SmartEditorV4
    },
    AppChatGPTDashboardV1_0_0:{
        element: AppChatGPTDashboardV1_0_0,
        purpose:`
    [Planned]: Explore ChatGPT data
        `,
        isExperimentalComponent: true,
        module: ComponentModules.Explore_and_Upgrade_ChatGPTRenderer_Project
    },
    VideoDownloader:{
        element: VideoDownloader,
        purpose:`
    [Planned]: Explore ChatGPT data
        `,
        isExperimentalComponent: true,
        module: ComponentModules.Explore_and_Upgrade_ChatGPTRenderer_Project
    }
};

// Completed componentMapWithPurposes
const componentMapFromPurpose = Object.keys(componentMapWithPurposes).reduce(
    (acc, key) => {
        acc[key] =
            componentMapWithPurposes[key].element ||
            (() => <h2>No component found for: '{key}'</h2>);
        return acc;
    },
    {}
);

// Common method to generate options
const generateOptions = (obj) => {
    return Object.keys(obj).map((key) => ({
        value: key,
        label: key,
    }));
};

const getLabelForKey = (key) => {
    const compu = componentMapWithPurposes[key];
    return key && compu
        ? `${key} - {${compu.module || ComponentModules.TestingPurpose}, ${compu.majorRelease ? "Major Release" : "Minor Release"
        }}`
        : "";
};

const generateOptionsV1 = (obj) => {
    return Object.keys(obj).map((key, idx) => ({
        id: `id_${idx + 1}`,
        value: key,
        label: getLabelForKey(key),
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

// const componentOptions = generateOptions(componentMapFromPurpose);
const componentOptions = generateOptionsV1(componentMapWithPurposes);

export const getNextNthOption = (
    // arr: Array<Record<string, any>>,
    selected,
    n
) => {
    const selectedIndex = componentOptions.findIndex(
        (option) => option.value === selected
    );

    if (selectedIndex === -1) return null;

    const nextIndex = (selectedIndex + n) % componentOptions.length;

    // Ensure the index is positive if the result is negative
    const validNextIndex =
        nextIndex < 0 ? componentOptions.length + nextIndex : nextIndex;

    return componentOptions[validNextIndex];
};

// Placeholder styles and inputOutputMapping (not provided in the original code)
export const labelStyle = { marginRight: "10px" };

const isExperimentalComponent = (details) => {
    if (!details) return false;

    const isExperimental =
        details.experimentalComponentAsPerLearningImplementation;

    if (isExperimental !== undefined) {
        return isExperimental;
    }

    return (
        details.module === ComponentModules.TestingPurpose ||
        details.module ===
        ComponentModules.TestingPurpose_LearningHooksAndGenerics ||
        details.module ===
        ComponentModules.TestingPurpose_SelectBoxStyleFineTuning ||
        details.module === ComponentModules.MyCompaniesAndProjectsExplorer
    );
};

export const getComponentDetails = (
    key
) => {
    const details = componentMapWithPurposes[key];
    const moduleWithPurpose = moduleWithPurposes.find(
        (m) => m.module === details?.module
    );

    let componentLabel = getLabelForKey(key) || "Please Select a component";

    return {
        ...details,
        module: details?.module || ComponentModules.TestingPurpose,
        majorRelease: details?.majorRelease ?? false, // Assign default if undefined
        // experimentalComponentAsPerLearningImplementation:
        //   details?.experimentalComponentAsPerLearningImplementation ?? false,
        experimentalComponentAsPerLearningImplementation:
            isExperimentalComponent(details),
        componentLabel,
        purpose:
            (details?.purpose || "") + "\n" +
            (moduleWithPurpose?.overallPurpose || "")

        ,
    };
};

export { componentMapFromPurpose as componentMap, componentOptions, styles };
