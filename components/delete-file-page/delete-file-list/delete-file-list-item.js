import {IconButton, Tile} from "@carbon/react";
import {TrashCan, Undo} from "@carbon/icons-react";

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
      <Tile key={index}>
        <li className={classes.deleteItemContainer}>

          <div className={classes.transition} aria-hidden={fileName !== file}
               style={fileName !== file ? {width: 0, height: 0} : null}>
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

          <div className={classes.transition} aria-hidden={fileName === file}
               style={fileName === file ? {width: 0} : null}>
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

        </li>
      </Tile>
  );
}

export default DeleteFileListItem;