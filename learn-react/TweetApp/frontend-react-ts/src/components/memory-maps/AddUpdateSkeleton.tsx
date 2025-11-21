import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";
import {
    fetchMemoryMaps,
    updateMemoryMapForGivenSkeleton,
} from "../../redux/slices/memoryMapSlice";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import { buildTree } from "../../common/util/indentation-based-string-parser-to-tree-data";
import TextDiffViewer from "./diff/TextDiffViewerV2";
import { addUniqueIdsToTree } from "../../common/util/id-adder-util";
import { SkeletonTextType } from "./util/constants";

interface TreeNode {
    uniqueId: string;
    name: string;
    children?: TreeNode[];
    [key: string]: any;
}

interface FormData {
    uniqueId: string;
    name: string;
    skeleton: string;
    skeletonTextType: string;
}

// Styles moved to Tailwind CSS classes

export const AddUpdateSkeletonForMemoryMapItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: initialFormData } = location.state || {};
    const dispatch: AppDispatch = useDispatch();

    const [isValidSkeleton, setIsValidSkeleton] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resultData, setResultData] = useState<TreeNode[]>([]);

    const [formData, setFormData] = useState<FormData>({
        uniqueId: (initialFormData as any)?.uniqueId || "",
        name: (initialFormData as any)?.name || "",
        skeleton: (initialFormData as any)?.skeleton || "",
        skeletonTextType: (initialFormData as any)?.skeletonTextType || SkeletonTextType.IndentedString,
    });

    const validate = () => {
        if (!isValidSkeleton) {
            setErrorMessage("Please preview and validate skeleton text first!!");
            return false;
        }
        return true;
    };

    const upsertSkeleton = () => {
        if (validate()) {
            const action = dispatch(
                updateMemoryMapForGivenSkeleton({
                    ...formData,
                    uniqueId: formData.uniqueId,
                }) as any
            );
            action.then(() => {
                dispatch(fetchMemoryMaps() as any);
                navigate(-1);
            });
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
            setResultData(addUniqueIdsToTree(treeData, 'preview_Skeleton'.toUpperCase(), false) as TreeNode[]);
        } else {
            setIsValidSkeleton(false);
            setErrorMessage(message || "Missing Error message");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4"> {formData?.skeleton ? "Update " : "Add "}Skeleton</h2>
            {!initialFormData?.uniqueId ? (
                <p className="text-red-600 font-semibold">Invalid memory map provided. Unable to process!!</p>
            ) : (
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{initialFormData?.name}</h3>
            )}

            {errorMessage && <span className="text-red-600 font-bold mb-2.5 block">{errorMessage}</span>}

            <div className="flex flex-col items-start mt-5 px-5">
                <textarea
                    className="w-[90vw] max-w-full h-[100px] mb-2.5 p-2.5 text-base rounded border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.skeleton}
                    onChange={(e) => {
                        setIsValidSkeleton(false);
                        setFormData((prev) => ({ ...prev, skeleton: e.target.value }));
                    }
                    }
                    placeholder="Enter skeleton text..."
                />

                {formData.skeleton.trim() && (
                    <button
                        className="px-5 py-2.5 text-base rounded border-none bg-blue-600 text-white cursor-pointer mt-2.5 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={previewSkeleton}
                    >
                        Validate and preview rendered skeleton
                    </button>
                )}

                <div className="flex flex-row gap-2.5 mt-2.5">
                    {formData?.skeleton?.trim() && isValidSkeleton && resultData?.length > 0 && (
                        <button
                            className="px-5 py-2.5 text-base rounded border-none bg-blue-600 text-white cursor-pointer transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={upsertSkeleton}
                        >
                            Upsert
                        </button>
                    )}
                    <button
                        className="px-5 py-2.5 text-base rounded border-none bg-gray-600 text-white cursor-pointer transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>

                {resultData.length > 0 && isValidSkeleton && (
                    <div className="mt-5 w-full">
                        <Tree data={resultData} />
                    </div>
                )}

                <div className="mt-5 w-full">
                    <TextDiffViewer oldContent={initialFormData?.skeleton} newContent={formData?.skeleton} />
                </div>
            </div>
        </div>
    );
};
