import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponent = ({ markdownText = '', additionalStyle={} }) => {
    return (
        <div className='markdown-body' style={{padding:'5px', ...additionalStyle}}>
            <ReactMarkdown  remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
        </div>
    );
};

export default MarkdownComponent;
