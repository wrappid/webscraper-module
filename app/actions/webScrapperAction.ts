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
        const handleSuccess = async (response: any) => {
            try {
                const scraperService = ScraperService.getInstance();
                const result = await scraperService.processScrapeData(response.contents, config);
                dispatch(processDataSuccess(result));
            } catch (error) {
                console.error("Error processing data:", error);
                dispatch({ type: SAVE_FETCH_FAILURE, payload: error });
            }
        };

        try {
            dispatch(
                apiRequestAction(
                    HTTP.GET,
                    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
                    false,
                    {},
                    handleSuccess,
                    SAVE_FETCH_FAILURE
                ) as any
            );
        } catch (error) {
            console.error("Error in fetchScraperData:", error);
            dispatch({ type: SAVE_FETCH_FAILURE, payload: error });
        }
    };
};
