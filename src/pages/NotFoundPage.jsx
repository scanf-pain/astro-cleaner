import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "flex grow flex-col items-center justify-center gap-12 p-12 text-4xl"
      }
    >
      <h1>404 Not Found</h1>
      <Button
        variant={"shadow"}
        color={"primary"}
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon /> Go to Homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
