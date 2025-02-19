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
    <>
      <CoreCard>
        <CoreCardHeader 
          styleClasses={[CoreClasses.PADDING.P1]}
          title={<CoreH5 paragraph={false} gutterBottom={false}>Smart View</CoreH5>}/>
        <CoreCardContent styleClasses={[CoreClasses.PADDING.P0]}>
        {Object.entries(groupedByAttributeName).map(([attributeName, values], index) => (
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