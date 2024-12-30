import SiteHeader from "../components/SiteHeader.jsx";
import { Outlet } from "react-router-dom";

const SiteHeaderOutlet = () => {
  return (
    <div className="bg-[url('/save-banner-small.png')]">
      <SiteHeader className={"bg-content1 bg-red-300"} isBordered={false} />
      <Outlet />
    </div>
  );
};

export default SiteHeaderOutlet;
