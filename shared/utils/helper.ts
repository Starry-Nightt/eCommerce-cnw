import { LocalStorageKey } from "@/constants/local-storage-key.const";
import { BillStatus } from "@/models/bill.model";

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
  }).format(Math.floor(value * 1000) / 1000);
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

export const getRecentDates = (): string[] => {
  const today = new Date();
  const recentDates: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    recentDates.push(formattedDate);
  }

  return recentDates;
};

export const getCurrentYear = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear;
};

export const getLabelBillStatus = (status: BillStatus): string => {
  return status === BillStatus.CHECK
    ? "Đã xác thực"
    : status === BillStatus.UNCHECK
    ? "Chưa xác thực"
    : "Đang vận chuyển";
};

export function convertDateFormat(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export function convertDateFormat2(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
}

export function isDateToday(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const currentDate = new Date();
  const dayTmp = currentDate.getDate();
  return Number(day) == dayTmp;
}

export function isDateInCurrentMonth(isoDateString) {
  const date = new Date(isoDateString);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const currentDate = new Date();

  const monthTmp = currentDate.getMonth() + 1;

  return Number(month) == monthTmp;
}

export function isDateInCurrentYear(isoDateString) {
  const date = new Date(isoDateString);
  const currentDate = new Date();
  const yearTmp = currentDate.getFullYear();
  const year = date.getUTCFullYear();
  return Number(year) == yearTmp;
}
