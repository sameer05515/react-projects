import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import classes from './markdown-body.module.css';

interface MarkdownComponentProps {
  markdownText?: string;
  additionalStyle?: React.CSSProperties;
}

const MarkdownComponent: FC<MarkdownComponentProps> = ({
  markdownText = "",
  additionalStyle = {},
}) => {
  return (
    <div className={classes["markdown-body"]} style={{ padding: "5px", ...additionalStyle }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
