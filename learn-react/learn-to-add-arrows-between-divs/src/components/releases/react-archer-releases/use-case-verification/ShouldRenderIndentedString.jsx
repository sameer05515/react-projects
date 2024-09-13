import React, { useState } from "react";
import { buildTree } from "../../../../common/utils/indentation-based-string-parser-to-tree-data";
import ReactArcherV1 from "../v1.0/ReactArcherApp1.0";

// Define styles in a JSON object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "20px",
  },
  textarea: {
    width: "90vw",
    height: "100px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  pre: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "90vw",
    backgroundColor: "#f8f9fa",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};

const DisplayTextComponent = ({ title, text, id, showText }) => {
  const [showDisplay, setShowDisplay] = useState(showText || false);
  return (
    <div key={id}>
      <span>{title || "Title should be Provided"}</span>
      <button style={styles.button} onClick={() => setShowDisplay(prev => !prev)}>
        {showDisplay ? "Hide" : "Show"}
      </button>
      {showDisplay && <pre style={styles.pre}>{text}</pre>}
    </div>
  );
};

const ReactArcherV1ShouldRenderIndentedString = () => {
  const [text, setText] = useState("");
  const [displayTextArr, setDisplayTextArr] = useState([]);
  const [resultData, setResultData] = useState([]);

  const handleButtonClick = () => {
    console.log("Button clicked: Starting Processing");
    if (!text.trim()) return; // Added trim to handle cases with only whitespace

    // Reset display text array to avoid appending to old results
    const newDisplayTextArr = [
      { id: 1, title: "Raw Text to be processed", text },
    ];
    setResultData(() => []);

    const { data: treeData, isValid, message } = buildTree(text);

    newDisplayTextArr.push({
      id: 2,
      title: isValid ? "Result: " : "Error message: ",
      text: isValid
        ? JSON.stringify(treeData, null, 2)
        : message || "Missing Error message",
    });

    if (isValid) {
      setResultData(() => [...treeData]);
    }

    setDisplayTextArr(newDisplayTextArr);
  };

  return (
    <>
      <div style={styles.container}>
        <textarea
          style={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button style={styles.button} onClick={handleButtonClick}>
          Render TreeData
        </button>

        <div>
          {displayTextArr.map(({ id, title, text }) => (
            <DisplayTextComponent key={id} id={id} title={title} text={text} showText={true} />
          ))}
        </div>
      </div>
      {resultData && resultData.length > 0 && <div>
        <ReactArcherV1 data={resultData} />
      </div>}
    </>
  );
};

export default ReactArcherV1ShouldRenderIndentedString;
