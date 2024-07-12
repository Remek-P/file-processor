import classes from "@/components/file-chosen/file-chosen.module.scss";
import Output from "@/components/output/output";

function DisplayOutput({ numberOfOutputs, setNumberOfOutputs, excelFile }) {

  const handleDeleteChecked = (e) => {
    if (e.target.checked) {
      setNumberOfOutputs(prevState => prevState.map((output, index) => {
        if (index === +e.target.value) {
          return {delete: true};
        }
        return output;
      }))
    }
  }

  return (
      <>
        {
          numberOfOutputs.map((output, index) => {
            if (!output.delete) {
              return (
                  <div key={index} className={classes.outputContainer}>
                    <input type="checkbox"
                           name="output"
                           id={`output${index}`}
                           value={index}
                           onChange={handleDeleteChecked}
                    />
                    <Output key={index} excelFile={excelFile}/>
                  </div>
              )
            }
          })
        }
      </>
  );
}

export default DisplayOutput;