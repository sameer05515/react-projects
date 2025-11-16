import React, { useState, useEffect } from 'react';
import { diffLines } from 'diff';

const TextDiffViewer = ({ oldContent, newContent }) => {
    const [viewMode, setViewMode] = useState('inline'); // State to manage view mode

    const diff = diffLines(oldContent, newContent);

    // Function to add line numbers
    const addLineNumbers = (text) => {
        return text.split('\n').map((line, index) => ({
            lineNumber: index + 1,
            content: line,
        }));
    };

    const oldContentWithLines = addLineNumbers(oldContent);
    const newContentWithLines = addLineNumbers(newContent);

    return (
        <div>
            <div className="mb-2.5">
                <button
                    className={`px-4 py-2 mr-2.5 text-sm cursor-pointer rounded transition-colors ${
                        viewMode === 'inline'
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => setViewMode('inline')}
                >
                    In-line View
                </button>
                <button
                    className={`px-4 py-2 mr-2.5 text-sm cursor-pointer rounded transition-colors ${
                        viewMode === 'sideBySide'
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => setViewMode('sideBySide')}
                >
                    Side-by-Side View
                </button>
            </div>

            {viewMode === 'inline' ? (
                <div className="whitespace-pre-wrap font-mono leading-6">
                    {diff.map((part, index) => {
                        const className = part.added
                            ? "bg-green-200 no-underline"
                            : part.removed
                            ? "bg-red-200 line-through"
                            : "bg-transparent";

                        return (
                            <span key={index} className={className}>
                                {part.value}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-between gap-4">
                    <div className="w-[48%] border border-gray-300 rounded overflow-y-auto h-[300px] bg-gray-100">
                        <h3 className="font-semibold p-2 bg-gray-200 border-b border-gray-300">Old Content</h3>
                        <pre className="p-2.5 font-mono text-sm leading-6">
                            {oldContentWithLines.map(({ lineNumber, content }) => (
                                <div key={lineNumber} className="flex">
                                    <span className="inline-block w-[30px] text-right pr-2.5 text-gray-500 select-none">{lineNumber}</span>{' '}
                                    <span>{content}</span>
                                </div>
                            ))}
                        </pre>
                    </div>
                    <div className="w-[48%] border border-gray-300 rounded overflow-y-auto h-[300px] bg-gray-100">
                        <h3 className="font-semibold p-2 bg-gray-200 border-b border-gray-300">New Content</h3>
                        <pre className="p-2.5 font-mono text-sm leading-6">
                            {newContentWithLines.map(({ lineNumber, content }) => (
                                <div key={lineNumber} className="flex">
                                    <span className="inline-block w-[30px] text-right pr-2.5 text-gray-500 select-none">{lineNumber}</span>{' '}
                                    <span>{content}</span>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextDiffViewer;
