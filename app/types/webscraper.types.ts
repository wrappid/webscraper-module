// types/webscraper.types.ts

// Action Types
export const SAVE_FETCH_SUCCESS = "SAVE_FETCH_SUCCESS";
export const SAVE_FETCH_FAILURE = "SAVE_FETCH_FAILURE";
export const SET_SCRAPER_URL = "SET_SCRAPER_URL";
export const RESET_SCRAPER = "RESET_SCRAPER";
export const PROCESS_PREDEFINED_DATA_SUCCESS = "PROCESS_PREDEFINED_DATA_SUCCESS";
export const PROCESS_CUSTOM_DATA_SUCCESS = "PROCESS_CUSTOM_DATA_SUCCESS";

// Basic Types
export interface WhereCondition {
  equals?: string;
  notEquals?: string;
}

export interface TargetAttribute {
  name: string;
  value?: string;
}

// Scraper Configuration Types
export interface ScraperConfiguration {
  attributes: TargetAttribute[];
  whereConditions?: { [key: string]: WhereCondition };
  from?: string;
  alias?: string;
}

export interface ScraperQuery {
  select: string[];
  from: string;
  where?: { [key: string]: WhereCondition };
  alias?: string;
}

// Scraper Result Types
export interface ScrapedElement {
  attributeName: string;
  attributeValue: string;
  occurrenceCount: number;
  alias?: string;
}

export interface ProcessedDataGroup {
  predefined: ScrapedElement[];
  custom: ScrapedElement[];
}

export interface ScraperResult {
  rawData: string;
  processedData: ScrapedElement[];
}

// State Types
export interface WebScraperState {
  error: boolean;
  message: string;
  success: boolean;
  data: {
    rawData?: string;
    processedData?: ProcessedDataGroup;
  } | null;
  url: string;
  loading: boolean;
}

// Scraper Interface
export interface Scraper {
  /**
   * Processes the HTML response and extracts elements based on the configuration.
   * @param {string} htmlData - The HTML data to be processed.
   * @returns {ScrapedElement[]} An array of extracted elements.
   */
  processHtmlResponse(htmlData: string): ScrapedElement[];
}

// Action Interfaces
export interface SetScraperUrlAction {
  type: typeof SET_SCRAPER_URL;
  payload: string;
}

export interface ResetScraperAction {
  type: typeof RESET_SCRAPER;
}

export interface SaveFetchSuccessAction {
  type: typeof SAVE_FETCH_SUCCESS;
  payload: { contents: string };
}

export interface SaveFetchFailureAction {
  type: typeof SAVE_FETCH_FAILURE;
  payload: string | Error;
}

export interface ProcessPredefinedDataSuccessAction {
  type: typeof PROCESS_PREDEFINED_DATA_SUCCESS;
  payload: {
    result: ScraperResult;
  };
}

export interface ProcessCustomDataSuccessAction {
  type: typeof PROCESS_CUSTOM_DATA_SUCCESS;
  payload: {
    result: ScraperResult;
  };
}

export type WebScraperActionTypes =
  | SetScraperUrlAction
  | ResetScraperAction
  | SaveFetchSuccessAction
  | SaveFetchFailureAction
  | ProcessPredefinedDataSuccessAction
  | ProcessCustomDataSuccessAction;