// import { LoadingIcon } from "@/components/icons";
// import logo from "../assets/images/logo-unit.jpg";
import { FC } from "react";
import { SITE_BASE } from "../../config/constants";
interface PROPS {
  part?: boolean;
}
export const Loading: FC<PROPS> = ({ part }) => {
  const logo = `${SITE_BASE}/logo192.png`;

  return (
    <div className="loading-page">
      <div className="loading-content">
        <img
          src={logo} // Replace with your logo path
          alt="Logo"
          className="loading-logo"
        />
        <p className="loading-text">Please wait for a moment...</p>
      </div>
    </div>
  );
};
