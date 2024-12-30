import useLoadOpenCV from "./hooks/useLoadOpenCV.js";
import Astrocleaner from "./pages/Astrocleaner.jsx";
import { Spinner } from "@nextui-org/react";

function App() {
  const { isError, isCvLoaded } = useLoadOpenCV();

  return (
    <>
      {isError ? (
        <div>
          <p>error</p>
        </div>
      ) : isCvLoaded ? (
        <Astrocleaner />
      ) : (
        <div
          className={
            "flex h-full w-full grow flex-col items-center justify-center gap-4"
          }
        >
          <Spinner />

          <p>please wait</p>
        </div>
      )}
    </>
  );
}

export default App;
