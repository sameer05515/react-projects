import React from 'react';
import DOMPurify from 'dompurify';
import { Parser } from 'html-to-react';

const HtmlTextRendrer = ({ htmlString="" }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);
  const htmlToReactParser = new Parser();

  return <>{htmlToReactParser.parse(sanitizedHtml)}</>;
};

export default HtmlTextRendrer;
