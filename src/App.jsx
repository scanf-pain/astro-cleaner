import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.jsx";
import AstrocleanerLoader from "./AstrocleanerLoader.jsx";
import SiteHeaderOutlet from "./pages/SiteHeaderOutlet.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import QuickstartPage from "./pages/QuickstartPage.jsx";
import { NextUIProvider } from "@nextui-org/react";

const App = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" element={<SiteHeaderOutlet />}>
          <Route index element={<WelcomePage />} />
          <Route path={"quickstart"} element={<QuickstartPage />} />
          <Route path={"about"} element={<WelcomePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
        <Route path="/app" element={<AstrocleanerLoader />} />
      </Routes>
    </NextUIProvider>
  );
};

export default App;
