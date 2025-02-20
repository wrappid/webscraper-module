import React from 'react';
import {
  CoreH5,
  CoreClasses,
  CoreTypographyBody1,
  CoreTypographyCaption,
  CoreCardHeader,
  CoreCardContent,
  CoreCard,
  CoreAccordion,
  CoreAccordionSummary,
  CoreIcon,
  CoreAccordionDetail,
  CoreChip,
  CoreBox
} from '@wrappid/core';
import { ScrapedElement } from '../types/webscraper.types';

interface SmartViewProps {
  predefinedData: ScrapedElement[];
  customData: ScrapedElement[];
}

const SmartView: React.FC<SmartViewProps> = ({ predefinedData, customData }) => {
  const renderDataGroup = (data: ScrapedElement[], title: string) => {
    const groupedData = data.reduce((acc, item) => {
      const groupKey = item.alias && item.alias.trim() !== '' ? item.alias : item.attributeName;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, ScrapedElement[]>);

    return (
      <CoreCard>
        <CoreCardHeader
          styleClasses={[CoreClasses.PADDING.P1]}
          title={<CoreH5 paragraph={false} gutterBottom={false}>{title}</CoreH5>} />
        <CoreCardContent styleClasses={[CoreClasses.PADDING.P0]}>
          {Object.entries(groupedData).map(([groupName, values], index) => {
            const totalCount = values.reduce((sum, item) => sum + (item.occurrenceCount || 1), 0);
            const uniqueCount = values.length;

            return (
              <CoreAccordion key={index} disableGutters={true}>
                <CoreAccordionSummary
                  expandIcon={<CoreIcon color="action" icon="expand_more" />}
                  styleClasses={[CoreClasses.PADDING.PX1]}
                >
                  <CoreBox
                    styleClasses={[
                      CoreClasses.DISPLAY.FLEX,
                      CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER
                    ]}
                  >
                    <CoreTypographyBody1
                      gutterBottom={false}
                      paragraph={false}
                      styleClasses={[CoreClasses.MARGIN.MR2]}
                    >
                      {groupName}
                    </CoreTypographyBody1>
                    <CoreChip
                      label={`Total: ${totalCount}`}
                      size="small"
                      styleClasses={[CoreClasses.MARGIN.MR1]}
                    />
                    <CoreChip
                      label={`Unique: ${uniqueCount}`}
                      size="small"
                      variant="outlined"
                    />
                  </CoreBox>
                </CoreAccordionSummary>
                <CoreAccordionDetail styleClasses={[CoreClasses.PADDING.P0]}>
                  {values.map((item, idx) => (
                    <CoreAccordion key={idx} disableGutters={true}>
                      <CoreAccordionSummary
                        expandIcon={<CoreIcon color="action" icon="expand_more" />}
                        styleClasses={[CoreClasses.PADDING.PX1, CoreClasses.BG.BG_GREY_100]}
                      >
                        <CoreTypographyBody1 gutterBottom={false} paragraph={false}>
                          {item.attributeValue}
                          {item.occurrenceCount > 1 && (
                            <CoreChip
                              label={`${item.occurrenceCount}`}
                              size="small"
                              styleClasses={[CoreClasses.MARGIN.MR1]}
                            />
                          )}
                        </CoreTypographyBody1>
                      </CoreAccordionSummary>
                      <CoreAccordionDetail styleClasses={[CoreClasses.PADDING.P0]}>
                        <CoreTypographyBody1 gutterBottom={false} paragraph={false}>
                          Attribute Value: {item.attributeValue}
                        </CoreTypographyBody1>
                      </CoreAccordionDetail>
                    </CoreAccordion>
                  ))}
                </CoreAccordionDetail>
              </CoreAccordion>
            );
          })}
        </CoreCardContent>
      </CoreCard>
    );
  };

  return (
    <>
      {predefinedData.length > 0 && renderDataGroup(predefinedData, "Predefined Queries")}
      {customData.length > 0 && renderDataGroup(customData, "Custom Queries")}
    </>
  );
}

export default SmartView;