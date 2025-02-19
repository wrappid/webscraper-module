import { SearchEngine } from '../abstracts/SearchEngine';
import { GoogleSearchEngine } from '../concrete/GoogleSearchEngine';
import { BingSearchEngine } from '../concrete/BingSearchEngine';
import { DuckDuckGoSearchEngine } from '../concrete/DuckDuckGoSearchEngine';

export enum SearchEngineType {
    GOOGLE = 'GOOGLE',
    BING = 'BING',
    DUCKDUCKGO = 'DUCKDUCKGO'
}

export class SearchEngineFactory {
    private static instance: SearchEngineFactory;
    private engines: Map<SearchEngineType, SearchEngine>;

    private constructor() {
        this.engines = new Map();
    }

    public static getInstance(): SearchEngineFactory {
        if (!SearchEngineFactory.instance) {
            SearchEngineFactory.instance = new SearchEngineFactory();
        }
        return SearchEngineFactory.instance;
    }

    public createSearchEngine(type: SearchEngineType): SearchEngine {
        if (this.engines.has(type)) {
            return this.engines.get(type)!;
        }

        let engine: SearchEngine;

        switch (type) {
            case SearchEngineType.GOOGLE:
                engine = new GoogleSearchEngine();
                break;
            case SearchEngineType.BING:
                engine = new BingSearchEngine();
                break;
            case SearchEngineType.DUCKDUCKGO:
                engine = new DuckDuckGoSearchEngine();
                break;
            default:
                throw new Error(`Unsupported search engine type: ${type}`);
        }

        this.engines.set(type, engine);
        return engine;
    }

    public listAvailableEngines(): SearchEngineType[] {
        return Object.values(SearchEngineType);
    }
}