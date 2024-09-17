import { IconButton, Tile } from "@carbon/react";

import { TrashCan } from "@carbon/icons-react";

import ConfirmDeleteButtons from "@/components/delete-file-page/confirm-delete-buttons/confirm-delete-buttons";

import classes from "@/components/delete-file-page/delete-file.module.scss";

function DeleteFileListItem({
                          file,
                          fileName,
                          index,
                          size,
                          handleDelete,
                          handleConfirmation,
                          handleCancel
                        }) {
  return (
      <Tile key={index} role="listitem">
        <div className={classes.deleteItemContainer}>

          <div className={classes.transition} aria-hidden={fileName !== file}
               style={fileName !== file ? {width: 0, height: 0} : null}>
            <p>Delete <span className={classes.deleteFileName}>{fileName}</span>?</p>

            <ConfirmDeleteButtons file={file}
                                  size={size}
                                  handleDelete={handleDelete}
                                  handleCancel={handleCancel}
            />

          </div>

          <div className={classes.transition}
               aria-hidden={fileName === file}
               style={fileName === file ? {width: 0} : null}
          >
            <span>{file}</span>

            <IconButton data-value={file}
                        onClick={(e) => handleConfirmation(e)}
                        size={size}
                        kind="danger"
                        label="Delete file"
                        className={classes.deleteButton}
            >
              <TrashCan/>
            </IconButton>

          </div>

        </div>
      </Tile>
  );
}

export default DeleteFileListItem;