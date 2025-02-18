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
import { ScraperQuery } from "../types/webscraper.types"; // Import the new ScraperQuery type

const WebScraper = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<ScraperQuery>({
    select: ["id"], // Default selection
    from: "*", // Default element type
    where: { class: { equals: "someClass" } } // Default conditions
  });

  const { url, data: webScrapperData } = useSelector(
    (state: any) => state.webScrapperReducer || {}
  );
  console.log("Received url from state: ", url);

  const handleQueryChange = (newValue: any) => {
    setQuery(newValue);
  };

  const resetWebScraper = () => {
    dispatch(resetScraper());
  }

  useEffect(() => {
    if (url) {
      console.log("I'm in dispatch");
      dispatch(fetchScraperData(url) as any);
    }
  }, [url]);

  const handleProcessData = () => {
    if (webScrapperData?.rawData) {
      // Construct the scraper configuration based on the query
      const scraperConfig = {
        attributes: query.select.includes('*') 
          ? [{ name: 'all' }] // Indicate that we want all attributes
          : query.select.map(attr => ({ name: attr })), // Convert select to TargetAttribute format
        whereConditions: Object.entries(query.where).reduce((acc, [key, value]) => {
          // Check if the value is a string or an object
          if (typeof value === 'string') {
            acc[key] = { equals: value }; // Treat as equals
          } else {
            acc[key] = value; // Keep the existing structure
          }
          return acc;
        }, {}), // Use the where conditions directly
        from: query.from // Pass the from selector
      };

      console.log("Final Scraper Configuration:", scraperConfig);

      // Dispatch the processData action with the modified configuration
      dispatch(processData(webScrapperData.rawData, scraperConfig) as any);
    }
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
              <CoreBox gridProps={{ gridSize: { md: 9 } }} styleClasses={[CoreClasses.PADDING.P2]}>
                <CoreJSONEditor
                  value={query}
                  label="Selector Query (JSON format)"
                  onChange={handleQueryChange}
                />
                <CoreButton
                  onClick={handleProcessData}
                  styleClasses={[CoreClasses.MARGIN.MT2]}
                >
                  Process Data
                </CoreButton>
              </CoreBox>
              <CoreBox
                gridProps={{ gridSize: { md: 6 } }}
                styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
              >
                <RawView rawData={JSON.stringify(webScrapperData.rawData, null, 2)} />
              </CoreBox>

              {webScrapperData?.processedData && (
                <CoreBox
                  gridProps={{ gridSize: { md: 6 } }}
                  styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
                >
                  <SmartView IDs={webScrapperData.processedData} />
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