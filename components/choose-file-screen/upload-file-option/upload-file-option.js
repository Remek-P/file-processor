import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { Button, Tile } from "@carbon/react";
import { Upload } from "@carbon/icons-react";

function UploadFileOption({ setIsToBeUploaded }) {

  const handleClick = () => {
    setIsToBeUploaded(true);
  }

  return (
      <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>
        <div className={classes.optionContainerDescription}>
          <h6>Upload a file</h6>
          <p className={classes.optionContainerP}>to the computer or the database</p>
        </div>
        <Button size="md" onClick={handleClick}>
          <Upload />
          <span>Upload</span>
        </Button>
      </Tile>
  )
}

export default UploadFileOption;