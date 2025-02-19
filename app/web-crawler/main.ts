import { WebCrawler } from './crawler/WebCrawler';
import { SearchEngineType } from './factories/SearchEngineFactory';
import { SearchParams } from './interfaces/SearchParams';

async function main() {
    const crawler = new WebCrawler();
    
    // List available search engines
    console.log('Available search engines:', crawler.getAvailableEngines());
    
    // Get operators for Google
    const googleOperators = crawler.getEngineOperators(SearchEngineType.GOOGLE);
    console.log('Google operators:', googleOperators);
    
    // Perform a search using Google
    const searchParams: SearchParams = {
        query: 'site:example.com filetype:pdf',
        operators: [],
        maxResults: 10,
        page: 1
    };
    
    try {
        const results = await crawler.search(SearchEngineType.GOOGLE, searchParams);
        console.log('Search results:', results);
    } catch (error) {
        console.error('Search error:', error);
    }
}

main();