import classes from "./output.module.scss";
import {useState} from "react";
import Search from "@/components/search/search";

function Output({ excelFile }) {

  const [inputValue, setInputValue] = useState("");

  const rowNames = excelFile[0]?.map((el) => <div key={el}>{el}</div>);
  const persons = excelFile.slice(1);

  const filteredPersons = persons.filter((arr) => {
    if (arr[0].toString().toLowerCase().includes(inputValue)) {
      return arr
    }
  } );

  const colData = filteredPersons.map(el => <div id={el[0]} key={el}>{el.map(datum => <div key={datum}>{datum}</div>)}</div>);

  const noData = <div>No such data available</div>

  return (
      <>
        <Search setInputValue={setInputValue}
                inputValue={inputValue} />

        <div className={classes.container1}>

          <div>
            {rowNames}
          </div>

          <div className={classes.container2}>
            {colData.length !== 0 ? colData : noData}
          </div>

        </div>
      </>

  );
}

export default Output;