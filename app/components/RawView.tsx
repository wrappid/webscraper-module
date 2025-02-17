// components/RawView.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { CoreBox, CoreClasses, CoreTypographyBody1, CoreH4 } from '@wrappid/core';
import CodeViewer from './CodeViewer';
interface RawViewProps {
  rawData: string;
}

const RawView: React.FC<RawViewProps> = ({ rawData }) => {
  // const searchQuery = useSelector((state: any) => state.webScrapperReducer.searchQuery);

  // const highlightSearchQuery = (text: string) => {
  //   if (!searchQuery) return text;
    
  //   const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  //   return parts.map((part, index) => 
  //     part.toLowerCase() === searchQuery.toLowerCase() 
  //       ? `<mark>${part}</mark>`
  //       : part
  //   ).join('');
  // };

  return (
    <CoreBox styleClasses={[CoreClasses.WIDTH.W_100, CoreClasses.PADDING.P2]}>
      <CoreH4>Raw View</CoreH4>
        {/* <pre 
          dangerouslySetInnerHTML={{ 
            __html: highlightSearchQuery(rawData) 
          }} 
        /> */}
        <CodeViewer code={rawData} />

    </CoreBox>
  );
  //?.replace(/^"|"$|\\"/g, '')
};

export default RawView;