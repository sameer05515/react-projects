import React, { useMemo, useState } from "react";
import { getAllWords } from "../words";
import WordCard from "../sub-components/word-card/WordCard";

const words = getAllWords();
const WordDashboard = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);

  const selectedWord = useMemo(() => {
    return words[selectedWordIndex];
  }, [selectedWordIndex]);

  const traverse = (increment = 0) => {
    if (selectedWordIndex >= 0) {
      const nextIndex =
        (selectedWordIndex + increment + words.length) % words.length;
      setSelectedWordIndex(() => nextIndex);
    }
  };
  return (
    <div>
      WordDashboard
      <p>
        <b>Total words: </b> {words.length}, <b>Selected Word Index: </b>{" "}
        {selectedWordIndex}
      </p>
      <p>
        <b>Distinct types :</b>{" "}
        {Array.from(
          words.reduce((acc, w) => acc.add(w.type), new Set<string>())
        ).join(", ")}
      </p>
      <div>
        <span
          style={{
            fontWeight: "bolder",
            cursor: "pointer",
            padding: "10px",
            margin: "10px",
          }}
          onClick={() => traverse(-1)}
        >
          {"<<"}
        </span>
        <span
          style={{
            fontWeight: "bolder",
            cursor: "pointer",
            padding: "10px",
            margin: "10px",
          }}
          onClick={() => traverse(1)}
        >
          {">>"}
        </span>
      </div>
      <WordCard wordData={selectedWord} />
    </div>
  );
};

export default WordDashboard;
