// services/ScraperFactory.ts
import { ScraperConfiguration, ScrapedElement } from '../types/webscraper.types';

interface Scraper {
    processHtmlResponse(htmlData: string): ScrapedElement[];
}

export class DOMScraper implements Scraper {
    private configuration: ScraperConfiguration;
    private parser: DOMParser;

    constructor(config: ScraperConfiguration) {
        this.configuration = config;
        this.parser = new DOMParser();
    }

    public processHtmlResponse(htmlData: string): ScrapedElement[] {
        const doc = this.parser.parseFromString(htmlData, "text/html");
        const extractedElements: ScrapedElement[] = [];
    
        // Handle individual attributes
        this.configuration.attributes.forEach(({ name, value }) => {
            const elements = doc.querySelectorAll(`[${name}]`);
            elements.forEach((element) => {
                const extractedValue = element.getAttribute(name);
                if (extractedValue && (!value || extractedValue === value)) {
                    this.updateExtractedElements(extractedElements, name, extractedValue);
                }
            });
        });
    
        // Handle combinations of attributes
        if (this.configuration.combination.length > 0) {
            const combinationSelector = this.configuration.combination.map(attr => `[${attr}]`).join('');
            const combinedElements = doc.querySelectorAll(`div${combinationSelector}`);
            combinedElements.forEach((element) => {
                const combinedValues = this.configuration.combination.map(attr => element.getAttribute(attr)).filter(Boolean);
                if (combinedValues.length === this.configuration.combination.length) {
                    // You can decide how to handle the combined values here
                    this.updateExtractedElements(extractedElements, 'combination', combinedValues.join(', '));
                }
            });
        }
    
        return extractedElements;
    }

    private updateExtractedElements(
        extractedElements: ScrapedElement[],
        attributeName: string,
        value: string
    ): void {
        const existingElement = extractedElements.find(
            element => element.attributeValue === value && element.attributeName === attributeName
        );

        if (existingElement) {
            existingElement.occurrenceCount++;
        } else {
            extractedElements.push({
                attributeName,
                attributeValue: value,
                occurrenceCount: 1
            });
        }
    }
}

export class ScraperFactory {
    static createScraper(config: ScraperConfiguration): Scraper {
        return new DOMScraper(config);
    }
}
