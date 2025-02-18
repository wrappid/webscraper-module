// types/webscraper.types.ts

export interface WhereCondition {
  equals?: string; // For equality checks
  notEquals?: string; // For inequality checks
}

export interface TargetAttribute {
  name: string; // The name of the attribute (e.g., "id", "class")
  value?: string; // The value of the attribute (optional, used for filtering)
}

export interface ScraperConfiguration {
  attributes: TargetAttribute[]; // Array of target attributes to extract
  whereConditions?: { [key: string]: WhereCondition }; // Object representing attribute names and their conditions
  from?: string; // The selector for the elements to scrape (e.g., "div", "*")
}

/**
 * Processes the HTML response and extracts elements based on the configuration.
 * @param {string} htmlData - The HTML data to be processed.
 * @returns {ScrapedElement[]} An array of extracted elements.
 */
export interface Scraper {
  processHtmlResponse(htmlData: string): ScrapedElement[];

}

export interface ScraperQuery {

  select: string[]; // Array of attributes to select, can include "*"

  from: string; // Selector for the elements to scrape, can include "*"

  where?: { [key: string]: WhereCondition }; // Object representing attribute names and their conditions

}

export interface ScrapedElement {
  attributeName: string;
  attributeValue: string;
  occurrenceCount: number;
}

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

// export interface ScraperConfiguration {
//   targetAttributes: string[];
// }

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
