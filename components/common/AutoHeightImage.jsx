// AutoHeightImage.tsx

import Image from "next/image";
import { useEffect, useState } from "react";

const AutoHeightImage = ({ imgSrc }) => {
  return (
    <div className="autoImage__wrapper rounded-3xl bg-gray">
      {imgSrc ? (
        <Image src={imgSrc} layout="fill" className="autoImage" alt="img" />
      ) : (
        "none"
      )}
    </div>
  );
};

export default AutoHeightImage;
