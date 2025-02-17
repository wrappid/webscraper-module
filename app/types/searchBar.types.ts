// types/searchBar.types.ts
export interface SearchBarProps {
    onSearch?: (url: string) => void;
    placeholder?: string;
}