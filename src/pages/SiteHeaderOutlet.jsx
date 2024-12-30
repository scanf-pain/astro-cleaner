import SiteHeader from "../components/SiteHeader.jsx";
import { Outlet } from "react-router-dom";

const SiteHeaderOutlet = () => {
  return (
    <div className="bg-[url('/save-banner-small.png')]">
      <SiteHeader className={"bg-content1"} isBordered={false} />
      <main className={"flex flex-col items-center justify-center"}>
        <Outlet />
      </main>
    </div>
  );
};

export default SiteHeaderOutlet;
