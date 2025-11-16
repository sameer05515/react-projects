import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownComponent = ({ markdownText = "", className = "" }) => {
  return (
    <div className={`markdown-body whitespace-pre-wrap break-words rounded-md bg-transparent p-2 text-gray-900 ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
