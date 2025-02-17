// actions/webScrapperAction.ts
import { Dispatch } from 'redux';
import { apiRequestAction, HTTP } from "@wrappid/core";
import {
    FETCH_SCRAPER_DATA,
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    ScraperConfiguration,
    ScrapedElement
} from '../types/webscraper.types';
import Scrape from '../components/Scrape';

export const setWebScrapperData = (data: ScrapedElement[]) => ({
    type: FETCH_SCRAPER_DATA,
    payload: data
});

export const setUrl = (url: string) => ({
    type: SET_SCRAPER_URL,
    payload: url
});

export const resetScraper = () => ({
    type: RESET_SCRAPER
});

export const fetchScraperData = (config: ScraperConfiguration) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(
                apiRequestAction(
                    HTTP.GET,
                    `https://api.allorigins.win/get?url=${encodeURIComponent(config.targetUrl)}`,
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