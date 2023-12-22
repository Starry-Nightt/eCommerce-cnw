import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  className?: string
}

function CustomImage({ src, className }: Props) {
  return (
    <Image
      className={className}
      src={src}
      alt=""
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }} // optional
    />
  );
}

export default CustomImage;
