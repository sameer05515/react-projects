import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  useEffect(() => {
    const parseMarkdown = async () => {
      try {
        const parsed = await marked.parse(content);
        setHtml(typeof parsed === 'string' ? parsed : parsed.toString());
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtml(content);
      }
    };

    parseMarkdown();
  }, [content]);

  useEffect(() => {
    if (contentRef.current && html) {
      // Highlight code blocks after rendering
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;

