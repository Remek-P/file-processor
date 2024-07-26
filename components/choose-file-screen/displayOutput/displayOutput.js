import classes from "@/components/file-chosen/file-chosen.module.scss";
import Output from "@/components/output/output";

function DisplayOutput({ numberOfOutputs, setNumberOfOutputs, excelFile, decimal }) {

  const handleDeleteChecked = (e) => {
    if (e.target.checked) {
      setNumberOfOutputs(numberOfOutputs.map((output, index) => {
            if (index === +e.target.value) {
              return {delete: true};
            } else {
              return output;
            }
          })
      )
    }
  }


  return (
      <>
        {
          numberOfOutputs.map((output, index) => {
            if (!output.delete) {
              return (
                  <div key={index} className={classes.outputContainer}>
                    <Output key={index}
                            excelFile={excelFile}
                            index={index}
                            handleDeleteChecked={handleDeleteChecked}
                            decimal={decimal} />
                  </div>
              )
            }
          })
        }
      </>
  );
}

export default DisplayOutput;