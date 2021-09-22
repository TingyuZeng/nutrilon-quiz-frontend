import Image from "next/image";
import classes from "./Img.module.scss";

const Img = ({
  src,
  alt = "",
  width,
  height,
  objectFit = "cover",
  imgClass,
  className = "",
  blurDataURL = "",
}) => {
  const placeholder = blurDataURL ? "blur" : "empty";
  const imageComponent =
    !!width && !!height ? (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClass}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        className={imgClass}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    );

  return (
    <div className={`${classes.wrapper} ${className}`}>{imageComponent}</div>
  );
};

export default Img;
