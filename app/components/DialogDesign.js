import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import {
  CoreBox, 
  CoreClasses, 
  CoreIcon, 
  CoreIconButton, 
  CoreStack, 
  CoreTooltip, 
  CoreTypographyBody2,
  CoreTypographyOverline,
  CoreBadge
} from "@wrappid/core";

const ListAction = {
  ADD   : "adding",
  REMOVE: "removing",
};

import { htmlTags } from "../types/queries";

export default function DialogDesign({ initialItems = [], onTransferDone }) {
  // State management
  const [selectedItemsAdding, setSelectedItemsAdding] = useState([]);
  const [selectedItemsRemoving, setSelectedItemsRemoving] = useState([]);
  const [transferredItems, setTransferredItems] = useState(Array.isArray(initialItems) ? initialItems : []);
  const [activeList, setActiveList] = useState(null);
  const lastClickRef = useRef({ action: null, item: null, time: 0 });
  const DOUBLE_CLICK_THRESHOLD = 1000; // 1000 milliseconds threshold for consecutive clicks

  // Get header classes based on depth
  const getHeaderClasses = useCallback((depth) => {
    const baseClasses = [CoreClasses.POSITION.POSITION_STICKY, CoreClasses.PADDING.P1, CoreClasses.BG.BG_GREY_300, CoreClasses.COLOR.TEXT_BLACK_50];

    // Use ternary operators to determine additional classes based on depth

    return [...baseClasses, depth === 0 ? CoreClasses.POSITION.TOP_0 : CoreClasses.POSITION.TOP_2R, depth === 0 ? CoreClasses.Z_INDEX.Z_3 : (depth === 1 ? CoreClasses.Z_INDEX.Z_2 : CoreClasses.Z_INDEX.Z_1)];
  }, []);

  // Handle item click (selection or transfer)
  const handleItemClick = useCallback((item, action) => {
    const now = Date.now();
    const { item: lastItem, time: lastTime, action: lastAction } = lastClickRef.current;
  
    // Switch active list if a different action is selected
    if (action !== activeList) {
      action === ListAction.ADD
        ? setSelectedItemsRemoving([]) // Clear the "removing" list when switching to adding
        : setSelectedItemsAdding([]); // Clear the "adding" list when switching to removing
      setActiveList(action); // Set the active action (adding/removing)
    }
  
    // Determine if this is a double-click (if within the threshold)
    const isDoubleClick = item === lastItem && action === lastAction && (now - lastTime < DOUBLE_CLICK_THRESHOLD);
  
    if (isDoubleClick) {
      // Handle double-click actions: transfer item between lists
      if (action === ListAction.ADD) {
        // If it's being added to the list, transfer the item and remove it from the "adding" list
        if (!transferredItems.includes(item)) {
          setTransferredItems(prev => [...prev, item]);
        }
        setSelectedItemsAdding(prev => prev.filter(i => i !== item));
      } else if (action === ListAction.REMOVE) {
        // If it's being removed from the list, transfer the item back and remove from the "removing" list
        setTransferredItems(prev => prev.filter(i => i !== item));
        setSelectedItemsRemoving(prev => prev.filter(i => i !== item));
      }
    } else {
      // Otherwise, just toggle the item selection (add or remove from the respective list)
      const setSelectedItems = action === ListAction.ADD ? setSelectedItemsAdding : setSelectedItemsRemoving;
  
      setSelectedItems(prev =>
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    }
  
    // Update the last click reference to track the current click time and item
    lastClickRef.current = { action, item, time: now };
  }, [activeList, transferredItems]);
  
  // Handle transfer of selected items
  const handleTransfer = useCallback(() => {
    setTransferredItems(prev => [...prev, ...selectedItemsAdding]);
    setSelectedItemsAdding([]);
    setActiveList(null);
  }, [selectedItemsAdding]);

  // Handle removal of selected items
  const handleRemoveTransfer = useCallback(() => {
    setTransferredItems(prev => prev.filter(item => !selectedItemsRemoving.includes(item)));
    setSelectedItemsRemoving([]);
    setActiveList(null);
  }, [selectedItemsRemoving]);

  // Notify parent component of transferred items
  useEffect(() => {
    onTransferDone(transferredItems);
  }, [transferredItems, onTransferDone]);

  // Render core keys recursively
  // Render core keys recursively
  const renderElement = useCallback(
    (obj, parentKey = "", depth = 0) => {
      const transferred = Array.isArray(transferredItems) ? transferredItems : [];
  
      // If it's an array, render each item directly.
      if (Array.isArray(obj)) {
        return obj.map((item, index) => (
          <CoreBox key={`${parentKey}-${index}`} styleClasses={[CoreClasses.PADDING.P1]}>
            <CoreTypographyOverline>{item}</CoreTypographyOverline>
          </CoreBox>
        ));
      }
  
      // If it's a string, just render it as is.
      if (typeof obj === "string") {
        return (
          <CoreBox key={parentKey} styleClasses={[CoreClasses.PADDING.P1]}>
            <CoreTypographyOverline>{obj}</CoreTypographyOverline>
          </CoreBox>
        );
      }
  
      // If it's an object, proceed with the existing recursive rendering logic
      return Object.keys(obj).map((key) => {
        const value = obj[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
  
        // If the current key is in transferredItems, skip rendering it unless it's an HTML tag
        if (transferred.includes(fullKey) && !htmlTags.includes(key)) {
          return null;
        }
  
        // If it's an HTML tag (found in htmlTags), render it regardless of transferredItems
        if (htmlTags.includes(key)) {
          return (
            <CoreBox key={fullKey}>
              <CoreTypographyBody2 styleClasses={getHeaderClasses(depth)}>
                {key}
              </CoreTypographyBody2>
  
              <CoreBox styleClasses={[CoreClasses.PADDING.PL3]}>
                {renderElement(value, fullKey, depth + 1)}
              </CoreBox>
            </CoreBox>
          );
        }
  
        // If it's an object, recursively render its children
        if (typeof value === "object" && !Array.isArray(value)) {
          return (
            <CoreBox key={fullKey}>
              <CoreTypographyBody2 styleClasses={getHeaderClasses(depth)}>
                {key}
              </CoreTypographyBody2>
  
              <CoreBox styleClasses={[CoreClasses.PADDING.PL3]}>
                {renderElement(value, fullKey, depth + 1)}
              </CoreBox>
            </CoreBox>
          );
        }
  
        // Otherwise, render the leaf node (selectable item)
        return (
          <CoreBox
            key={fullKey}
            onClick={() => handleItemClick(fullKey, ListAction.ADD)}
            styleClasses={[CoreClasses.CURSOR.CURSOR_POINTER, activeList === ListAction.REMOVE ? CoreClasses.OPACITY._50 : null]}
          >
            <CoreTypographyOverline
              styleClasses={[
                selectedItemsAdding.includes(fullKey)
                  ? CoreClasses.COLOR.TEXT_PRIMARY
                  : CoreClasses.COLOR.TEXT_BLACK,
              ]}
            >
              {key}
            </CoreTypographyOverline>
          </CoreBox>
        );
      });
    },
    [
      transferredItems,
      selectedItemsAdding,
      activeList,
      handleItemClick,
      getHeaderClasses,
    ]
  );  

  // Memoize rendered core keys
  const memoizedCoreKeys = useMemo(() => renderElement(htmlTags), [renderElement]);

  return (
    <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX]}>
      {/* Left panel: Available style classes */}
      <CoreBox styleClasses={[
        CoreClasses.BG.BG_GREY_50,
        CoreClasses.BORDER.BORDER,
        CoreClasses.BORDER.BORDER_COLOR_GREY_300,
        CoreClasses.PADDING.PX1,
        CoreClasses.WIDTH.VW_25
      ]}>
        <CoreBox styleClasses={[
          CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER,
          CoreClasses.BORDER.BORDER_BOTTOM,
          CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER,
          CoreClasses.DISPLAY.FLEX,
          CoreClasses.MARGIN.MB1, 
          CoreClasses.PADDING.P1
        ]}>
          <CoreTypographyBody2 styleClasses={[CoreClasses.MARGIN.M0]}>
          All the HTML tags
          </CoreTypographyBody2>
        </CoreBox>

        <CoreBox styleClasses={[CoreClasses.OVERFLOW.OVERFLOW_Y_AUTO, CoreClasses.HEIGHT.VH_50]}>
          {memoizedCoreKeys}
        </CoreBox>  
      </CoreBox>
      
      {/* Middle panel: Action buttons */}
      <CoreStack spacing={4} styleClasses={[
        CoreClasses.HEIGHT.VH_50,
        CoreClasses.DISPLAY.FLEX,
        CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER,
        CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER,
        CoreClasses.PADDING.PX1
      ]}>
        <CoreTooltip title={transferredItems.length === 0 ? "" : "Reset"} arrow>
          <CoreIconButton
            onClick={() => { setTransferredItems([]); setActiveList(null); }}
            styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.ALIGNMENT.ALIGN_CONTENT_END]}
            disabled={transferredItems.length === 0}
            color="primary">
            <CoreIcon icon="restart_alt"/>
          </CoreIconButton>
        </CoreTooltip>

        <CoreTooltip title={selectedItemsAdding.length === 0 ? "Select styleClass to Add" : ListAction.ADD} arrow>
          <CoreBadge badgeContent={selectedItemsAdding.length} color="primary">
            <CoreIconButton
              onClick={handleTransfer}
              disabled={selectedItemsAdding.length === 0}
            >
              <CoreIcon icon="keyboard_double_arrow_right" />
            </CoreIconButton>
          </CoreBadge>
        </CoreTooltip>

        <CoreTooltip
          title={selectedItemsRemoving.length === 0 
            ? (transferredItems.length === 0 ? "" : "Select styleClass to Remove") 
            : ListAction.REMOVE
          }
          arrow>
          <CoreBadge badgeContent={selectedItemsRemoving.length} color="primary">
            <CoreIconButton onClick={handleRemoveTransfer} disabled={selectedItemsRemoving.length === 0} color="primary">
              <CoreIcon icon="keyboard_double_arrow_left"/>
            </CoreIconButton>
          </CoreBadge>
        </CoreTooltip>
      </CoreStack>

      {/* Right panel: Added style classes */}
      <CoreBox styleClasses={[
        CoreClasses.PADDING.P1,
        CoreClasses.BG.BG_GREY_50,
        CoreClasses.BORDER.BORDER,
        CoreClasses.BORDER.BORDER_COLOR_GREY_300,
        CoreClasses.WIDTH.VW_25
      ]}>
        <CoreBox styleClasses={[
          CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER,
          CoreClasses.BORDER.BORDER_BOTTOM,
          CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER,
          CoreClasses.DISPLAY.FLEX,
          CoreClasses.PADDING.PB1
        ]}>
          <CoreTypographyBody2 styleClasses={[CoreClasses.MARGIN.M0]}>
            Tags to be removed
          </CoreTypographyBody2>
        </CoreBox>

        <CoreBox styleClasses={[CoreClasses.HEIGHT.VH_50, CoreClasses.OVERFLOW.OVERFLOW_Y_AUTO, CoreClasses.PADDING.PT1]}>
          {transferredItems.map((item) => (
            <CoreBox
              key={item}
              onClick={() => handleItemClick(item, ListAction.REMOVE)}
              styleClasses={[CoreClasses.CURSOR.CURSOR_POINTER, activeList === ListAction.ADD ? CoreClasses.OPACITY._50 : null]}
            >
              <CoreTypographyOverline 
                styleClasses={[selectedItemsRemoving.includes(item) ? CoreClasses.COLOR.TEXT_PRIMARY : CoreClasses.COLOR.TEXT_BLACK]}
              >
                {item}
              </CoreTypographyOverline>
            </CoreBox>
          ))}
        </CoreBox>
      </CoreBox>
    </CoreBox>
  );
}