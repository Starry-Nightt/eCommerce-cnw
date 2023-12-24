import { LocalStorageKey } from "@/constants/local-storage-key.const";
import { getSavedValue } from "@/utils/helper";
import { useEffect, useState } from "react";


function useLocalStorage(key: LocalStorageKey, initialValue?: any) {
  const [value, setValue] = useState(getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const clear = () => {
    localStorage.removeItem(key)
  }

  return [value, setValue, clear];
}

export default useLocalStorage;