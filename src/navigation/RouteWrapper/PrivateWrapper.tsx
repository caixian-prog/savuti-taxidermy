import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet, Route, redirect } from "react-router-dom";
import { ROUTE_LOGIN } from "../routes";
import MainLayout from "../../layout/MainLayout/MainLayout";

const PrivateWrapper = () => {
  let { controlValue } = useAuthContext();
  const { token, role } = controlValue;

  const isAuth =
    token !== undefined && token !== "";

  if (isAuth) {
    return <MainLayout />;
  } else {
    return <Navigate to={ROUTE_LOGIN} replace />;
  }
};
export default PrivateWrapper;
