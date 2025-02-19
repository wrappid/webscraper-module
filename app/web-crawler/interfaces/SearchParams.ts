import { SearchOperator } from './SearchOperator';

export interface SearchParams {
    query: string;
    operators: SearchOperator[];
    maxResults?: number;
    page?: number;
    rateLimit?: number;
}