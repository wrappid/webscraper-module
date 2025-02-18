import React from "react";
import { CoreJSONEditor } from "@wrappid/core";

const SelectorJson = (props) => {
    return (
        <CoreJSONEditor
        label="Input Selectors in JSON format"
        {...props}
         />
    )
}

export default SelectorJson;
