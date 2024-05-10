import classes from "./output.module.scss";
import {useState} from "react";

function Output({ excelFile }) {

  const [inputValue, setInputValue] = useState("")

  const rowNames = excelFile[0]?.map((el) => <div key={el}>{el}</div>);
  const persons = excelFile.slice(1);

  const filteredPersons = persons.filter((arr) => {
    if (arr[0].includes(inputValue)) {
      return arr
    }
  } );

  const colData = filteredPersons.map(el => <div id={el[0]} key={el}>{el.map(datum => <div key={datum}>{datum}</div>)}</div>);


  console.log("Output")



  return (
      <>
        <input type="text"
               value={inputValue} onChange={(e) => setInputValue(e.target.value.toString().trim())}
               placeholder="Please type to filter"
        />
        <div className={classes.container1}>

          <div>
            {rowNames}
          </div>

          <div className={classes.container2}>
            {colData}
          </div>

        </div>
      </>

  );
}

export default Output;