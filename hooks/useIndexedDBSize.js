import {useContext, useEffect, useRef} from 'react';
import { checkIndexedDB_Size } from "@/utils/indexedDB";
import { IndexedDB_SizeContext, WarningsContext} from "@/context/global-context";
import { DB_NAME } from "@/constants/constants";

function useIndexedDBSize() {

  const [ , setTotalSize ] = useContext(IndexedDB_SizeContext);
  const { addWarnings } = useContext(WarningsContext);

  const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current) return;

    // Mark the effect as having run
    hasRun.current = true;

    checkIndexedDB_Size(DB_NAME, addWarnings, setTotalSize);
  }, []);
}

export default useIndexedDBSize;
