// utils/codeFormatter.ts
import prettier from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import DOMPurify from 'dompurify';
import { FormattingOptions } from '../types/codeViewer.types';

const defaultOptions: FormattingOptions = {
    parser: 'html',
    plugins: [htmlPlugin],
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    htmlWhitespaceSensitivity: 'ignore'
};

export const sanitizeCode = (code: string): string => {
    if (typeof code !== 'string') {
        throw new Error('Input code must be a string');
    }
    return DOMPurify.sanitize(code);
};

export const processHtmlCode = (code: string): string => {
    let processedCode = code
        ?.replace(/^["']|["']$/g, '')
        ?.replace(/\\"/g, '"');

    if (!processedCode.includes('</html>') && processedCode.includes('<html')) {
        processedCode += '</html>';
    }

    return processedCode;
};

export const formatCode = async (code: string, options: Partial<FormattingOptions> = {}): Promise<string> => {
    const sanitizedCode = sanitizeCode(code);
    const processedCode = processHtmlCode(sanitizedCode);

    return prettier.format(processedCode, {
        ...defaultOptions,
        ...options
    });
};