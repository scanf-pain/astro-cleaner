import Filters from "./Filters.jsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import PropTypes from "prop-types";

const SidePanel = ({ filterValues, onFilterChange, disabled, ...props }) => {
  const [open, setOpen] = useState(true);

  const onToogleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <section
      className={twMerge(
        "side-panel rounded-b-3xl border-b border-content4 bg-content2 px-4 md:rounded-l-none md:rounded-r-3xl md:border-r",
      )}
      {...props}
    >
      <div
        className="flex cursor-pointer items-center justify-center gap-2 p-4 text-xl hover:text-primary md:justify-between"
        onClick={() => onToogleClick()}
        title={open ? "Minimize sidebar" : "Maximize sidebar"}
      >
        <MixerHorizontalIcon className={"size-6"} />

        <h2>Filters</h2>

        <div className={"md:hidden"}>
          {open ? (
            <ChevronUpIcon className={"size-6"} />
          ) : (
            <ChevronDownIcon className={"size-6"} />
          )}
        </div>

        <div className={"hidden md:block"}>
          {open ? (
            <ChevronLeftIcon className={"size-6"} />
          ) : (
            <ChevronRightIcon className={"size-6"} />
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "side-panel-content overflow-scroll",

          "overflow-scroll transition-all duration-300 ease-in-out",
          "w-full md:w-[30vw]",
          open
            ? "max-h-[40vh] md:h-full md:max-h-full md:max-w-[80vw]"
            : "max-h-0 md:max-h-min md:max-w-32",
        )}
      >
        <Filters
          className={twMerge("gap-4 p-4", open || "md:hidden")}
          filterValues={filterValues}
          isDisabled={disabled}
          onFilterChange={onFilterChange}
        />
      </div>
      {open && (
        <div
          className={
            "flex cursor-pointer items-center justify-center py-4 hover:text-primary md:hidden"
          }
          title={"Close filter panel"}
          onClick={() => onToogleClick()}
        >
          <ChevronUpIcon className={"size-6"} />
        </div>
      )}
    </section>
  );
};

SidePanel.propTypes = {
  filterValues: PropTypes.shape({
    intensity: PropTypes.number.isRequired,
    brightness: PropTypes.number.isRequired,
    contrast: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SidePanel;
