// components/WebScraper.tsx
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
import { fetchScraperData, resetScraper } from "../actions/webScrapperAction";
// import { WebScraperState } from "../types/webscraper.types";

const WebScraper = () => {
  const dispatch = useDispatch();
//   const [stateUrl, setStateUrl] = React.useState("");

//   useEffect(() => {
//     // Reset state on page load / refresh
//     dispatch(resetScraper());
//   }, [dispatch]);
  const { url, data: webScrapperData } = useSelector(
    (state: any) => state.webScrapperReducer || {}
  );

console.log("Received url from state: ", url);

  useEffect(() => {
    if (url) {
        console.log("I'm in dispatch");
        
      dispatch(fetchScraperData(url, { targetAttributes: ["id"] } ) as any);
    }
  }, [url]);

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
              <SmartView IDs={webScrapperData.processedData} />
            </CoreBox>
            <CoreBox 
              gridProps={{ gridSize: {md: 6} }} 
              styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}
            >
              <RawView rawData={JSON.stringify(webScrapperData.rawData, null, 2)} />
            </CoreBox>
          </CoreGrid>
        )}
      </CoreBox>
    </CoreLayoutItem>
    </>
  );
};

export default WebScraper;