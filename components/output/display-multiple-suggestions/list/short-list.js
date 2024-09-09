import {Tile} from "@carbon/react";
import classes from "@/components/output/output.module.scss";

function ShortList({
                     IDIndex,
                     labelDataArray,
                     sortedSuggestions,
                     handleSort,
                     pickSearchedOutput,
                   }) {

  return (
      <table>
        <thead>
        <tr>
          {labelDataArray.map((label, index) => (
              <th key={index} onClick={handleSort} data-value={label[IDIndex]} className={classes.searchSuggestionTableRow} tabIndex="0">
                <Tile>
                  {label}
                </Tile>
              </th>

          ))}
        </tr>
        </thead>
        <tbody>
        {sortedSuggestions.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                  <td data-value={row[IDIndex]} key={colIndex} onClick={pickSearchedOutput} className={classes.searchSuggestionTableHeader} tabIndex="0">
                    <Tile>
                      {value}
                    </Tile>
                  </td>
              ))}
            </tr>
        ))}
        </tbody>
      </table>
  );
}

export default ShortList;