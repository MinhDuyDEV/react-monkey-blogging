import React from "react";

const ImageUpload = (props) => {
  const { name, className = "", progress = 0, image = "", ...rest } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg relative overflow-hidden ${className}`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {!image && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-8"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <img src={image} alt="" className="object-cover w-full h-full" />
      )}
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
