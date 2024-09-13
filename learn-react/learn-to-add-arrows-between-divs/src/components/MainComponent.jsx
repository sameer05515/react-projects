import React, { useMemo, useState } from "react";
import Select from "react-select";
import {
    arrayTypeOptions,
    componentMap,
    componentOptions,
    styles,
} from "../common/utils/main-component-constants";
import {
    generateTreeData,
    getUpdatedArrayForType,
} from "../common/utils/object-and-array-operation-utils";
import RadioButtonsComponent from "../common/components/RadioButtonsComponent";

// Reusable SelectInput Component
const SelectInput = ({ options, onChange, placeholder }) => (
    <Select
        options={options}
        onChange={onChange}
        styles={{
            container: (base) => ({ ...base, ...styles.select }),
            placeholder: (base) => ({
                ...base,
                color: "#888",
                fontStyle: "italic",
            }),
        }}
        placeholder={placeholder}
    />
);

const itemTypeOptions = [
    { value: "ArrayType", label: "Select Existing ArrayType" },
    { value: "GENERATED_TREE_DATA", label: "Generate Tree Data" },
];

// Extracted ConfigurationContainer component
const ConfigurationContainer = ({
    configurations,
    setConfigurations,
    handleSelectChange,
    itemTypeOptions
}) => (
    <div style={styles.configurationContainer}>       

        <RadioButtonsComponent
            initialSelectedOption={itemTypeOptions[0].value}
            options={itemTypeOptions}
            onChange={(option) =>
                setConfigurations((prev) => ({
                    ...prev,
                    arraySourceMode: option?.value || "",
                }))
            }
            showSelectedOptionInfo={false}
        />

        {configurations.arraySourceMode === "ArrayType" && (
            <SelectInput
                options={arrayTypeOptions}
                onChange={(option) =>
                    handleSelectChange(option, "selectedArrayType")
                }
                placeholder="Select an ArrayType..."
            />
        )}

        {configurations.arraySourceMode === "GENERATED_TREE_DATA" && (
            <div style={styles.treeDataInputContainer}>
                <label>
                    Depth:
                    <input
                        type="number"
                        value={configurations.treeDepth || ""}
                        onChange={(e) =>
                            setConfigurations((prev) => ({
                                ...prev,
                                treeDepth: parseInt(e.target.value, 10),
                            }))
                        }
                    />
                </label>
                <label>
                    Items Per Level:
                    <input
                        type="number"
                        value={configurations.itemsPerLevel || ""}
                        onChange={(e) =>
                            setConfigurations((prev) => ({
                                ...prev,
                                itemsPerLevel: parseInt(e.target.value, 10),
                            }))
                        }
                    />
                </label>
            </div>
        )}

        <div style={styles.selectedType}>
            selected ArraySourceMode: {configurations.arraySourceMode || "None"}{" "}
            <br />
            {configurations.arraySourceMode === "ArrayType" && (
                <>Selected Type: {configurations.selectedArrayType || "null"}</>
            )}
            {configurations.arraySourceMode === "GENERATED_TREE_DATA" && (
                <>
                    Selected treeDepth: {configurations.treeDepth}, <br />
                    Selected itemsPerLevel: {configurations.itemsPerLevel}
                </>
            )}
        </div>

        <SelectInput
            options={componentOptions}
            onChange={(option) => handleSelectChange(option, "selectedComponent")}
            placeholder="Select a COMPONENT..."
        />
    </div>
);

// Main Component
const MainComponent = () => {
    const [configurations, setConfigurations] = useState({
        selectedComponent: null,
        selectedArrayType: null,
        arraySourceMode: "",
        itemsPerLevel: 1,
        treeDepth: 1,
    });

    const handleSelectChange = (selectedOption, type) => {
        setConfigurations((prevState) => ({
            ...prevState,
            [type]: selectedOption ? selectedOption.value : null,
        }));
    };

    const getData = () => {
        if (configurations.arraySourceMode === "ArrayType") {
            return configurations.selectedArrayType
                ? getUpdatedArrayForType(
                    configurations.selectedArrayType
                ) : []
        } else if (configurations.arraySourceMode === "GENERATED_TREE_DATA") {
            return generateTreeData(configurations.treeDepth, configurations.itemsPerLevel);
        }
    }

    const DisplayComponent = useMemo(() => {
        return componentMap[configurations.selectedComponent] || null;
    }, [configurations.selectedComponent]);

    return (
        <>
            <ConfigurationContainer
                configurations={configurations}
                setConfigurations={setConfigurations}
                handleSelectChange={handleSelectChange}
                itemTypeOptions={itemTypeOptions}
            />

            <div style={styles.resultContainer}>
                {DisplayComponent && (
                    <DisplayComponent
                        data={getData()}
                    />
                )}
            </div>
        </>
    );
};

export { MainComponent };
