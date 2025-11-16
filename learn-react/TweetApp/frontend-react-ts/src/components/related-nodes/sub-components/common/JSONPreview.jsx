import React from 'react'

const JSONPreview = ({ data, className = "" }) => (
    <div className={`rounded border border-gray-300 p-1.5 ${className}`}>
        <pre className="whitespace-pre-wrap text-xs text-gray-800">
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);

export default JSONPreview