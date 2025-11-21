import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Choose a highlight.js theme

// In complete code. Target was to just highlight code and provide facility to copy code.
// Will complete this later

const CodeBlock = ({ children }) => {
    const [isCopied, setIsCopied] = useState(false);
    const codeString = String(children).trim();

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codeString); // Copies the code to clipboard
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    };

    return (
        <div className="relative">
            <pre className="overflow-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
                <code>{children}</code>
            </pre>
            <button
                onClick={handleCopyCode}
                className={`absolute right-2 top-2 rounded px-2 py-1 text-xs font-semibold text-white transition ${
                    isCopied ? "bg-green-600" : "bg-gray-600 hover:bg-gray-700"
                }`}
            >
                {isCopied ? "Copied!" : "Copy"}
            </button>
        </div>
    );
};

const MarkdownComponentV2 = ({ markdownText = "", className = "" }) => {
    return (
        <div className={`markdown-body whitespace-pre-wrap break-words rounded-md bg-transparent p-3 text-gray-900 ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}  // Use rehype-highlight for block code syntax highlighting
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        if (inline) {
                            // Return inline code without syntax highlighting
                            return <code className={className} {...props}>{children}</code>;
                        } else {
                            // Apply syntax highlighting only to block code
                            return <CodeBlock>{children}</CodeBlock>;
                        }
                    },
                }}
            >
                {markdownText}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownComponentV2;
