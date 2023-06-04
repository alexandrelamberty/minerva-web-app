type Props = {
  src: string;
  alt: string;
};

const ImagePreview = ({ src, alt }: Props) => {
  return <img className="img-preview" src={src} alt={alt} />;
};

export default ImagePreview;
