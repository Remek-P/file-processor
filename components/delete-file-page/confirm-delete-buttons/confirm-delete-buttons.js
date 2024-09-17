import classes from "@/components/delete-file-page/delete-file.module.scss";
import {IconButton} from "@carbon/react";
import {TrashCan, Undo} from "@carbon/icons-react";

function ConfirmDeleteButtons({ file = null, size = "md", handleDelete, handleCancel }) {
  return (
      <ul className={classes.deleteIconContainer}>

        <li>
          <IconButton data-value={file}
                      onClick={handleDelete}
                      size={size}
                      kind="danger"
                      label="Delete"
                      className={classes.deleteButton}
          >
            <TrashCan/>
          </IconButton>
        </li>

        <li>
          <IconButton onClick={(e) => handleCancel(e)}
                      size={size}
                      kind="primary"
                      label="Cancel delete"
                      className={classes.deleteButton}
          >
            <Undo/>
          </IconButton>
        </li>

      </ul>
  );
}

export default ConfirmDeleteButtons;