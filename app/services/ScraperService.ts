// services/ScraperService.ts
import { ScraperConfiguration, ScrapedElement, ScraperResult } from '../types/webscraper.types';
import { ScraperFactory } from './ScraperFactory';

export class ScraperService {
    private static instance: ScraperService;
    private observers: ((result: ScraperResult) => void)[] = [];

    private constructor() { }

    public static getInstance(): ScraperService {
        if (!ScraperService.instance) {
            ScraperService.instance = new ScraperService();
        }
        return ScraperService.instance;
    }

    public subscribe(observer: (result: ScraperResult) => void): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: (result: ScraperResult) => void): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public async processScrapeData(htmlData: string, config: ScraperConfiguration): Promise<ScraperResult> {
        const scraper = ScraperFactory.createScraper(config);
        const processedData = scraper.processHtmlResponse(htmlData);

        const result: ScraperResult = {
            rawData: htmlData,
            processedData
        };

        this.notifyObservers(result);
        return result;
    }

    private notifyObservers(result: ScraperResult): void {
        this.observers.forEach(observer => observer(result));
    }
}