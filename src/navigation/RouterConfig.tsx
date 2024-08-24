import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthCommonRoute from "./AuthCommonRoute";
import { ROUTE_ADDNEWCUSTOMERPAGE, ROUTE_ADDUSERPAGE, ROUTE_FREIGHTAGENTSPAGE, ROUTE_HOMEPAGE, ROUTE_LOGIN, ROUTE_NEWORDERPAGE, ROUTE_OUTFITTERSPHPAGE, ROUTE_REGISTER, ROUTE_REPORTSMENUPAGE, ROUTE_SEARCHPAGE } from "./routes";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AddNewCustomerPage from "../pages/AddNewCustomerPage";
import AddUserPage from "../pages/AddUserPage";
import FreightAgentsPage from "../pages/FreightAgentsPage";
import NewOrderPage from "../pages/NewOrderPage";
import OutfittersPHPage from "../pages/OutfittersPHPage";
import ReportsMenuPage from "../pages/ReportsMenuPage";
import SearchPage from "../pages/SearchPage";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthCommonRoute />}>
          <Route path={ROUTE_LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_REGISTER} element={<RegisterPage />} />
        </Route>

        <Route path={ROUTE_HOMEPAGE} element={<HomePage />} />
        <Route
          path={ROUTE_ADDNEWCUSTOMERPAGE}
          element={<AddNewCustomerPage />}
        />
        <Route path={ROUTE_ADDUSERPAGE} element={<AddUserPage />} />
        <Route path={ROUTE_FREIGHTAGENTSPAGE} element={<FreightAgentsPage />} />
        <Route path={ROUTE_HOMEPAGE} element={<HomePage />} />
        <Route path={ROUTE_NEWORDERPAGE} element={<NewOrderPage />} />
        <Route path={ROUTE_OUTFITTERSPHPAGE} element={<OutfittersPHPage />} />
        <Route path={ROUTE_REPORTSMENUPAGE} element={<ReportsMenuPage />} />
        <Route path={ROUTE_SEARCHPAGE} element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
