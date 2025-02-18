// services/ScraperService.ts
import { Scraper, ScraperConfiguration } from "../types/webscraper.types";
import { DOMScraper } from "./DOMScraper";

// Factory class for creating scraper instances
export class ScraperFactory {
    /**
     * Creates a new scraper instance based on the provided configuration.
     * @param {ScraperConfiguration} config - The configuration for the scraper.
     * @returns {Scraper} A new instance of a scraper.
     */
    static createScraper(config: ScraperConfiguration): Scraper {
        return new DOMScraper(config); // Return a new DOMScraper instance
    }
}