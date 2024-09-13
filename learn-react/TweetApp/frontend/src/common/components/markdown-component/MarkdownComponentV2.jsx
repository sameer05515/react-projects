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
        <div style={{ position: 'relative' }}>
            <pre>
                <code>{children}</code>
            </pre>
            <button
                onClick={handleCopyCode}
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    background: isCopied ? 'green' : 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                }}
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

const MarkdownComponentV2 = ({ markdownText = "", additionalStyle = {} }) => {
    return (
        <div
            className="markdown-body"
            style={{ padding: "5px", ...additionalStyle }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}  // Use rehype-highlight for block code syntax highlighting
                components={{
                    code({ node, inline, className, children, ...props }) {
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
