// AutoHeightImage.tsx

import Image from "next/image";
import { useEffect, useState } from "react";

const AutoHeightImage = ({ imgSrc }) => {
  return (
    <div className="autoImage__wrapper rounded-3xl bg-gray h-full">
      {imgSrc ? (
        <Image src={imgSrc} layout="fill" className="autoImage" alt="img" />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-slate-300 rounded-lg">
          sorry no image
        </div>
      )}
    </div>
  );
};

export default AutoHeightImage;
