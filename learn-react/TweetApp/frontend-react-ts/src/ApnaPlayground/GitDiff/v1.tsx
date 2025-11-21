import React from "react";
import TextDiffViewer from "../../components/memory-maps/diff/TextDiffViewerV2";
// import ReactDiffViewer from "react-diff-viewer";

// const GitDiffV1 = ({ oldContent, newContent }) => {
//   return (
//     <ReactDiffViewer
//       oldValue={oldContent}
//       newValue={newContent}
//       splitView={true}
//     />
//   );
// };

const GitDiffV1 = ({ oldContent, newContent }) => (
  <div>
    <h1>GitDiffV1</h1>
    This component is disabled for now with <b>ReactDiffViewer</b> approach. This is due to version issues in TweetApp. <br />
    below is similar implementation with <b>TextDiffViewer</b> approach. <br />
    <hr />
    <TextDiffViewer newContent={newContent} oldContent={oldContent} />
  </div>
);

export default GitDiffV1;
