export const getStatus = (code: number): string => {
  return "success";
};
export const getUniqStringList = (data: string[] ): any => {
  const res = Array.from(new Set(data));
  return res;
};
