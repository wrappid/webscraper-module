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
  CoreButton,
  CoreIconButton,
  CoreIcon,
  CoreTooltip,
  CoreAlert,
  CoreTypographyBody1
} from "@wrappid/core";
import SearchBar from "./SearchBar";
import SmartView from "./SmartView";
import RawView from "./RawView";
import { fetchScraperData, processData, resetScraper } from "../actions/webScrapperAction";
import { predefinedQueries } from '../types/queries';

const defaultCustomQuery = [
  {
    select: ['*', 'textContent'],
    from: '*',
    where: {},
    alias: ''
  }
];

const WebScraper = () => {
  const dispatch = useDispatch();
  const [customQuery, setCustomQuery] = useState(defaultCustomQuery);
  const [emptyJson, setJsonBlank] = useState<string>("");

  const { url, data: webScrapperData } = useSelector(
    (state: any) => state.webScrapperReducer || {}
  );

  const resetWebScraper = () => {
    dispatch(resetScraper());
    setCustomQuery(defaultCustomQuery);
    setJsonBlank("");
  };

  // to reset on refresh or page load
  useEffect(() => {
    resetWebScraper();
  }, []);

  useEffect(() => {
    if (url) {
      dispatch(fetchScraperData(url) as any);
    }
  }, [url]);

  useEffect(() => {
    if (webScrapperData?.rawData) {
      // Process predefined queries automatically
      predefinedQueries.forEach(query => {
        const attr = query.select.map(attr => ({ name: attr }));
        const scraperConfig = {
          attributes: attr,
          whereConditions: query?.where,
          from: query?.from,
          alias: query?.alias
        };
        dispatch(processData(webScrapperData.rawData, scraperConfig, true) as any);
      });
    }
  }, [webScrapperData?.rawData]);

  const handleCustomQueryChange = (newValue: any) => {
    try {
      // Validate if newValue is a proper array of query objects
      if (!Array.isArray(newValue)) {
        throw new Error("Query must be an array of objects");
      }

      // Validate each query object
      // newValue.forEach((query, index) => {
      //   if (!query.select || !Array.isArray(query.select)) {
      //     throw new Error(`Query ${index + 1}: 'select' must be an array`);
      //   }
      //   if (!query.from || typeof query.from !== 'string') {
      //     throw new Error(`Query ${index + 1}: 'from' must be a string`);
      //   }
      //   if (query.where && typeof query.where !== 'object') {
      //     throw new Error(`Query ${index + 1}: 'where' must be an object`);
      //   }
      //   if (query.alias && typeof query.alias !== 'string') {
      //     throw new Error(`Query ${index + 1}: 'alias' must be a string`);
      //   }
      // });

      setCustomQuery(newValue);
      setJsonBlank("");
    } catch (error) {
      setJsonBlank(error instanceof Error ? error.message : "Invalid query format");
    }
  };

  const handleProcessCustomData = () => {
    if (webScrapperData?.rawData && customQuery) {
      if (emptyJson) {
        return; // Don't process if there are validation errors
      }

      // Process custom queries
      customQuery.forEach(query => {
        const attr = query.select.map(attr => ({ name: attr }));
        const scraperConfig = {
          attributes: attr,
          whereConditions: query?.where,
          from: query?.from,
          alias: query?.alias
        };
        dispatch(processData(webScrapperData.rawData, scraperConfig, false) as any);
      });
    }
  };

  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_FLEX_END]}>
          <CoreTooltip
            title="Reset Scraper"
            arrow
            placement="bottom"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: { offset: [0, -8] }
                },
              ],
            }}
            styleClasses={[CoreClasses.TEXT.LINEHEIGHT_INITIAL]}
          >
            <CoreIconButton onClick={resetWebScraper}>
              <CoreIcon icon="restart_alt" />
            </CoreIconButton>
          </CoreTooltip>
        </CoreBox>

        <SearchBar />

        {webScrapperData && (
          <>
            <CoreBox>
              <CoreJSONEditor
                value={customQuery}
                label="Custom Query (JSON format)"
                onChange={handleCustomQueryChange}
              />
              {emptyJson && (
                <CoreBox styleClasses={[CoreClasses.MARGIN.MY2]}>
                  <CoreAlert severity="error">
                    <CoreTypographyBody1>{emptyJson}</CoreTypographyBody1>
                  </CoreAlert>
                </CoreBox>
              )}
              <CoreButton
                onClick={handleProcessCustomData}
                styleClasses={[CoreClasses.MARGIN.MT2]}
                disabled={!!emptyJson}
              >
                Process Custom Query
              </CoreButton>
            </CoreBox>

            <CoreGrid>
              <CoreBox gridProps={{ gridSize: { md: 6 } }}>
                <RawView rawData={JSON.stringify(webScrapperData.rawData, null, 2)} />
              </CoreBox>
              {webScrapperData?.processedData && (
                <CoreBox gridProps={{ gridSize: { md: 6 } }}>
                  <SmartView
                    predefinedData={webScrapperData.processedData.predefined || []}
                    customData={webScrapperData.processedData.custom || []}
                  />
                </CoreBox>
              )}
            </CoreGrid>
          </>
        )}
      </CoreLayoutItem>
    </>
  );
};

export default WebScraper;