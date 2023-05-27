import { useEffect, useId, useState } from "react";

type Props = {
  register: any;
  name: string;
  image?: string | undefined;
  // value: string | undefined;
  onChange: (e: FileList) => void;
  errors?: any;
  className?: string;
};

const InputImageViewer = ({
  register,
  name,
  image,
  onChange,
  errors,
  className,
}: Props) => {
  const id = useId();
  const [cover, setCover] = useState<string>();

  /**
   *
   */
  useEffect(() => {
    console.log("useEffect ", image);
    if (image) setCover("http://localhost:3000/" + image);
  }, [image]);

  return (
    <div className={`${className} flex items-center justify-center`}>
      {!cover ? (
        <label className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          {/* File Input */}
          <input
            id={"input-image"}
            type="file"
            className="hidden"
            onChange={(e: any) => {
              console.log(e);
              if (e.target.files || e.target.files.length > 0) {
                const objectUrl = URL.createObjectURL(e.target.files[0]);
                setCover(objectUrl);
                onChange(e.target.files);
              }
            }}
          />
        </label>
      ) : (
        <img
          src={cover}
          onClick={() => {
            setCover("");
            // onChange(null);
          }}
          className="w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer"
        />
      )}
    </div>
  );
};

export default InputImageViewer;
