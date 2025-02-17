// components/WebScrapper.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    AppContainerLayout, 
    CoreLayoutItem, 
    CoreBox, 
    CoreClasses, 
    CoreGrid 
} from "@wrappid/core";
import SearchBar from "./SearchBar";
import SmartView from "./SmartView";
import RawView from "./RawView";
import { fetchScraperData } from "../actions/webScrapperAction";
import { WebScraperState, ScraperConfiguration } from "../types/webscraper.types";

const WebScrapper = () => {
    const dispatch = useDispatch();
    const { url, data: webScrapperData } = useSelector((state: any) => state.webScrapperReducer || {});

    useEffect(() => {
        if (url) {
            const config: ScraperConfiguration = {
                targetAttribute: 'id',
                targetUrl: url
            };
            dispatch(fetchScraperData(config) as any);
        }
    }, [url, dispatch]);
console.log("Proceessed Data: ", webScrapperData?.processedData);
    return (
        <>
            <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
                <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_COLUMN]}>
                    <SearchBar />
                    {webScrapperData && (
                        <CoreGrid>
                            <CoreBox 
                                gridProps={{ gridSize: {md: 6} }} 
                                styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
                            >
                                <SmartView IDs={webScrapperData?.processedData} />
                            </CoreBox>
                            <CoreBox 
                                gridProps={{ gridSize: {md: 6} }} 
                                styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
                            >
                                <RawView rawData={JSON.stringify(webScrapperData?.rawData, null, 2)} />
                            </CoreBox>
                        </CoreGrid>
                    )}
                </CoreBox>
            </CoreLayoutItem>
        </>
    );
};

export default WebScrapper;