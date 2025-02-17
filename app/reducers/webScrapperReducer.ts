// reducers/webScrapperReducer.ts
import {
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    PROCESS_DATA_SUCCESS,
    WebScraperState,
    ScraperConfiguration
} from '../types/webscraper.types';

const defaultConfig: ScraperConfiguration = {
    targetAttributes: ['id', 'class', 'data-testid']
};

const initialState: WebScraperState = {
    data: null,
    url: "",
    error: false,
    message: "Enter a URL to start scraping",
    success: false,
    loading: false
};

const webScrapperReducer = (state = initialState, action: any): WebScraperState => {
    switch (action.type) {
        case SAVE_FETCH_SUCCESS:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
                message: "Processing data..."
            };

        case PROCESS_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,
                success: true,
                message: "Data fetched successfully"
            };

        case SAVE_FETCH_FAILURE:
            return {
                ...state,
                error: true,
                success: false,
                message: "Failed to fetch data",
                data: null,
                loading: false
            };

        case SET_SCRAPER_URL:
            return {
                ...state,
                url: action.payload
            };

        case RESET_SCRAPER:
            return initialState;

        default:
            return state;
    }
};

export default webScrapperReducer;