import classes from "@/components/output/output.module.scss";

function ShowValues({ label, displayValue }) {
  return (
      <div className={classes.subContainer}>
        <h6>{label}</h6>
        <p>{displayValue()}</p>
      </div>
  );
}

export default ShowValues;