import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@nextui-org/react";
import PropTypes from "prop-types";

const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ImageUpload = ({ onImageUpload, ...props }) => {
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (file) => {
    setIsUploading(true);
    if (acceptedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsUploading(false);
        onImageUpload(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only JPG, PNG, and WEBP files are allowed.");
    }
  };

  const handleInputUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div>
      <label
        className={twMerge(
          "hover:glow block cursor-pointer rounded-[10%] border-1 border-dashed p-4 hover:border-primary hover:bg-primary/5",
          dragging && "glow border-primary bg-primary/5",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        title={"Upload Image"}
        {...props}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <svg
            className="mb-4 h-8 w-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-6 text-center text-xl">
            <b className="">Click to upload</b>
            <br />
            or
            <br />
            drag and drop
          </p>
          <p className="italic">* supports png, jpg or webp </p>
        </div>
        <input
          type="file"
          accept={acceptedTypes.join(",")}
          className="image-upload hidden"
          onChange={handleInputUpload}
        />
      </label>

      {isUploading && (
        <div>
          <Spinner /> <p> uploading image... </p>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
