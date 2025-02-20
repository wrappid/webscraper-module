// components/RawView.tsx
import React from 'react';
import { 
  CoreCard,
  CoreCardHeader,
  CoreCardContent,
  CoreH5,
  CoreClasses
} from '@wrappid/core';
import { RawViewProps } from '../types/rawView.types';
import CodeViewer from './CodeViewer';

const RawView: React.FC<RawViewProps> = ({ rawData }) => {
  return (
    <CoreCard>
      <CoreCardHeader 
        styleClasses={[CoreClasses.PADDING.P1]}
        title={<CoreH5 paragraph={false} gutterBottom={false}>Raw View</CoreH5>}/>
      <CoreCardContent styleClasses={[CoreClasses.PADDING.P0]}>
        <CodeViewer code={rawData} />
      </CoreCardContent>
    </CoreCard>
  );
};

export default RawView;
