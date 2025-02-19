// components/SearchBar.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  CoreInput, 
  CoreBox, 
  CoreClasses, 
  CoreButton, 
  CoreGrid 
} from "@wrappid/core";
import { resetScraper, setUrl } from "../actions/webScrapperAction";

// will move to CoreForm?
const SearchBar = () => {
  const {url} = useSelector((state: any) => state.webScrapperReducer);
  const dispatch = useDispatch();
  const [inputUrl, setInputUrl] = useState("");

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSearch = () => {
    if (inputUrl.trim()) {
      const cleanedInputUrl = inputUrl.trim();
      if(url !== cleanedInputUrl) {
      dispatch(resetScraper());
      dispatch(setUrl(cleanedInputUrl));
      }else{
        // remove and show message via CoreDialog or CoreAlert, or maybe at helper area
        alert("URL already set");
      }
    }else {
      // same as above
      alert("Please enter a URL to scrape");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <CoreGrid>
      <CoreBox 
        gridProps={{ gridSize: { md: 9 } }}
      >
        <CoreInput
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL to scrape..."
          styleClasses={[CoreClasses.BORDER.BORDER, CoreClasses.BORDER.BORDER_COLOR_GREY_300, CoreClasses.MARGIN.MT0, CoreClasses.PADDING.P0_5]}
        />
      </CoreBox>
      <CoreBox
        gridProps={{ gridSize: { md: 3 } }}
        styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER, CoreClasses.PADDING.P0_5]}
      >
        <CoreButton onClick={handleSearch}>
          Search
        </CoreButton>
      </CoreBox>
    </CoreGrid>
  );
};

export default SearchBar;