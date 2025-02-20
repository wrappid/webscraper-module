// components/WebScraper.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppContainerLayout,
  CoreLayoutItem,
  CoreBox,
  CoreClasses,
  CoreGrid,
  CoreJSONEditor,
  CoreButton
} from "@wrappid/core";
import SearchBar from "./SearchBar";
import SmartView from "./SmartView";
import RawView from "./RawView";
import { fetchScraperData, processData, resetScraper } from "../actions/webScrapperAction";
import { predefinedQueries } from '../types/queries'; // Import predefined queries

const WebScraper = () => {
  const dispatch = useDispatch();
  const [customQuery, setCustomQuery] = useState(predefinedQueries); // Store all predefined queries
  const { url, data: webScrapperData } = useSelector(
    (state: any) => state.webScrapperReducer || {}
  );

  const resetWebScraper = () => {
    dispatch(resetScraper());
  };

  useEffect(() => {
    if (url) {
      dispatch(fetchScraperData(url) as any);
    }
  }, [url]);

  const handleProcessData = () => {
    if (webScrapperData?.rawData) {
      // Process all predefined queries
      predefinedQueries.forEach(query => {
        const attr = query.select.map(attr => ({ name: attr }))
        const scraperConfig = {
          attributes: attr, // Convert select to TargetAttribute format
          whereConditions: query?.where, // Use the where conditions directly
          from: query?.from, // Pass the from selector
          alias: query?.alias // Pass the alias as the attribute group
        };

        // console.log("Processing data for query: ", scraperConfig);

        // Pass the key as the queryKey
        dispatch(processData(webScrapperData.rawData, scraperConfig) as any);
      });
    }
  };

  const handleCustomQueryChange = (newValue: any) => {
    setCustomQuery(newValue);
  };

  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <CoreButton
          label="Reset Reducer"
          onClick={resetWebScraper}
        />
        <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_COLUMN]}>
          <SearchBar />
          {webScrapperData && (
            <CoreGrid>
              {webScrapperData.rawData && (
                <CoreBox gridProps={{ gridSize: { md: 9 } }} styleClasses={[CoreClasses.PADDING.P2]}>
                  <CoreJSONEditor
                    value={JSON.stringify(customQuery, null, 2)} // Display all queries in JSON format
                    label="Selector Queries (JSON format)"
                    onChange={handleCustomQueryChange}
                  />
                  <CoreButton
                    onClick={handleProcessData}
                    styleClasses={[CoreClasses.MARGIN.MT2]}
                  >
                    Process Data
                  </CoreButton>
                </CoreBox>
              )}
              {webScrapperData.rawData && (
                <CoreBox gridProps={{ gridSize: { md: 6 } }} styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}>
                  <RawView rawData={JSON.stringify(webScrapperData.rawData, null, 2)} />
                </CoreBox>
              )}


              {webScrapperData?.processedData && (
                <CoreBox
                  gridProps={{ gridSize: { md: 6 } }}
                  styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
                >
                  <SmartView extractedData={webScrapperData.processedData} />
                </CoreBox>
              )}
            </CoreGrid>
          )}
        </CoreBox>
      </CoreLayoutItem>
    </>
  );
};

export default WebScraper;