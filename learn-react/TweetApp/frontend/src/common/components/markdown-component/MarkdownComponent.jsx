import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const MarkdownComponent = ({ markdownText = "", className = "" }) => {
  return (
    <div className={`markdown-body whitespace-pre-wrap break-words rounded-md bg-transparent p-2 text-gray-900 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className: codeClassName, children, ...props }) {
            if (inline) {
              return (
                <code
                  className={`rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 ${codeClassName || ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={codeClassName} {...props}>
                {children}
              </code>
            );
          },
          pre({ children, ...props }) {
            return (
              <pre
                className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm"
                {...props}
              >
                {children}
              </pre>
            );
          },
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
