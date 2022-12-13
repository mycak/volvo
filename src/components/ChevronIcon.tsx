import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

interface ChevronProps {
  left?: boolean;
  circle?: boolean;
}
export const Chevron: FC<ChevronProps> = ({ left, circle }) => (
  <Image
    src={`/icons/${circle ? "chevron-circled" : "chevron-small"}.svg`}
    alt="chevron"
    width={circle ? 28 : 12}
    height={circle ? 28 : 9}
    layout="fixed"
    className={clsx(left && "rotate-180")}
  />
);
