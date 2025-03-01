// services/ScraperService.ts
import { ScraperConfiguration, ScrapedElement, ScraperResult } from '../types/webscraper.types';
import { ScraperFactory } from './ScraperFactory';

/**
 * Singleton service for scraping data from HTML.
 */
export class ScraperService {
    private static instance: ScraperService;

    private constructor() { }

    /**
     * Gets the singleton instance of the ScraperService.
     * @returns {ScraperService} The instance of the ScraperService.
     */
    public static getInstance(): ScraperService {
        if (!ScraperService.instance) {
            ScraperService.instance = new ScraperService();
        }
        return ScraperService.instance;
    }

    /**
     * Processes the HTML data and extracts elements based on the provided configuration.
     * @param {string} htmlData - The HTML data to be processed.
     * @param {ScraperConfiguration} config - The configuration for scraping, including attributes and conditions.
     * @returns {ScraperResult} The result containing raw HTML data and processed data.
     */
    public processScrapeData(htmlData: string, config: ScraperConfiguration): ScraperResult {
        const scraper = ScraperFactory.createScraper(config);
        const scrapedElements: ScrapedElement[] = scraper.processHtmlResponse(htmlData);

        // Map scraped elements to the desired processed data structure
        const processedData: ScrapedElement[] = scrapedElements.map(element => ({
            attributeName: element?.attributeName,
            attributeValue: element?.attributeValue,
            alias: config?.attributes.find(attr => attr.name === element.attributeName)?.value || element.alias, // Use the alias or a default value
            occurrenceCount: element?.occurrenceCount
        }));

        const result: ScraperResult = {
            rawData: htmlData,
            processedData: processedData // Now this is structured as [attributeName, attributeValue, alias]
        };
//testing this can be done 
//const apple=this.deleteTags(htmlData,"a");
//console.log(apple);
        return result;
    }

    public deleteTags(htmlData: string, tagToDelete: string): string {
        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, "text/html");
    
        // Select all the tags that need to be deleted
        const elementsToDelete = doc.querySelectorAll(tagToDelete);
    
        // Remove each selected element
        elementsToDelete.forEach(element => {
            element.remove();
        });
    
        // Serialize the updated HTML back to string
        return doc.documentElement.outerHTML;
    }	

    public filterTags(
        htmlData: string, 
        tagToFilter: string, 
        filterCondition: (element: Element) => boolean
    ): string {
        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, "text/html");
    
        // Select all the tags that match the tagToFilter
        const elementsToFilter = doc.querySelectorAll(tagToFilter);
    
        // Filter elements based on the condition and remove them
        elementsToFilter.forEach(element => {
            if (!filterCondition(element)) {
                element.remove();
            }
        });
    
        // Serialize the updated HTML back to string
        return doc.documentElement.outerHTML;
    }
    
}