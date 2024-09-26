import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ROUTE_ADDFREIGHTAGENTSPAGE,
  ROUTE_ADDNEWCUSTOMERPAGE,
  ROUTE_ADDOUTFITTERSPHPAGE,
  ROUTE_ADDUSERPAGE,
  ROUTE_CUSTOMER_LIST_PAGE,
  ROUTE_DASHBOARD,
  ROUTE_FREIGHTAGENTLISTPAGE,
  ROUTE_HOMEPAGE,
  ROUTE_LOGIN,
  ROUTE_ORDERLISTPAGE,
  ROUTE_ORDERDETAILPAGE,
  ROUTE_OUTFITTERSLISTPAGE,
  ROUTE_REGISTER,
  ROUTE_REPORTSMENUPAGE,
  ROUTE_SEARCHPAGE,
  ROUTE_USERLISTPAGE,
} from "./routes";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AddNewCustomerPage from "../pages/Customer/AddNewCustomerPage";
import AddUserPage from "../pages/User/AddUserPage";
import FreightAgentListPage from "../pages/Agents/FreightAgentListPage";
import NewOrderPage from "../pages/Order/NewOrderPage";
import OutfittersPHPage from "../pages/Outfitter/AddOutfittersPHPage";
import ReportsMenuPage from "../pages/Reports/ReportsMenuPage";
import SearchPage from "../pages/Search/SearchPage";
import PublicWrapper from "./RouteWrapper/PublicWrapper";
import PrivateWrapper from "./RouteWrapper/PrivateWrapper";
import { useAuthContext } from "../context/AuthContext";
import { Loading } from "../components/Containers/Loading";
import CustomerListPage from "../pages/Customer/CustomerListPage";
import OutfittersPHListPage from "../pages/Outfitter/OutfittersPHListPage";
import AddFreightAgentPage from "../pages/Agents/AddFreightAgentPage";
import UserListPage from "../pages/User/UserListPage";
import OrderListPage from "../pages/Order/OrderListPage";

const RouterConfig = () => {
  const { busy } = useAuthContext();
  if (busy) {
    return <Loading />;
  }
  return (
    <div>
      <Routes>
        <Route element={<PublicWrapper />}>
          <Route path={ROUTE_LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateWrapper />}>
          {/* <Route path={ROUTE_HOMEPAGE} element={<HomePage />} /> */}
          <Route path={ROUTE_HOMEPAGE} element={<CustomerListPage />} />
          <Route path={ROUTE_DASHBOARD} element={<HomePage />} />

          {/* customer */}
          <Route
            path={ROUTE_CUSTOMER_LIST_PAGE}
            element={<CustomerListPage />}
          />
          <Route
            path={ROUTE_ADDNEWCUSTOMERPAGE}
            element={<AddNewCustomerPage />}
          />
          <Route
            path={ROUTE_ADDNEWCUSTOMERPAGE + "/:customerId"}
            element={<AddNewCustomerPage />}
          />

          <Route
            path={ROUTE_OUTFITTERSLISTPAGE}
            element={<OutfittersPHListPage />}
          />
          <Route
            path={ROUTE_ADDOUTFITTERSPHPAGE}
            element={<OutfittersPHPage />}
          />
          <Route
            path={ROUTE_ADDOUTFITTERSPHPAGE + "/:id"}
            element={<OutfittersPHPage />}
          />

          <Route
            path={ROUTE_FREIGHTAGENTLISTPAGE}
            element={<FreightAgentListPage />}
          />
          <Route
            path={ROUTE_ADDFREIGHTAGENTSPAGE}
            element={<AddFreightAgentPage />}
          />
          <Route
            path={ROUTE_ADDFREIGHTAGENTSPAGE + "/:id"}
            element={<AddFreightAgentPage />}
          />

          <Route path={ROUTE_USERLISTPAGE} element={<UserListPage />} />
          <Route path={ROUTE_ADDUSERPAGE} element={<AddUserPage />} />
          <Route path={ROUTE_ADDUSERPAGE + "/:id"} element={<AddUserPage />} />

          <Route path={ROUTE_ORDERLISTPAGE} element={<OrderListPage />} />
          <Route path={ROUTE_ORDERDETAILPAGE} element={<NewOrderPage />} />
          <Route
            path={ROUTE_ORDERDETAILPAGE + "/:id"}
            element={<NewOrderPage />}
          />
          {/* below will be removed. */}

          <Route path={ROUTE_REPORTSMENUPAGE} element={<ReportsMenuPage />} />
          <Route path={ROUTE_SEARCHPAGE} element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouterConfig;
