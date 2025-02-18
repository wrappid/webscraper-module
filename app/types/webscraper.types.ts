// types/webscraper.types.ts
export interface ScrapedElement {
  attributeName: string;
  attributeValue: string;
  occurrenceCount: number;
}

export interface ScraperConfiguration {
  targetAttributes: string[];
}

// export interface ScraperResult {
//   rawData: string;
//   processedData: ScrapedElement[];
// }

// export interface WebScraperState {
//   error: boolean;
//   message: string;
//   success: boolean;
//   data: ScraperResult | null;
//   url: string;
// }

export interface WebScraperState {
  error: boolean;
  message: string;
  success: boolean;
  data: ScraperResult | null | {};
  url: string;
  loading: boolean;
}

export interface ScraperResult {
  rawData: string;
  processedData: ScrapedElement[];
}

export const SAVE_FETCH_SUCCESS = "SAVE_FETCH_SUCCESS";
export const SAVE_FETCH_FAILURE = "SAVE_FETCH_FAILURE";
export const SET_SCRAPER_URL = "SET_SCRAPER_URL";
export const RESET_SCRAPER = "RESET_SCRAPER";
export const PROCESS_DATA_SUCCESS = "PROCESS_DATA_SUCCESS";



export interface ScraperConfiguration {
  targetAttributes: string[];
}

// Action Type Interfaces
interface SetScraperUrlAction {
  type: typeof SET_SCRAPER_URL;
  payload: string;
}

interface ResetScraperAction {
  type: typeof RESET_SCRAPER;
}

interface SaveFetchSuccessAction {
  type: typeof SAVE_FETCH_SUCCESS;
}

interface SaveFetchFailureAction {
  type: typeof SAVE_FETCH_FAILURE;
  payload: string;
}

interface ProcessDataSuccessAction {
  type: typeof PROCESS_DATA_SUCCESS;
  payload: any;
}

export type WebScraperActionTypes =
  | SetScraperUrlAction
  | ResetScraperAction
  | SaveFetchSuccessAction
  | SaveFetchFailureAction
  | ProcessDataSuccessAction;
