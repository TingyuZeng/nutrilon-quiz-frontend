import Image from "next/image";

const Img = ({
  src,
  alt = "",
  width,
  height,
  objectFit = "cover",
  imgClass,
  className = "",
}) => {
  const imageComponent =
    !!width && !!height ? (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClass}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        className={imgClass}
      />
    );

  return <div className={`img ${className}`}>{imageComponent}</div>;
};

export default Img;
