import { forwardRef, ComponentProps, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface ImageUploaderProps extends ComponentProps<"input"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange?: (images: File[]) => void;
  errors?: string[];
  defaultImages?: File[];
  label: string;
}

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  (props, ref) => {
    const {
      onChange,
      onImageChange,
      defaultImages,
      max,
      errors,
      label,
      className,
      ...otherProps
    } = props;

    const [selectedImages, setSelectedImages] = useState<File[]>(
      defaultImages ?? []
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      const validImages = files.filter((file) => file.type.includes("image"));

      const newImages =
        Number(max) === 1 ? validImages : [...selectedImages, ...validImages];

      setSelectedImages(newImages);

      onImageChange?.(newImages);
    };

    const handleRemoveImage = (index: number) => {
      const newImages = selectedImages.filter((_, i) => i !== index);
      setSelectedImages(newImages);

      onImageChange?.(newImages);
    };

    return (
      <div className="ull flex flex-col">
        <div>
          {label && (
            <label className="text-co-black font-bold text-base">{label}</label>
          )}
          <div className="flex w-full border border-co-gray rounded-md items-center bg-white">
            <label
              className="mb-2 text-sm font-medium text-gray-900 w-10 flex items-center justify-center"
              htmlFor="multiple_files"
            >
              <AiOutlineCloudUpload size={18} />
            </label>

            <input
              className="block flex-grow file:hidden w-fit text-sm text-gray-900 border h-full py-2 border-white rounded-lg cursor-pointer bg-gray-50"
              id="multiple_files"
              type="file"
              onChange={handleFileChange}
              multiple={props.max != 1}
              ref={ref}
              accept="image/*"
              {...otherProps}
            />
          </div>
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG, JPG or JPEG (MAX. 800x400px).
          </p>
        </div>

        {selectedImages.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {selectedImages.map((image, index) => (
              <div key={index} className="mb-4 w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Image"
                  width={"250px"}
                  className="h-36 w-36 object-cover"
                  src={URL.createObjectURL(image)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-400 text-white w-full"
                >
                  Remove
                </button>
                {errors?.[index] && (
                  <p className="text-red-500 text-xs">{errors?.[index]}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
