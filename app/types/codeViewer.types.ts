// types/codeViewer.types.ts
export interface CodeViewerProps {
    code: string;
    language?: string;
    maxHeight?: string;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
}

export interface FormattingOptions {
    parser: string;
    plugins: any[];
    printWidth: number;
    tabWidth: number;
    useTabs: boolean;
    htmlWhitespaceSensitivity: 'ignore' | 'strict' | 'css' | undefined;
}