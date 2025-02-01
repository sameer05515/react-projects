import React, { useState } from 'react';
import { diffLines } from 'diff';

const TextDiffViewer = ({ oldContent, newContent }) => {
    const [viewMode, setViewMode] = useState('inline');

    const diff = diffLines(oldContent, newContent);

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
            <div style={styles.buttonContainer}>
                <button
                    style={viewMode === 'inline' ? styles.activeButton : styles.button}
                    onClick={() => setViewMode('inline')}
                >
                    In-line View
                </button>
                <button
                    style={viewMode === 'sideBySide' ? styles.activeButton : styles.button}
                    onClick={() => setViewMode('sideBySide')}
                >
                    Side-by-Side View
                </button>
            </div>

            {viewMode === 'inline' ? (
                <div style={styles.diffContainer}>
                    {diff.map((part, index) => {
                        const style = part.added
                            ? styles.added
                            : part.removed
                            ? styles.removed
                            : styles.normal;

                        return (
                            <span key={index} style={style}>
                                {part.value}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <div style={styles.sideBySideContainer}>
                    <div style={styles.codeSection}>
                        <h3>Old Content</h3>
                        <pre style={styles.code}>
                            {oldContentWithLines.map(({ lineNumber, content }) => {
                                const lineStyle = diff.some(d => d.value.includes(content) && d.removed)
                                    ? styles.removedLine
                                    : styles.normalLine;
                                return (
                                    <div key={lineNumber} style={{ ...styles.line, ...lineStyle }}>
                                        <span style={styles.lineNumber}>{lineNumber}</span>{' '}
                                        <span>{content}</span>
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                    <div style={styles.codeSection}>
                        <h3>New Content</h3>
                        <pre style={styles.code}>
                            {newContentWithLines.map(({ lineNumber, content }) => {
                                const lineStyle = diff.some(d => d.value.includes(content) && d.added)
                                    ? styles.addedLine
                                    : styles.normalLine;
                                return (
                                    <div key={lineNumber} style={{ ...styles.line, ...lineStyle }}>
                                        <span style={styles.lineNumber}>{lineNumber}</span>{' '}
                                        <span>{content}</span>
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    buttonContainer: {
        marginBottom: '10px',
    },
    button: {
        padding: '8px 16px',
        marginRight: '10px',
        fontSize: '14px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    activeButton: {
        padding: '8px 16px',
        marginRight: '10px',
        fontSize: '14px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: '1px solid #007bff',
        borderRadius: '4px',
    },
    diffContainer: {
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        lineHeight: '1.5',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    added: {
        backgroundColor: '#d4fcbc',
        textDecoration: 'none',
    },
    removed: {
        backgroundColor: '#fbb6c2',
        textDecoration: 'line-through',
    },
    normal: {
        backgroundColor: 'transparent',
    },
    sideBySideContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    codeSection: {
        width: '48%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflowY: 'auto',
        height: '300px',
        backgroundColor: '#f5f5f5',
    },
    code: {
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    line: {
        display: 'flex',
    },
    lineNumber: {
        display: 'inline-block',
        width: '30px',
        textAlign: 'right',
        paddingRight: '10px',
        color: '#999',
        userSelect: 'none',
    },
    normalLine: {
        backgroundColor: 'transparent',
    },
    addedLine: {
        backgroundColor: '#d4fcbc',
    },
    removedLine: {
        backgroundColor: '#fbb6c2',
    },
};

export default TextDiffViewer;
