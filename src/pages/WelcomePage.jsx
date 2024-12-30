import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import AstroLogo from "../icons/AstroLogo.jsx";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <section className={"flex grow flex-col items-center gap-8 p-10 py-10"}>
      <AstroLogo />
      <h1 className={"text-5xl"}>Astro Cleaner</h1>
      <p className={"text-wrap py-4 text-center text-4xl leading-relaxed"}>
        <b className={"text-primary"}>Clean</b> your astronomy images straight{" "}
        <b className={"text-primary"}>in browser</b> for{" "}
        <b className={"text-primary"}>free</b>
      </p>
      <Button
        variant={"shadow"}
        color={"primary"}
        onClick={() => navigate("app/")}
        size={"lg"}
      >
        Try it out now <ArrowRightIcon className={"size-5"} />
      </Button>
    </section>
  );
};

export default WelcomePage;
