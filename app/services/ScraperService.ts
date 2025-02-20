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

        return result;
    }
}