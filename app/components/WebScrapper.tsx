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
import { ScraperConfiguration } from "../types/webscraper.types";
// import { WebScraperState } from "../types/webscraper.types";

const WebScraper = () => {
  const dispatch = useDispatch();
  const [targetAttributes, setTargetAttributes] = useState({
    attributes: [{ name: 'id', value: '' }],
    filter: [] // This will hold the filter of attributes
  });

  const { url, data: webScrapperData } = useSelector(
    (state: any) => state.webScrapperReducer || {}
  );
  console.log("Received url from state: ", url);

  const handleTargetAttributesChange = (newValue: any) => {
    setTargetAttributes(newValue);
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
      const scraperConfig: ScraperConfiguration = {
        attributes: targetAttributes.attributes, // This should be an array of TargetAttribute
        filter: targetAttributes.filter // This should be an array of strings
      };
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
                  value={targetAttributes}
                  label="Target Attributes (JSON array)"
                  onChange={handleTargetAttributesChange}
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