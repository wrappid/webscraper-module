// reducers/webScrapperReducer.ts
import Scrape from "../components/Scrape";
import {
    FETCH_SCRAPER_DATA,
    SET_SCRAPER_URL,
    RESET_SCRAPER,
    SAVE_FETCH_SUCCESS,
    SAVE_FETCH_FAILURE,
    WebScraperState
} from "../types/webscraper.types";

const initialState: WebScraperState = {
    data: null,
    url: "",
    error: false,
    message: "Enter a URL to start scraping",
    success: false
};

const webScrapperReducer = (state = initialState, action: any): WebScraperState => {
    switch (action.type) {
        case SAVE_FETCH_SUCCESS:
            const scraper = new Scrape({
                targetAttribute: 'id',
                targetUrl: state.url
            });
            const rawData = action.payload.contents;
            const processedData = scraper.processHtmlResponse(rawData);
            return {
                ...state,
                data: { rawData, processedData },
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
                data: null
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