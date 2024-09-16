import { useContext, useEffect, useState } from "react";

import NoFiles from "@/components/delete-file-page/no-files/no-files";

import { FileDataGlobalContext } from "@/context/global-context";

import { deleteData, getFileNames} from "@/utils/create-indexedDB";

import { IconButton, Tile } from "@carbon/react";
import { TrashCan, Undo } from "@carbon/icons-react";

import classes from "./delete-file.module.scss";


function DeleteFilePage() {

  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(null);

  const size = "md"

  const { addWarnings } = useContext(FileDataGlobalContext)

  useEffect(() => {
    const getIndexedDB_Data = async () => {
      try {
        const data = await getFileNames(); // Assuming this returns a promise
        setFileList(data);
      } catch (err) {
        addWarnings("Error fetching saved file names");
      }
    };

    getIndexedDB_Data();
  }, [fileName]);

  const handleDelete = async () => {
    await deleteData(fileName);
    setFileName(null);
  };

  const handleConfirmation = (e) => {
    setFileName(e.currentTarget.dataset.value.toString());
  }

  const handleCancel = () => {
    setFileName(null);
  }

  return (
      <>

        { fileList.length === 0 && <NoFiles/> }

        <ul>
          {fileList.map((file, index) => (
              <Tile key={index} className={classes.tile}>
                <li className={classes.deleteItemContainer}>

                  <div className={classes.transition} aria-hidden={fileName !== file} style={fileName !== file ? {width: 0, height: 0} : null}>
                    <p>Delete <span className={classes.deleteFileName}>{fileName}</span>?</p>
                    <div className={classes.deleteIconContainer}>
                      <IconButton data-value={file}
                                  onClick={handleDelete}
                                  size={size}
                                  kind="danger"
                                  label="Delete file"
                                  className={classes.deleteButton}
                      >
                        <TrashCan/>
                      </IconButton>
                      <IconButton data-value={file}
                                  onClick={(e) => handleCancel(e)}
                                  size={size}
                                  kind="primary"
                                  label="Delete file"
                                  className={classes.deleteButton}
                      >
                        <Undo/>
                      </IconButton>
                    </div>
                  </div>

                  <div className={classes.transition} aria-hidden={fileName === file} style={fileName === file ? {width: 0} : null}>
                    <span>{file}</span>
                    <IconButton data-value={file}
                                onClick={(e) => handleConfirmation(e)}
                                size={size}
                                kind="danger"
                                label="Delete file"
                                className={classes.deleteButton}
                    >
                      <TrashCan />
                    </IconButton>
                  </div>

                </li>
              </Tile>
          ))}
        </ul>

      </>
  );
}

export default DeleteFilePage;