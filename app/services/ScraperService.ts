// services/ScraperService.ts
import { ScraperConfiguration, ScrapedElement, ScraperResult } from '../types/webscraper.types';
import { ScraperFactory } from './ScraperFactory';

export class ScraperService {
    private static instance: ScraperService;
    // private observers: ((result: ScraperResult) => void)[] = [];

    private constructor() { }

    public static getInstance(): ScraperService {
        if (!ScraperService.instance) {
            ScraperService.instance = new ScraperService();
        }
        return ScraperService.instance;
    }

    // public subscribe(observer: (result: ScraperResult) => void): void {
    //     this.observers.push(observer);
    // }

    // public unsubscribe(observer: (result: ScraperResult) => void): void {
    //     this.observers = this.observers.filter(obs => obs !== observer);
    // }

    public processScrapeData(htmlData: string, config: ScraperConfiguration): ScraperResult {
        const scraper = ScraperFactory.createScraper(config);
        const processedData = scraper.processHtmlResponse(htmlData);

        const result: ScraperResult = {
            rawData: htmlData,
            processedData
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
}