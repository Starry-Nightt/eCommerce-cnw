import { LocalStorageKey } from "@/constants/local-storage-key.const";

export function getSavedValue(key: LocalStorageKey, initialValue: any) {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    if (savedValue) return JSON.parse(savedValue);

    if (initialValue instanceof Function) return initialValue();
    return initialValue ?? "";
  }
  return "";
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

export function vndCurrencyFormat(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export function dateFormatted(value: string) {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  let sMM = `${mm}`;
  let sDD = `${dd}`;
  if (dd < 10) sDD = "0" + dd;
  if (mm < 10) sMM = "0" + mm;

  const formattedDate = sDD + "/" + sMM + "/" + yyyy;
  return formattedDate;
}

export function truncateString(str: String, num: number = 40) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
