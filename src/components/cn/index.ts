import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...props:any) => {
  return twMerge(clsx(...props));
}
