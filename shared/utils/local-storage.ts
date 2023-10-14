import LocalStorageKey from "@/constants/local-storage-key";

export const getKey = (key: LocalStorageKey) => {
  try {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};

export const setKey = (key: LocalStorageKey, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeKey = (key: LocalStorageKey) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
