// actions/webScrapperAction.ts
import { Dispatch } from "redux"; // Import Dispatch type from Redux
import { apiRequestAction, HTTP } from "@wrappid/core"; // Import API request action and HTTP methods
import {
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    PROCESS_DATA_SUCCESS,
    ScraperConfiguration,
} from "../types/webscraper.types"; // Import action types and ScraperConfiguration type
import { ScraperService } from "../services/ScraperService"; // Import the ScraperService for processing data

/**
 * Action creator to set the scraper URL.
 * @description This function creates an action to set the URL for the scraper.
 * @param {string} url - The URL to be set for the scraper.
 * @returns {object} The action object with type and payload.
 */
export const setUrl = (url: string) => ({
    type: SET_SCRAPER_URL,
    payload: url,
});

/**
 * Action creator to reset the scraper state.
 * @description This function creates an action to reset the state of the scraper.
 * @returns {object} The action object with type for resetting the scraper.
 */
export const resetScraper = () => ({
    type: RESET_SCRAPER,
});

/**
 * Action creator for successful data processing.
 * @description This function creates an action to indicate successful processing of data.
 * @param {any} data - The processed data to be stored in the state.
 * @returns {object} The action object with type and payload.
 */
export const processDataSuccess = (data: any) => ({
    type: PROCESS_DATA_SUCCESS,
    payload: data,
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
    return (dispatch: Dispatch) => {
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
            dispatch({ type: SAVE_FETCH_FAILURE, payload: error }); // Dispatch failure action
        }
    };
};

/**
 * Thunk action to process scraped data.
 * @description This function processes the raw HTML content using the ScraperService and dispatches the result.
 * @param {string} contents - The raw HTML content to be processed.
 * @param {ScraperConfiguration} config - The configuration for the scraper.
 * @returns {function} A thunk function that dispatches actions based on the processing result.
 */
// actions/webScrapperAction.ts
export const processData = (contents: string, config: ScraperConfiguration) => {

    return (dispatch: Dispatch) => {

        try {
            const scraperService = ScraperService.getInstance();
            const result = scraperService.processScrapeData(contents, config);
            // Dispatch success action with the processed result and query key
            dispatch({
                type: PROCESS_DATA_SUCCESS,
                payload: {
                    // queryKey, // Add the query key here
                    result, // Ensure this is an array
                },
            });
        } catch (error) {
            console.error("Error processing data:", error);
            dispatch({ type: SAVE_FETCH_FAILURE, payload: error });

        }

    };

};