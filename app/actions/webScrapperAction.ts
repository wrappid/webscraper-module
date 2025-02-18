// actions/webScrapperAction.ts
import { Dispatch } from 'redux';
import { apiRequestAction, HTTP } from "@wrappid/core";
import {
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    PROCESS_DATA_SUCCESS,
    ScraperConfiguration
} from '../types/webscraper.types';
import { ScraperService } from '../services/ScraperService';

export const setUrl = (url: string) => ({
    type: SET_SCRAPER_URL,
    payload: url
});

export const resetScraper = () => ({
    type: RESET_SCRAPER
});

export const processDataSuccess = (data: any) => ({
    type: PROCESS_DATA_SUCCESS,
    payload: data
});

export const fetchScraperData = (url: string, config?: ScraperConfiguration) => {
    return (dispatch: Dispatch) => {
        try {
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
            console.error("Error in fetchScraperData:", error);
            dispatch({ type: SAVE_FETCH_FAILURE, payload: error });
        }
    };
};

export const processData = (contents: string, config?: ScraperConfiguration) => {
    return (dispatch: Dispatch) => {
        try {
            const scraperService = ScraperService.getInstance();
            const result = scraperService.processScrapeData(contents, config);
            dispatch(processDataSuccess(result));
        } catch (error) {
            console.error("Error processing data:", error);
            dispatch({ type: SAVE_FETCH_FAILURE, payload: error });
        }
    };
};