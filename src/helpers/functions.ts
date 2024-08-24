import { SITE_STATUS } from "./types";

export const getStatus = (code: number): string => {
  return SITE_STATUS[code] ?? "";
};
