import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { Tile } from "@carbon/react";
import useWindowDimensions from "@/hooks/useWindowSize";
import { IsLoadingContext } from "@/context/global-context";
import { compareValues } from "@/utils/sortUtils";
import classes from "@/components/output/output.module.scss";

function VirtualizedGridWithStickyHeader({
                                           IDIndex,
                                           indexToSort,
                                           labelDataArray,
                                           pickSearchedOutput,
                                           searchRecords,
                                           searchSuggestionsOrder,
                                           handleSort,
                                         }) {
  const suggestions = useMemo(() => [ labelDataArray, ...searchRecords ],
      [ labelDataArray, searchRecords ]
  );

  const [ sortedSuggestions, setSortedSuggestions ] = useState(suggestions);
  const [ , setIsLoading ] = useContext(IsLoadingContext);

  // Window measurements
  const { width, height } = useWindowDimensions();
  const availableHeight = height * 0.83;
  // const availableHeight = height * 0.83;

  // Row heights
  const HEADER_HEIGHT = 64;
  const ROW_HEIGHT = 64;

  // Refs
  const gridRef = useRef(null);
  const headerContainerRef = useRef(null);
  const headerRowRef = useRef(null);
  const workerRef = useRef(null);

  // Column width calculation - only run when data structure changes
  const columnWidths = useMemo(() => {
    // Base column widths on first row data
    const headerRow = sortedSuggestions[0] || [];
    return headerRow.map(content => {
      // Simple heuristic for column width based on content length
      const contentLength = String(content || '').length;
      return Math.max(120, Math.min(300, contentLength * 10));
    });
  }, [ sortedSuggestions[0] ]);

  // Initialize worker once
  useEffect(() => {
    if (typeof Worker !== "undefined") {
      workerRef.current = new Worker(new URL("@/public/sortWorker", import.meta.url));

      workerRef.current.onmessage = function (event) {
        setSortedSuggestions([ labelDataArray, ...event.data ]);
        setIsLoading(false);
      };

      workerRef.current.onerror = function (error) {
        console.error('Sorting worker error:', error);
        setIsLoading(false);
      };

      return () => {
        if (workerRef.current) {
          workerRef.current.terminate();
        }
      };
    }
  }, []);

  // Handle sorting
  useEffect(() => {
    if (searchSuggestionsOrder !== undefined) {
      setIsLoading(true);

      if (workerRef.current) {
        workerRef.current.postMessage({
          searchSuggestionsOrder,
          searchRecords,
          indexToSort,
        });
      } else {
        // Fallback for environments without Web Worker support
        requestAnimationFrame(() => {
          const sorted = [ ...searchRecords ].sort((a, b) =>
              compareValues(a[indexToSort.current], b[indexToSort.current], searchSuggestionsOrder)
          );
          setSortedSuggestions([ labelDataArray, ...sorted ]);
          setIsLoading(false);
        });
      }
    } else {
      setSortedSuggestions(suggestions);
    }
  }, [ searchSuggestionsOrder, searchRecords, indexToSort, suggestions ]);

  // Column width getter for Grid
  const getColumnWidth = useCallback(
      (index) => columnWidths[index] || 150,
      [ columnWidths ]
  );

  // Row height getter
  const getRowHeight = useCallback(() => ROW_HEIGHT, []);

  // Handle sort click
  const handleSortClick = useCallback((columnIndex) => () => {
    setIsLoading(true);

    const syntheticEvent = {
      currentTarget: {
        cellIndex: columnIndex
      }
    };

    requestAnimationFrame(() => {
      handleSort(syntheticEvent);
    });
  }, [ handleSort ]);

  // Output selection handler
  const handleCellClick = useCallback(rowIndex => {
    if (rowIndex === 0) return; // Ignore header row clicks (except for sorting)

    const selectedId = sortedSuggestions[rowIndex][IDIndex];
    pickSearchedOutput({ currentTarget: { dataset: { value: selectedId } } });
  }, [ sortedSuggestions, IDIndex, pickSearchedOutput ]);

  // Cell renderer - only for the grid body (not the header)
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    // Skip the header row since we're rendering it separately
    const actualRowIndex = rowIndex + 1;
    const value = sortedSuggestions[actualRowIndex]?.[columnIndex];

    return (
        <div
            style={ {
              ...style,
              backgroundColor: actualRowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
            } }
            onClick={ () => handleCellClick(actualRowIndex, columnIndex) }
            tabIndex="0"
            data-cell={ `${ actualRowIndex }-${ columnIndex }` }
            className={ classes.gridCell }
        >
          <Tile className="shadow">
            { value }
          </Tile>
        </div>
    );
  }, [ sortedSuggestions, handleCellClick ]);

  // Direct DOM manipulation for lag-free scroll synchronization
  const handleGridScroll = useCallback(({ scrollLeft }) => {
    if (headerRowRef.current) {
      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        headerRowRef.current.style.transform = `translateX(-${ scrollLeft }px)`;
      });
    }
  }, []);

  // Render header row separately from the grid
  const renderHeader = useCallback(() => {
    const headerData = sortedSuggestions[0] || [];

    return (
        <div
            ref={ headerRowRef }
            style={{ height: HEADER_HEIGHT }}
            className={ classes.gridHeader }
        >
          { headerData.map((value, columnIndex) => (
              <div
                  key={ columnIndex }
                  style={ {
                    width: getColumnWidth(columnIndex),
                    minWidth: getColumnWidth(columnIndex),
                    height: HEADER_HEIGHT,
                  } }
                  onClick={ handleSortClick(columnIndex) }
                  tabIndex="0"
                  data-header-cell={ columnIndex }
              >
                <Tile style={ { fontWeight: 'bold' } }>
                  { value }
                </Tile>
              </div>
          )) }
        </div>
    );
  }, [ sortedSuggestions, getColumnWidth, handleSortClick ]);

  // Set up the header tracking
  useEffect(() => {
    // Reset scroll position when data changes
    if (gridRef.current) {
      gridRef.current.scrollTo({ scrollTop: 0, scrollLeft: 0 });

      if (headerRowRef.current) {
        headerRowRef.current.style.transform = 'translateX(0px)';
      }
    }
  }, [ sortedSuggestions ]);

  return (
      <div className={ classes.gridContainer }
           style={ {
             height: availableHeight,
             width: width,
           } }>

        {/* Fixed header container */ }
        <div
            ref={ headerContainerRef }
            style={{
              width: width,
              height: HEADER_HEIGHT,
            }}
            className={ classes.gridHeaderContainer }
        >
          { renderHeader() }
        </div>

        {/* Grid body */ }
        <div style={ { height: availableHeight - HEADER_HEIGHT } }>
          <Grid
              ref={ gridRef }
              columnCount={ columnWidths.length }
              columnWidth={ getColumnWidth }
              height={ availableHeight - HEADER_HEIGHT }
              rowCount={ sortedSuggestions.length - 1 } // Subtract 1 for header
              rowHeight={ getRowHeight }
              width={ width }
              overscanRowCount={ 5 }
              overscanColumnCount={ 2 }
              onScroll={ handleGridScroll }
              style={ { outline: 'none' } } // Remove focus outline
          >
            { Cell }
          </Grid>
        </div>
      </div>
  );
}

export default React.memo(VirtualizedGridWithStickyHeader);