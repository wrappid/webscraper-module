// reducers/webScrapperReducer.ts
import {
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    PROCESS_DATA_SUCCESS,
    WebScraperState,
    // ScraperConfiguration
} from '../types/webscraper.types';

const initialState: WebScraperState = {
    data: {},
    url: "",
    error: false,
    message: "Enter a URL to start scraping",
    success: false,
    loading: false,
    processedData: []
};

const webScrapperReducer = (state = initialState, action: any): WebScraperState => {
    switch (action.type) {
        case SAVE_FETCH_SUCCESS:
            return {
                ...state,
                data: { ...(state?.data || {}), rawData: action.payload?.contents || "Data not found" },
                loading: false,
                error: false,
                success: true,
                message: "Data fetched successfully"
            };
        case PROCESS_DATA_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,  // Keep other properties in state.data
                    processedData: [
                        // @ts-ignore
                        ...((state.data.processedData && Array.isArray(state.data.processedData)) ? state.data.processedData : []), // Ensure processedData is an array
                        ...action.payload.result.processedData // Append the new processedData
                    ]
                },
                loading: false,
                error: false,
                success: true,
                message: "Processed data successfully"
            };

        case SAVE_FETCH_FAILURE:
            return {
                ...state,
                error: true,
                success: false,
                message: typeof action.payload === 'string'
                    ? action.payload
                    : action.payload?.message || "Failed to fetch data",
                data: null,
                loading: false
            };

        case SET_SCRAPER_URL:
            return {
                ...state,
                url: action.payload,
                loading: true,
                message: "Fetching data..."
            };

        case RESET_SCRAPER:
            return initialState;

        default:
            return state;
    }
};

export default webScrapperReducer;