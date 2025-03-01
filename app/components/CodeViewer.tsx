// components/CodeViewer.tsx
import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prettier from 'prettier/standalone';
import DOMPurify from 'dompurify';

import htmlPlugin from 'prettier/plugins/html';
import {
  CoreBox,
  CoreTypographyBody1,
  CoreAlert,
  CorePaper,
  CoreClasses 
} from '@wrappid/core';

interface CodeViewerProps {
  code: string;
}
import {htmlTags} from "../types/queries"
import DialogDesign from "./DialogDesign"
const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const [formattedHtmlCode, setFormattedHtmlCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const formatHtmlCode = async (htmlCode: string) => {
    try {
      if (typeof htmlCode !== 'string') {
        throw new Error('Input code must be a string');
      }
      const sanitizedHtml = DOMPurify.sanitize(htmlCode);
      let processedCode = sanitizedHtml
        ?.replace(/^["']|["']$/g, '')
        ?.replace(/\\"/g, '"');

      if (!processedCode.includes('</html>') && processedCode.includes('<html')) {
        processedCode += '</html>';
      }

      const formatted = await prettier.format(processedCode, {
        parser: 'html',
        plugins: [htmlPlugin],
        // printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        // htmlWhitespaceSensitivity: 'ignore',
      });
      
      setFormattedHtmlCode(formatted);
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while formatting';
      setError(`Formatting error: ${errorMessage}`);
      setFormattedHtmlCode(htmlCode);
      console.error('Formatting error:', err);
    }
  };

  useEffect(() => {
    if (code) {
      formatHtmlCode(code);
    }
  }, [code]);

  return (
    <>
      {error && (
        <CoreBox styleClasses={[CoreClasses.MARGIN.MB2]}>
          <CoreAlert severity="error">
            <CoreTypographyBody1>
              {error}
            </CoreTypographyBody1>
          </CoreAlert>
        </CoreBox>
      )}
      <CorePaper>
        <CoreBox styleClasses={[CoreClasses.OVERFLOW.OVERFLOW_AUTO, CoreClasses.WIDTH.W_100]}>
          <SyntaxHighlighter 
            language="html"
            showLineNumbers={true}
            wrapLines={true}
             customStyle={{ 
              padding: "8px",
              margin: "0"
            }}
            wrapLongLines={true}
            codeTagProps={{
              wrapLongLines:true
            }}
          >
            {formattedHtmlCode || code}
          </SyntaxHighlighter>
        </CoreBox>
      </CorePaper>
    </>
  );
};

export default CodeViewer;