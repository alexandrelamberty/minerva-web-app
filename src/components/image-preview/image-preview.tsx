import placeholder from "../../assets/image-placeholder.png";

type Props = {
  src: string | undefined;
  alt: string | undefined;
  placeholderImage?: string;
};

const ImagePreview = ({ src, alt, placeholderImage }: Props) => {
  return (
    <>
      {src !== null ? (
        <img className="img-preview" src={src} alt={alt} />
      ) : (
        <img
          className="img-preview aspect-auto"
          src={placeholderImage ? placeholderImage : placeholder}
          alt="Image placeholder"
        />
      )}
    </>
  );
};

export default ImagePreview;
