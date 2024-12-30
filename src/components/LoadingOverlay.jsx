import { twMerge } from "tailwind-merge";
import { Spinner } from "@nextui-org/react";
import PropTypes from "prop-types";

const LoadingOverlay = ({ title, className, ...props }) => {
  return (
    <div
      className={twMerge(
        "fixed z-[99] flex h-full w-full grow items-center justify-center bg-content1/50 backdrop-blur",
        className,
      )}
      {...props}
    >
      <div
        className={
          "flex gap-4 rounded-2xl border border-content4 bg-content2 p-6"
        }
      >
        <Spinner />
        <p className={"text-xl"}>{title}</p>
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingOverlay;
