// services/DOMScraper.ts
import { ScraperConfiguration, ScrapedElement, Scraper } from '../types/webscraper.types';

// Class implementing the Scraper interface for DOM scraping
export class DOMScraper implements Scraper {
    private configuration: ScraperConfiguration; // Configuration for the scraper
    private parser: DOMParser; // DOMParser instance for parsing HTML

    /**
     * Constructs a DOMScraper instance with the provided configuration.
     * @param {ScraperConfiguration} config - The configuration for the scraper.
     */
    constructor(config: ScraperConfiguration) {
        this.configuration = config; // Set the scraper configuration
        this.parser = new DOMParser(); // Initialize the DOMParser
    }

    /**
     * Processes the HTML response and extracts elements based on the configuration.
     * @param {string} htmlData - The HTML data to be processed.
     * @returns {ScrapedElement[]} An array of extracted elements.
     */
    public processHtmlResponse(htmlData: string): ScrapedElement[] {
        const doc = this.parser.parseFromString(htmlData, "text/html");
        const extractedElements: ScrapedElement[] = [];
    
        const elements = doc.querySelectorAll(this.configuration.from || '*');
    
        elements.forEach(element => {
            let match = true;
    
            // Apply where conditions (if any)
            if (this.configuration.whereConditions) {
                for (const [filterAttr, condition] of Object.entries(this.configuration.whereConditions)) {
                    const attrValue = element.getAttribute(filterAttr);
                    if (condition.equals !== undefined && attrValue !== condition.equals) {
                        match = false;
                        break;
                    }
                    if (condition.notEquals !== undefined && attrValue === condition.notEquals) {
                        match = false;
                        break;
                    }
                }
            }
    
            // If the element matches the conditions, extract its attributes
            if (match) {
                this.configuration.attributes.forEach(attr => {
                    // Handle extracting all attributes if 'all' or '*' is specified
                    if (attr.name === 'all' || attr.name === '*') {
                        Array.from(element.attributes).forEach(attrNode => {
                            // Pass the tag name along with the attribute
                            this.updateExtractedElements(extractedElements, attrNode.name, attrNode.value, element.tagName);
                        });
                    } else {
                        // Extract a specific attribute
                        const extractedValue = element.getAttribute(attr.name);
                        if (extractedValue) {
                            // Pass the tag name along with the attribute
                            this.updateExtractedElements(extractedElements, attr.name, extractedValue, element.tagName);
                        }
                    }
                });
            }
        });
    
        return extractedElements;
    }
    
    private updateExtractedElements(extractedElements: ScrapedElement[], attributeName: string, attributeValue: string, htmlTag: string) {
        const existingElement = extractedElements.find(el => el.attributeName === attributeName && el.attributeValue === attributeValue && el.htmlTag === htmlTag);
    
        if (existingElement) {
            existingElement.occurrenceCount++;
        } else {
            extractedElements.push({
                attributeName,
                attributeValue,
                occurrenceCount: 1,
                htmlTag, // Store the HTML tag along with the attribute details
            });
        }
    }
    
    
    

    /**
     * Updates the extracted elements array with the new attribute value.
     * @param {ScrapedElement[]} extractedElements - The array of extracted elements.
     * @param {string} attributeName - The name of the attribute to update.
     * @param {string} value - The value of the attribute to update.
     */
    // private updateExtractedElements(
    //     extractedElements: ScrapedElement[],
    //     attributeName: string,
    //     value: string,
    //     htmlTag: string // Add htmlTag as a parameter
    // ): void {
    //     // Check if the element already exists in the extracted elements array
    //     const existingElement = extractedElements.find(
    //         element => element.attributeValue === value && element.attributeName === attributeName && element.htmlTag === htmlTag
    //     );
    
    //     if (existingElement) {
    //         existingElement.occurrenceCount++; // Increment occurrence count if the element already exists
    //     } else {
    //         // Add new element with occurrence count of 1
    //         extractedElements.push({
    //             attributeName,
    //             attributeValue: value,
    //             occurrenceCount: 1,
    //             htmlTag // Store the HTML tag
    //         });
    //     }
    // }
    
}


/**
 * Example implementation of using the ScraperFactory to create a scraper and process HTML data.
 * const scraperConfig: ScraperConfiguration = {
    attributes: [{ name: "id" }, { name: "class" }], // Specify attributes to extract
    whereConditions: {
        "class": "vector-main-menu-landmark", // Condition to match elements with this class
        "data-role": "menu" // Additional condition for data-role attribute
    },
    from: "div" // Specify the element type to scrape, or use "*" for all elements
};

const scraper = ScraperFactory.createScraper(scraperConfig); // Create a new scraper instance
const extractedData = scraper.processHtmlResponse(htmlData); // Process the HTML response to extract data

*/
