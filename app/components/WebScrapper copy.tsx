import React from 'react';
import {
  AppContainerLayout,
  CoreLayoutItem,
  CoreBox,
  CoreClasses,
  CoreGrid,
  CoreTypographyBody1
} from "@wrappid/core";
import SearchBar from './SearchBar';
// import SmartView from './SmartView';
// import RawView from './RawView';
// import SearchBar  from './SearchBar';
// import SmartView from './SmartView';
// import RawView from './RawView';

export default function WebScrapper() {
  console.log("I'm web scrapper, I got called");
  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_COLUMN]}>

          <SearchBar />
          <CoreGrid>
            <CoreBox gridProps={{ gridSize: {md: 6} }} styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}>

              {/* <SmartView /> */}
            </CoreBox>
            <CoreBox gridProps={{ gridSize: {md: 6} }} styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.FLEX.DIRECTION_ROW]}>
              {/* <RawView /> */}

            </CoreBox>
          </CoreGrid>
        </CoreBox>
      </CoreLayoutItem>
    </>
  );
}