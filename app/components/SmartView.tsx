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
  CoreChip
} from '@wrappid/core';

interface SmartViewProps {
  extractedData: { attributeName: string; attributeValue: string; occurrenceCount: number, alias: string }[];
}

const SmartView: React.FC<SmartViewProps> = ({ extractedData }) => {
  // Group the items by alias if available, otherwise by attributeName
  const groupedByAliasOrAttributeName = extractedData.reduce((acc, item) => {
    const groupKey = item.alias && item.alias.trim() !== '' ? item.alias : item.attributeName;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, { attributeValue: string; occurrenceCount: number; alias: string }[]>);

  return (
    <>
      <CoreCard>
        <CoreCardHeader
          styleClasses={[CoreClasses.PADDING.P1]}
          title={<CoreH5 paragraph={false} gutterBottom={false}>Smart View</CoreH5>} />
        <CoreCardContent styleClasses={[CoreClasses.PADDING.P0]}>
          {Object.entries(groupedByAliasOrAttributeName).map(([attributeName, values], index) => (
            <CoreAccordion key={index} disableGutters={true}>
              <CoreAccordionSummary expandIcon={<CoreIcon color="action" icon="expand_more" />} styleClasses={[CoreClasses.PADDING.PX1]}>
                <CoreTypographyBody1 gutterBottom={false} paragraph={false}>{attributeName}</CoreTypographyBody1>
              </CoreAccordionSummary>
              <CoreAccordionDetail styleClasses={[CoreClasses.PADDING.P0]}>
                {values.map((item, idx) => (
                  <CoreAccordion key={idx} disableGutters={true}>
                    <CoreAccordionSummary expandIcon={<CoreIcon color="action" icon="expand_more" />} styleClasses={[CoreClasses.PADDING.PX1, CoreClasses.BG.BG_GREY_100]}>
                      <CoreTypographyBody1 gutterBottom={false} paragraph={false}>{item.attributeValue} {item.occurrenceCount > 0 && (
                        <CoreTypographyCaption gutterBottom={false} paragraph={false} styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_MEDIUM]}>{item.occurrenceCount}</CoreTypographyCaption>
                      )}</CoreTypographyBody1>
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
          ))}
        </CoreCardContent>
      </CoreCard>
    </>
  );
};

export default SmartView;