import React from 'react';
import {
  CoreBox,
  CoreClasses,
  CoreTypographyBody1,
  CoreH4,
  CoreStack,
  CorePaper,
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
    <CoreBox styleClasses={[CoreClasses.WIDTH.W_100, CoreClasses.PADDING.P2]}>
      <CoreH4>Smart View</CoreH4>
      <CoreStack component={CorePaper}>
        {Object.entries(groupedByAliasOrAttributeName).map(([groupKey, values], index) => (
          <CoreAccordion key={index}>
            <CoreAccordionSummary expandIcon={<CoreIcon color="action" icon="arrow" />}>
              <CoreTypographyBody1>{groupKey}</CoreTypographyBody1>
            </CoreAccordionSummary>
            <CoreAccordionDetail>
              {values.map((item, idx) => (
                <CoreAccordion key={idx}>
                  <CoreAccordionSummary expandIcon={<CoreIcon color="action" icon="arrow" />}>
                    <CoreTypographyBody1>{item.attributeValue} {item.occurrenceCount > 0 && (
                      <CoreChip label={`${item.occurrenceCount}`} />
                    )}</CoreTypographyBody1>
                  </CoreAccordionSummary>
                  <CoreAccordionDetail>
                    <CoreTypographyBody1>
                      Attribute Value: {item.attributeValue}
                    </CoreTypographyBody1>
                  </CoreAccordionDetail>
                </CoreAccordion>
              ))}
            </CoreAccordionDetail>
          </CoreAccordion>
        ))}
      </CoreStack>
    </CoreBox>
  );
};

export default SmartView;