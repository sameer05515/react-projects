import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    fetchMemoryMaps,
    updateMemoryMapForGivenSkeleton,
} from "../../redux/slices/memoryMapSlice";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import { buildTree } from "../../common/util/indentation-based-string-parser-to-tree-data";
import TextDiffViewer from "./diff/TextDiffViewerV2";
import { addUniqueIdsToTree } from "../../common/util/id-adder-util";
import { SkeletonTextType } from "./util/constants";

// Define styles in a JSON object
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "20px",
        padding: "0 20px",  // Add padding to the container
    },
    textarea: {
        width: "90vw",
        height: "100px",
        marginBottom: "10px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        resize: "none",  // Disable manual resizing
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        marginTop: "10px",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#0056b3", // Darker blue for hover state
    },
    buttonFocus: {
        outline: "2px solid #0056b3", // Outline on focus for accessibility
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "10px", // Adds spacing between buttons
        marginTop: "10px",
    },
    errorMessage: {
        color: "red",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    treeContainer: {
        marginTop: "20px",
        width: "100%",  // Ensures the tree takes full width of container
    },
    diffContainer: {
        marginTop: "20px",
        width: "100%",  // Ensures the diff viewer takes full width of container
    },
};

export const AddUpdateSkeletonForMemoryMapItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: initialFormData } = location.state || {};
    const dispatch = useDispatch();

    const [isValidSkeleton, setIsValidSkeleton] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resultData, setResultData] = useState([]);

    const [formData, setFormData] = useState({
        uniqueId: initialFormData?.uniqueId || "",
        name: initialFormData?.name || "",
        skeleton: initialFormData?.skeleton || "",
        skeletonTextType: initialFormData?.skeletonTextType || SkeletonTextType.IndentedString,
    });

    const validate = () => {
        if (!isValidSkeleton) {
            setErrorMessage("Please preview and validate skeleton text first!!");
            return false;
        }
        return true;
    };

    const upsertSkeleton = (event) => {
        event.preventDefault();
        if (validate()) {
            const action = dispatch(
                updateMemoryMapForGivenSkeleton({
                    ...formData,
                    uniqueId: formData.uniqueId,
                })
            );
            action.then(() => {
                dispatch(fetchMemoryMaps());
                navigate(-1);
            })
        }

    };

    const previewSkeleton = () => {
        if (!formData.skeleton.trim()) {
            setErrorMessage("Please provide some valid skeleton text!!");
            return;
        }
        const { data: treeData, isValid, message } = buildTree(formData.skeleton);

        if (isValid) {
            setIsValidSkeleton(true);
            // setResultData(treeData);
            setResultData(addUniqueIdsToTree(treeData, 'preview_Skeleton'.toUpperCase(), false));
        } else {
            setIsValidSkeleton(false);
            setErrorMessage(message || "Missing Error message");
        }
    };

    return (
        <div>
            <h2> {formData?.skeleton ? "Update " : "Add "}Skeleton</h2>
            {!initialFormData?.uniqueId ? (
                <p>Invalid memory map provided. Unable to process!!</p>
            ) : (
                <h3>{initialFormData?.name}</h3>
            )}

            {errorMessage && <span style={styles.errorMessage}>{errorMessage}</span>}

            <div style={styles.container}>
                <textarea
                    style={styles.textarea}
                    value={formData.skeleton}
                    onChange={(e) => {
                        setIsValidSkeleton(false);
                        setFormData((prev) => ({ ...prev, skeleton: e.target.value }));
                    }
                    }
                />

                {formData.skeleton.trim() && (
                    <button
                        style={styles.button}
                        onClick={previewSkeleton}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        onFocus={(e) => e.currentTarget.style.outline = styles.buttonFocus.outline}
                        onBlur={(e) => e.currentTarget.style.outline = 'none'}
                    >
                        Validate and preview rendered skeleton
                    </button>
                )}

                <div style={styles.buttonContainer}>
                    {formData?.skeleton?.trim() && isValidSkeleton && resultData?.length > 0 && (
                        <button
                            style={styles.button}
                            onClick={upsertSkeleton}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                            onFocus={(e) => e.currentTarget.style.outline = styles.buttonFocus.outline}
                            onBlur={(e) => e.currentTarget.style.outline = 'none'}
                        >
                            Upsert
                        </button>
                    )}
                    <button
                        style={styles.button}
                        onClick={() => navigate(-1)}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        onFocus={(e) => e.currentTarget.style.outline = styles.buttonFocus.outline}
                        onBlur={(e) => e.currentTarget.style.outline = 'none'}
                    >
                        Cancel
                    </button>
                </div>

                {resultData.length > 0 && isValidSkeleton && (
                    <div style={styles.treeContainer}>
                        <Tree data={resultData} />
                    </div>
                )}

                <div style={styles.diffContainer}>
                    <TextDiffViewer oldContent={initialFormData?.skeleton} newContent={formData?.skeleton} />
                </div>
            </div>
        </div>
    );
};
