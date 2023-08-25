import React from 'react';
import ReactDiffViewer from 'react-diff-viewer';

const GitDiff = ({oldContent, newContent}) => {  
    return (
      <ReactDiffViewer oldValue={oldContent} newValue={newContent} splitView={true} />
    );
}

export default GitDiff;