// components/Scrape.ts
import {
    ScrapedElement,
    ScraperConfiguration,
    WebScraperState
} from '../types/webscraper.types';

class Scrape {  
    private configuration: ScraperConfiguration;
    private parser: DOMParser;

    constructor(config: ScraperConfiguration) {
        this.configuration = config;
        this.parser = new DOMParser();
    }

    public processHtmlResponse(htmlData: string): ScrapedElement[] {
        const doc = this.parser.parseFromString(htmlData, "text/html");
        const extractedElements: ScrapedElement[] = [];

        const elements = doc.querySelectorAll(`[${this.configuration.targetAttribute}]`);
        elements.forEach((element) => {
            const extractedValue = element.getAttribute(this.configuration.targetAttribute);
            if (extractedValue) {
                this.updateExtractedElements(extractedElements, extractedValue);
            }
        });

        return extractedElements;
    }

    private updateExtractedElements(extractedElements: ScrapedElement[], value: string): void {
        const existingElement = extractedElements.find(
            element => element.attributeValue === value
        );

        if (existingElement) {
            existingElement.occurrenceCount++;
        } else {
            extractedElements.push({
                attributeName: this.configuration.targetAttribute,
                attributeValue: value,
                occurrenceCount: 1
            });
        }
    }
}

export default Scrape;