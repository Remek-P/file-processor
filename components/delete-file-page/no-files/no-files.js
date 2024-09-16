import { Tile } from "@carbon/react";

import classes from "@/components/delete-file-page/delete-file.module.scss";
import {useEffect} from "react";
import { useRouter } from "next/router";

function NoFiles() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <Tile className={classes.tile}>
        <h1 className={classes.deleteEmpty}>
          No files to delete
        </h1>
      </Tile>
  );
}

export default NoFiles;