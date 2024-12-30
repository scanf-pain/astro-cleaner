import PropTypes from "prop-types";

const SampleSelector = ({ onImageSelected, samplesUrls, ...props }) => {
  return (
    <div
      className={"flex flex-wrap items-center justify-center gap-6"}
      {...props}
    >
      {samplesUrls.map((url, index) => (
        <img
          className={
            "hover:glow size-36 transform cursor-pointer rounded-3xl border-1 border-content4 object-cover transition duration-100 hover:scale-105 hover:border-primary/50"
          }
          key={index}
          src={url}
          title={"sample-image-" + index}
          alt={"sample-image-" + index}
          onClick={() => onImageSelected(url)}
        />
      ))}
    </div>
  );
};

SampleSelector.propTypes = {
  onImageSelected: PropTypes.func.isRequired,
  samplesUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SampleSelector;
