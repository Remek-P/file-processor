import { useContext, useEffect, useState } from "react";

import NoFiles from "@/components/delete-file-page/no-files/no-files";

import { FileDataGlobalContext } from "@/context/global-context";

import { deleteData, deleteDataAll, getFileNames } from "@/utils/indexedDB";

import TextTile from "@/components/tile-type/text-tile/textTile";
import DeleteFileListItem from "@/components/delete-file-page/delete-file-list/delete-file-list-item";

import classes from "./delete-file.module.scss";
import {Button, IconButton} from "@carbon/react";
import Link from "next/link";
import {TrashCan} from "@carbon/react/icons";
import ConfirmDeleteButtons from "@/components/delete-file-page/confirm-delete-buttons/confirm-delete-buttons";

function DeleteFilePage() {

  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const isFiles = fileList.length !== 0;

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
  }, [fileName, refresh]);

  const handleDelete = async () => {
    await deleteData(fileName);
    setFileName(null);
  };

  const handleDeleteAll = async () => {
    await deleteDataAll();
    setRefresh(prevState => !prevState);
    setFileName(null);
  };

  const handleConfirmation = (e) => {
    setFileName(e.currentTarget.dataset.value.toString());
  }

  const handleConfirmationAll = () => {
    setIsVisible(true);
  }

  const handleCancel = () => {
    setFileName(null);
  }

  const handleCancelAll = () => {
    setIsVisible(false);
  }

  return (
      <section className={classes.delete}>

        { !isFiles && <NoFiles/> }

        {
          isFiles &&
            <TextTile type="children">
              <h3>Choose files to delete</h3>

              <article className={classes.deleteList} role="list">
                {fileList.map((file, index) => (
                    <DeleteFileListItem key={index}
                                        file={file}
                                        fileName={fileName}
                                        index={index}
                                        size={size}
                                        handleDelete={handleDelete}
                                        handleConfirmation={handleConfirmation}
                                        handleCancel={handleCancel}
                    />
                ))}
              </article>

              <div className={classes.deleteDataAllContainer}>
                <Link href="/">
                  <Button className={classes.deleteButton} size="md">Home</Button>
                </Link>

                {!isVisible
                    && <IconButton onClick={handleConfirmationAll}
                                   size={size}
                                   kind="danger"
                                   label="Delete all"
                                   className={classes.deleteButton}
                    >
                      <TrashCan/>
                    </IconButton>
                }

                { isVisible &&
                    <ConfirmDeleteButtons handleDelete={handleDeleteAll}
                                          handleCancel={handleCancelAll}
                    />
                }
              </div>
            </TextTile>
        }

      </section>
  );
}

export default DeleteFilePage;