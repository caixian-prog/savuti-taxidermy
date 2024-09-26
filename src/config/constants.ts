import {
  ROUTE_ADDNEWCUSTOMERPAGE,
  ROUTE_ADDUSERPAGE,
  ROUTE_CUSTOMER_LIST_PAGE,
  ROUTE_DASHBOARD,
  ROUTE_FREIGHTAGENTLISTPAGE,
  ROUTE_HOMEPAGE,
  ROUTE_ORDERLISTPAGE,
  ROUTE_OUTFITTERSLISTPAGE,
  ROUTE_REPORTSMENUPAGE,
  ROUTE_SEARCHPAGE,
  ROUTE_USERLISTPAGE,
} from "../navigation/routes";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CarOutlined,
  CarryOutOutlined,
  CloudOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  TruckOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const menuItems = [
  // {
  //   key: ROUTE_HOMEPAGE,
  //   icon: BarChartOutlined,
  //   label: "Dashboard",
  // },

  {
    key: ROUTE_CUSTOMER_LIST_PAGE,
    icon: ContactsOutlined,
    label: "Customers",
  },
  {
    key: ROUTE_SEARCHPAGE,
    icon: FileSearchOutlined,
    label: "Search",
  },
  {
    key: ROUTE_ORDERLISTPAGE,
    icon: FileTextOutlined,
    label: "Orders",
  },
  {
    key: ROUTE_OUTFITTERSLISTPAGE,
    icon: SolutionOutlined,
    label: "Outfitters/PH",
  },
  {
    key: ROUTE_FREIGHTAGENTLISTPAGE,
    icon: TruckOutlined,
    label: "Freight Agents",
  },
  {
    key: ROUTE_REPORTSMENUPAGE,
    icon: FileDoneOutlined,
    label: "Reports",
  },
  {
    key: ROUTE_USERLISTPAGE,
    icon: UserAddOutlined,
    label: "Users",
  },
];


export const dateFormat = 'YYYY-MM-DD';
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
