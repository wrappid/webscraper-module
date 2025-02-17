// components/RawView.tsx
import React from 'react';
import { 
  CoreBox, 
  CoreClasses, 
  CoreH4 
} from '@wrappid/core';
import { RawViewProps } from '../types/rawView.types';
import CodeViewer from './CodeViewer';

const RawView: React.FC<RawViewProps> = ({ rawData }) => {
  return (
    <CoreBox styleClasses={[CoreClasses.WIDTH.W_100, CoreClasses.PADDING.P2]}>
      <CoreH4>Raw View</CoreH4>
      <CodeViewer code={rawData} />
    </CoreBox>
  );
};

export default RawView;
