import { SearchEngineFactory, SearchEngineType } from '../factories/SearchEngineFactory';
import { SearchParams } from '../interfaces/SearchParams';
import { SearchResult } from '../interfaces/SearchResult';
import { SearchOperator } from '../interfaces/SearchOperator';

export class WebCrawler {
    private factory: SearchEngineFactory;

    constructor() {
        this.factory = SearchEngineFactory.getInstance();
    }

    async search(engineType: SearchEngineType, params: SearchParams): Promise<SearchResult[]> {
        const engine = this.factory.createSearchEngine(engineType);
        return await engine.search(params);
    }

    getAvailableEngines(): SearchEngineType[] {
        return this.factory.listAvailableEngines();
    }

    getEngineOperators(engineType: SearchEngineType): SearchOperator[] {
        const engine = this.factory.createSearchEngine(engineType);
        return engine.getOperators();
    }
}