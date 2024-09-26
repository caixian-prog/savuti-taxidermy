interface UserTypeMap {
  [key: string]: number;
}
export const USERTYPE: UserTypeMap = {
  employee: 1,
  manager: 5,
  admin: 10,
  super: 100,
};
export type NotificationType = "success" | "info" | "warning" | "error";
export type SITE_STATUS = "success";
