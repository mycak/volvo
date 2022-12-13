import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { VehicleType } from "../types";
import { Chevron } from "./ChevronIcon";

interface CarCardProps {
  data: VehicleType;
  basic?: boolean;
}
const CarCard: FC<CarCardProps> = ({ data, basic }) => {
  return (
    <div className="max-w-[235px]">
      <p className="font-semibold text-gray-500 text-sm">{data.bodyType}</p>
      <p className="font-bold mb-4">
        {data.modelName}{" "}
        <span className="text-gray-400 font-medium">{data.modelType}</span>
      </p>
      <Image
        src={data.imageUrl}
        layout="fixed"
        width={235}
        height={176}
        alt={data.id}
      />
      {!basic && (
        <div className="mt-6 flex justify-center gap-4">
          <Link href={`/learn/${data.id}`} className="cursor-pointer">
            <a className="flex items-center gap-1 font-bold text-xs text-[#1c6bba]">
              LEARN <Chevron />
            </a>
          </Link>
          <Link href={`/shop/${data.id}`} className="cursor-pointer">
            <a className="flex items-center gap-1 font-bold text-xs text-[#1c6bba]">
              SHOP <Chevron />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarCard;
