import { useState } from "react";
import Card from "components/card";

const InstituteCard = ({ name, location, logo, image, extra, onClick }) => {
  // Use logo if provided, otherwise use image prop
  const imageSource = logo || image;
  
  return (
    <Card onClick={onClick}
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra || ""}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={imageSource}
            className="mb-3 h-64 w-full rounded-xl object-cover 3xl:h-72"
            alt=""
          />
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {name}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              At {location}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InstituteCard;