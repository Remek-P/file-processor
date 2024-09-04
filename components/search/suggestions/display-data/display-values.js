import classes from "@/components/output/output.module.scss";

function DisplayValues({ data, index, IDIndex, pickSearchedOutput }) {
  return (
      <li key={data[IDIndex]}
          data-value={data[IDIndex]}
          onClick={pickSearchedOutput}
          className={classes.searchContainerData}
      >
        {data[index]}
      </li>
  );
}

export default DisplayValues;