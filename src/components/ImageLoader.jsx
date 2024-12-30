import ImageUpload from "./ImageUpload.jsx";
import SampleSelector from "./SampleSelector.jsx";
import PropTypes from "prop-types";

const samplesUrls = [
  "samples/space-1.png",
  "samples/space-2.png",
  "samples/space-3.png",
];

const ImageLoader = ({ onImageUrlLoad, ...props }) => {
  return (
    <div
      className="image-loader flex grow flex-col items-center gap-12 overflow-y-scroll p-12"
      {...props}
    >
      <ImageUpload
        onImageUpload={(url) => onImageUrlLoad(url, "astrocleaner")}
      />

      <p className={"text-xl"}> or try sample image</p>

      <SampleSelector
        onImageSelected={(url) => onImageUrlLoad(url, "sample-image")}
        samplesUrls={samplesUrls}
      />
    </div>
  );
};

ImageLoader.propTypes = {
  onImageUrlLoad: PropTypes.func.isRequired,
};

export default ImageLoader;
