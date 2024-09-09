import useWindowDimensions from "@/utils/useWindowSize";
import {createContext, forwardRef} from "react";

import { FixedSizeList as List } from "react-window";
import classes from "@/components/output/output.module.scss";
import {Tile} from "@carbon/react";

function VirtualizedList({
                           IDIndex,
                           labelDataArray,
                           sortedSuggestions,
                           handleSort,
                           pickSearchedOutput,
                         }) {

  const {width, height} = useWindowDimensions();
  const virtualizedWidth = width - (0.1 * width);
  const virtualizedHeight = height - (0.2 * height);

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
                  className={classes.searchSuggestionTableRow} tabIndex="0">
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
            <th key={index} onClick={handleSort} className={classes.searchSuggestionTableHeader} tabIndex="0">
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
      <>
        <StickyList
            height={virtualizedHeight}
            innerElementType={innerElementType}
            itemCount={sortedSuggestions.length}
            itemSize={50}
            stickyIndices={[0]}
            width={virtualizedWidth}
        >
          {Row}
        </StickyList>
      </>
  );
}

export default VirtualizedList;