import {createContext, forwardRef, useEffect, useMemo, useRef, useState} from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { FixedSizeList as List } from "react-window";

import { compareValues } from "@/utils/sortUtils";

import { Tile } from "@carbon/react";

import classes from "@/components/output/output.module.scss";
import useWindowDimensions from "@/utils/useWindowSize";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchUsers,
                                      inputValue,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  // const [active, setActive] = useState(IDIndex);

  const {width, height} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false)

  const reducePerformanceStrain = inputValue.length < 2;

  // TODO: if e.currentTarget.dataset.index === undefined No such user exists message
  const pickSearchedOutput = (e) => {
    setInputValue(e.currentTarget.dataset.value);
  }

  const indexToSort = useRef(IDIndex);

  const sortedSuggestions = useMemo(() => {
    if (searchSuggestionsOrder === undefined) {
      return searchUsers;
    }

    // Sort the indexed data based on the value and sort direction (sortedUtils)
    if (searchSuggestionsOrder || searchSuggestionsOrder === false)
      return [...searchUsers].sort((a, b) => compareValues(
          a[indexToSort.current],
          b[indexToSort.current],
          searchSuggestionsOrder
          )
      );

  }, [searchSuggestionsOrder, searchUsers, IDIndex]);

  // TODO: Loader indicating change od suggestion order is in progress
  // TODO: Is reducePerformanceStrain needed?

  const handleSort = (event) => {
    //TODO: each time the icon is pressed, the sorting should start from ascending and not oscillating
    setIsLoading(true);
    indexToSort.current = event.currentTarget.cellIndex;
    setSearchSuggestionsOrder(prevState => !prevState);

    // if (+event.currentTarget.dataset.index === index) {
    //   setShowIcon(index);
    //   setActive(index);
    // }
  }

  useEffect(() => {
    setIsLoading(false);
  }, [sortedSuggestions]);

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  const ItemWrapper = ({ data, index, style }) => {
    const { ItemRenderer, stickyIndices } = data;
    if (stickyIndices && stickyIndices.includes(index)) {
      return null;
    }
    return <ItemRenderer index={index} style={style} />;
  };

  const Row = ({index, style}) => {
    const row = sortedSuggestions[index];
    return (
        <tr className="row" style={style}>
          {row.map((value, colIndex) => (
              <td key={colIndex} data-value={row[IDIndex]} onClick={pickSearchedOutput}
                  className={classes.searchSuggestionTableRow}>
                <Tile>
                  {value}
                </Tile>
              </td>
          ))}
        </tr>
    )
  };

  const StickyRow = ({ index, style }) => (
      <tr className="sticky" style={style}>
        {labelDataArray.map((label, index) => (
            <th key={index} onClick={handleSort} className={classes.searchSuggestionTableHeader}>
              <Tile>
                {label}
              </Tile>
            </th>
        ))}
      </tr>
  );

  const innerElementType = forwardRef(({ children, ...rest }, ref) => (
      <StickyListContext.Consumer>
        {({ stickyIndices }) => (
            <table ref={ref} {...rest}>
              {stickyIndices.map((index) => (
                  <StickyRow
                      index={index}
                      key={index}
                      style={{ top: index * 35, left: 0, width: "100%", height: 10 }}
                  />
              ))}

              <tbody>{children}</tbody>
            </table>
        )}
      </StickyListContext.Consumer>
  ));

  const StickyList = ({ children, stickyIndices, ...rest }) => (
      <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
        <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
          {ItemWrapper}
        </List>
      </StickyListContext.Provider>
  );

  return (
      <section>
        {
            reducePerformanceStrain
            && <TexTile text={"Please type at least 2 characters to display search results"}/>
        }

        <StickyList
            height={height}
            innerElementType={innerElementType}
            itemCount={sortedSuggestions.length}
            itemSize={50}
            stickyIndices={[0]}
            width={width}
        >
          {Row}
        </StickyList>

      </section>
  );
}

export default DisplayMultipleSuggestions;