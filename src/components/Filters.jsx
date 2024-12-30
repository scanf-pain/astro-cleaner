import { Slider } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Filters = ({
  isDisabled,
  filterValues,
  onFilterChange,
  className,
  ...props
}) => {
  const numberFromChangeEndEvent = (e) => {
    if (Array.isArray(e)) {
      return e[0];
    }
    return e;
  };

  return (
    <section
      className={twMerge("filters f flex w-full flex-col", className)}
      {...props}
    >
      <Slider
        label={"Intensity"}
        step={0.1}
        formatOptions={{ style: "percent" }}
        isDisabled={isDisabled}
        minValue={0}
        maxValue={2}
        defaultValue={filterValues.intensity}
        onChangeEnd={(e) => {
          filterValues.intensity = numberFromChangeEndEvent(e);
          onFilterChange();
        }}
        {...props}
      />

      <Slider
        label={"Brightness"}
        step={2}
        formatOptions={{ signDisplay: "always" }}
        isDisabled={isDisabled}
        minValue={-100}
        fillOffset={0}
        maxValue={100}
        defaultValue={filterValues.brightness}
        onChangeEnd={(e) => {
          filterValues.brightness = numberFromChangeEndEvent(e);
          onFilterChange();
        }}
        {...props}
      />

      <Slider
        label={"Contrast"}
        step={0.1}
        formatOptions={{ style: "percent" }}
        isDisabled={isDisabled}
        minValue={0}
        maxValue={2}
        defaultValue={filterValues.contrast}
        onChangeEnd={(e) => {
          filterValues.contrast = numberFromChangeEndEvent(e);
          onFilterChange();
        }}
        {...props}
      />

      <Slider
        label={"Gamma"}
        step={0.1}
        isDisabled={isDisabled}
        minValue={0.1}
        maxValue={1.9}
        defaultValue={filterValues.gamma}
        onChangeEnd={(e) => {
          filterValues.gamma = numberFromChangeEndEvent(e);
          onFilterChange();
        }}
        {...props}
      />
    </section>
  );
};

Filters.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  filterValues: PropTypes.shape({
    intensity: PropTypes.number.isRequired,
    brightness: PropTypes.number.isRequired,
    contrast: PropTypes.number.isRequired,
    gamma: PropTypes.number.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Filters;
