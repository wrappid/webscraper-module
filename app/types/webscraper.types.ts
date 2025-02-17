// types/webscraper.types.ts
export interface ScrapedElement {
  attributeName: string;
  attributeValue: string;
  occurrenceCount: number;
}

export interface ScraperConfiguration {
  targetAttribute: string;
  targetUrl: string;
}

export const SAVE_FETCH_SUCCESS = "SAVE_FETCH_SUCCESS";
export const SAVE_FETCH_FAILURE = "SAVE_FETCH_FAILURE";

export interface WebScraperState {
  error: boolean;
  message: string;
  success: boolean;
  data: any;
  url: string;
}


// types/webScrapper.types.ts
export const FETCH_SCRAPER_DATA = "FETCH_SCRAPER_DATA";
export const SET_SCRAPER_URL = "SET_SCRAPER_URL";
export const RESET_SCRAPER = "RESET_SCRAPER";

export interface WebScrapperData {
  IDs: Array<{ id: string; count: number }>;
  rawData: string;
}