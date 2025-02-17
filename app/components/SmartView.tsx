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
  IDs: { attributeName: string; attributeValue: string; occurrenceCount: number }[];
}

const SmartView: React.FC<SmartViewProps> = ({ IDs }) => {
  // Group the items by attributeName
  const groupedByAttributeName = IDs.reduce((acc, item) => {
    if (!acc[item.attributeName]) {
      acc[item.attributeName] = [];
    }
    acc[item.attributeName].push(item);
    return acc;
  }, {} as Record<string, { attributeValue: string; occurrenceCount: number }[]>);

  return (
    <CoreBox styleClasses={[CoreClasses.WIDTH.W_100, CoreClasses.PADDING.P2]}>
      <CoreH4>Smart View</CoreH4>
      <CoreStack component={CorePaper}>
        {Object.entries(groupedByAttributeName).map(([attributeName, values], index) => (
          <CoreAccordion key={index}>
            <CoreAccordionSummary expandIcon={<CoreIcon color="action" icon="arrow" />}>
              <CoreTypographyBody1>{attributeName}</CoreTypographyBody1>
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