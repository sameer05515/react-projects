import React from "react";
import styles from "./WordCard.v1.module.css"; // CSS module for styling

export type Word = {
  uniqueId: string;
  word: string|undefined;
  type: string;
  meanings: string[];
  examples: string[];
};

type WordCardProps = {
  wordData: Word;
};

const WordCard: React.FC<WordCardProps> = ({ wordData }) => {
  const { word, type, meanings, examples } = wordData;

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.wordTitle}>{word||'missing word title'}</h2>
      <p className={styles.wordType}>{type}</p>

      <div className={styles.meaningsSection}>
        <h3>Meanings</h3>
        <ul>
          {meanings.map((meaning, index) => (
            <li key={index}>{meaning}</li>
          ))}
        </ul>
      </div>

      <div className={styles.examplesSection}>
        <h3>Examples</h3>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>"{example}"</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordCard;
