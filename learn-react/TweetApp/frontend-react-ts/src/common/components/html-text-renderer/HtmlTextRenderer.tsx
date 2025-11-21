import React from 'react';
import DOMPurify from 'dompurify';

const HtmlTextRendrer: React.FC<{ htmlString?: string }> = ({ htmlString = "" }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default HtmlTextRendrer;
