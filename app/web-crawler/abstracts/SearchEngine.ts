import { SearchParams } from '../interfaces/SearchParams';
import { SearchResult } from '../interfaces/SearchResult';
import { SearchOperator } from '../interfaces/SearchOperator';

export abstract class SearchEngine {
    protected operators: SearchOperator[];

    constructor() {
        this.operators = [];
    }

    abstract search(params: SearchParams): Promise<SearchResult[]>;
    abstract getName(): string;

    getOperators(): SearchOperator[] {
        return this.operators;
    }
}