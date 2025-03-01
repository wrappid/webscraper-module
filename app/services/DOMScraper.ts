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
        const doc = this.parser.parseFromString(htmlData, "text/html"); // Parse the HTML data into a document
        const extractedElements: ScrapedElement[] = []; // Array to hold extracted elements

        // Select elements based on the 'from' clause in the configuration
        const elements = doc.querySelectorAll(this.configuration.from || '*');

        // Iterate over each selected element
        elements.forEach(element => {
            let match = true; // Flag to track if the element matches the conditions

            // Check conditions in the 'where' clause
            if (this.configuration.whereConditions) {
                for (const [filterAttr, condition] of Object.entries(this.configuration.whereConditions)) {
                    const attrValue = element.getAttribute(filterAttr); // Get the attribute value of the current element
                    // Check if the attribute value matches the equals condition
                    if (condition.equals !== undefined && attrValue !== condition.equals) {
                        match = false; // If the attribute value doesn't match the equals condition
                        break; // Exit the loop if a condition fails
                    }
                    // Check if the attribute value matches the notEquals condition
                    if (condition.notEquals !== undefined && attrValue === condition.notEquals) {
                        match = false; // If the attribute value matches the notEquals condition
                        break; // Exit the loop if a condition fails
                    }
                }
            }

            // If the element matches the conditions, collect the selected attributes
            if (match) {
                this.configuration.attributes.forEach(attr => {
                    // Handle wildcard selection
                    if (attr.name === 'all' || attr.name === '*') {
                        // If selecting all attributes, collect all attributes of the element
                        Array.from(element.attributes).forEach(attrNode => {
                            this.updateExtractedElements(extractedElements, attrNode.name, attrNode.value, this.configuration.alias); // Use alias for grouping
                        });
                    } else if (attr.name === 'textContent') {
                        // Extract text content separately
                        const textContent = element.textContent?.trim();
                        if (textContent) {
                            this.updateExtractedElements(extractedElements, 'textContent', textContent, this.configuration.alias); // Use alias for grouping
                        }
                    } else {
                        const extractedValue = element.getAttribute(attr.name); // Get the value of the specified attribute
                        if (extractedValue) {
                            this.updateExtractedElements(extractedElements, attr.name, extractedValue, this.configuration.alias); // Use alias for grouping
                        }
                    }
                });
            }
        });

        return extractedElements; // Return the array of extracted elements
    }

    /**
     * Updates the extracted elements array with the new attribute value.
     * @param {ScrapedElement[]} extractedElements - The array of extracted elements.
     * @param {string} attributeName - The name of the attribute to update.
     * @param {string} value - The value of the attribute to update.
     * @param {string} alias - The group name for the attribute.
     */
    private updateExtractedElements(
        extractedElements: ScrapedElement[],
        attributeName: string,
        value: string,
        alias: string // New parameter for attribute group
    ): void {
        // Check if the element already exists in the extracted elements array
        const existingElement = extractedElements.find(
            element => element.attributeValue === value && element.attributeName === attributeName && element.alias === alias
        );

        if (existingElement) {
            existingElement.occurrenceCount++; // Increment occurrence count if the element already exists
        } else {
            // Add new element with occurrence count of 1
            extractedElements.push({
                attributeName,
                attributeValue: value,
                occurrenceCount: 1,
                alias // Set the attribute group using the alias
            });
        }
    }
}