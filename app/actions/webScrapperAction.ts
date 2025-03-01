// actions/webScrapperAction.ts
import { Dispatch } from "redux"; // Import Dispatch type from Redux
import { apiRequestAction, HTTP } from "@wrappid/core"; // Import API request action and HTTP methods
import {
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    ScraperConfiguration,
    PROCESS_PREDEFINED_DATA_SUCCESS,
    PROCESS_CUSTOM_DATA_SUCCESS,
    WebScraperActionTypes,
    ScraperResult,
    SaveFetchFailureAction,
    SetScraperUrlAction,
    ResetScraperAction,
    ProcessPredefinedDataSuccessAction,
    ProcessCustomDataSuccessAction,
} from "../types/webscraper.types"; // Import types and action types
import { ScraperService } from "../services/ScraperService"; // Import the ScraperService for processing data

/**
 * Action creator to set the scraper URL.
 * @description This function creates an action to set the URL for the scraper.
 * @param {string} url - The URL to be set for the scraper.
 * @returns {SetScraperUrlAction} The action object with type and payload.
 */
export const setUrl = (url: string): SetScraperUrlAction => ({
    type: SET_SCRAPER_URL,
    payload: url,
});

/**
 * Action creator to reset the scraper state.
 * @description This function creates an action to reset the state of the scraper.
 * @returns {ResetScraperAction} The action object with type for resetting the scraper.
 */
export const resetScraper = (): ResetScraperAction => ({
    type: RESET_SCRAPER,
});

/**
 * Action creator for successful predefined data processing.
 * @description This function creates an action to indicate successful processing of predefined data.
 * @param {ScraperResult} data - The processed data to be stored in the state.
 * @returns {ProcessPredefinedDataSuccessAction} The action object with type and payload.
 */
export const processPredefinedDataSuccess = (data: ScraperResult): ProcessPredefinedDataSuccessAction => ({
    type: PROCESS_PREDEFINED_DATA_SUCCESS,
    payload: { result: data },
});

/**
 * Action creator for successful custom data processing.
 * @description This function creates an action to indicate successful processing of custom data.
 * @param {ScraperResult} data - The processed data to be stored in the state.
 * @returns {ProcessCustomDataSuccessAction} The action object with type and payload.
 */
export const processCustomDataSuccess = (data: ScraperResult): ProcessCustomDataSuccessAction => ({
    type: PROCESS_CUSTOM_DATA_SUCCESS,
    payload: { result: data },
});

/**
 * Action creator for fetch failure.
 * @description This function creates an action to indicate a failure in fetching data.
 * @param {string | Error} error - The error message or Error object.
 * @returns {SaveFetchFailureAction} The action object with type and payload.
 */
export const saveFetchFailure = (error: string | Error): SaveFetchFailureAction => ({
    type: SAVE_FETCH_FAILURE,
    payload: error instanceof Error ? error.message : error,
});

/**
 * Thunk action to fetch data from a given URL.
 * @description This function dispatches an API request action to fetch data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @param {ScraperConfiguration} [config] - Optional configuration for the scraper.
 * @returns {function} A thunk function that dispatches actions based on the API request result.
 */
export const fetchScraperData = (
    url: string,
    config?: ScraperConfiguration
) => {
    return (dispatch: Dispatch<WebScraperActionTypes>) => {
        try {
            // Dispatch an API request action to fetch data from the URL
            dispatch(
                apiRequestAction(
                    HTTP.GET,
                    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
                    false,
                    {},
                    SAVE_FETCH_SUCCESS,
                    SAVE_FETCH_FAILURE
                ) as any
            );
        } catch (error) {
            console.error("Error in fetchScraperData:", error); // Log any errors that occur
            dispatch(saveFetchFailure(error as Error)); // Dispatch failure action with proper typing
        }
    };
};

/**
 * Thunk action to process scraped data.
 * @description This function processes the raw HTML content using the ScraperService and dispatches the result.
 * @param {string} contents - The raw HTML content to be processed.
 * @param {ScraperConfiguration} config - The configuration for the scraper.
 * @param {boolean} [isPredefined=false] - Whether this is processing predefined queries.
 * @returns {function} A thunk function that dispatches actions based on the processing result.
 */
export const processData = (
    contents: string,
    config: ScraperConfiguration,
    isPredefined: boolean = false
) => {
    return (dispatch: Dispatch<WebScraperActionTypes>) => {
        try {
            const scraperService = ScraperService.getInstance();
            const result = scraperService.processScrapeData(contents, config);

            // Dispatch the appropriate success action based on whether it's predefined or custom
            if (isPredefined) {
                dispatch(processPredefinedDataSuccess(result));
            } else {
                dispatch(processCustomDataSuccess(result));
            }
        } catch (error) {
            console.error("Error processing data:", error);
            dispatch(saveFetchFailure(error as Error));
        }
    };
};