import { useContext, useEffect, useState } from "react";

import NoFiles from "@/components/delete-file-page/no-files/no-files";

import { FileDataGlobalContext } from "@/context/global-context";

import { deleteData, getFileNames} from "@/utils/create-indexedDB";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DeleteFileListItem from "@/components/delete-file-page/delete-file-list/delete-file-list-item";


function DeleteFilePage() {

  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(null);

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

        { !isFiles && <NoFiles/> }

        {
          isFiles &&
            <TexTile type="children">
              <h3>Choose files to delete</h3>

              <ul>
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
              </ul>
            </TexTile>
        }

      </>
  );
}

export default DeleteFilePage;