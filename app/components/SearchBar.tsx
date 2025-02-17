// components/SearchBar.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  CoreInput, 
  CoreBox, 
  CoreClasses, 
  CoreButton, 
  CoreGrid 
} from "@wrappid/core";
import { setUrl } from "../actions/webScrapperAction";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputUrl, setInputUrl] = useState("");

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSearch = () => {
    if (inputUrl.trim()) {
        // @ts-ignore
      dispatch(setUrl(inputUrl.trim()));
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
        styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER, CoreClasses.PADDING.P2]}
      >
        <CoreInput
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL to scrape..."
          styleClasses={[
            CoreClasses.PADDING.P1,
            CoreClasses.BORDER.BORDER,
            CoreClasses.BORDER_COLOR_GREY_300,
            CoreClasses.WIDTH.W_75
          ]}
        />
      </CoreBox>
      <CoreBox
        gridProps={{ gridSize: { md: 3 } }}
        styleClasses={[
          CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER,
          CoreClasses.PADDING.P2,
          CoreClasses.TEXT.TEXT_WHITE
        ]}
      >
        <CoreButton onClick={handleSearch}>
          Search
        </CoreButton>
      </CoreBox>
    </CoreGrid>
  );
};

export default SearchBar;