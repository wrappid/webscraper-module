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

        this.configuration.targetAttributes.forEach(attribute => {
            const elements = doc.querySelectorAll(`[${attribute}]`);
            elements.forEach((element) => {
                const extractedValue = element.getAttribute(attribute);
                if (extractedValue) {
                    this.updateExtractedElements(extractedElements, attribute, extractedValue);
                }
            });
        });

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
