import { LocalStorageKey } from "@/constants/local-storage-key.const";

export function getSavedValue(key: LocalStorageKey, initialValue: any) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) return JSON.parse(savedValue);

  if (initialValue instanceof Function) return initialValue();
  return initialValue ?? "";
}

export function getSortedArrayByKey(data: any[], key: string) {
  return data.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? 1 : x > y ? -1 : 0;
  });
}

export function getCurrentDateString(): string {
  let today = new Date();
  let dd: string | number = today.getDate();
  let mm: string | number = today.getMonth() + 1;
  let yyyy: string | number = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
}
