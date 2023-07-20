import { type ReactNode } from "react";
import cn from "classnames";

type TableColProps = {
  children: ReactNode;
  className?: string;
};

export function TableCol({ children, className }: TableColProps) {
  const colClassName = cn(
    className,
    "container border-2 rounded-xl p-4 grid grid-cols-1 gap-y-6 justify-items-start min-h-[332px]",
  );

  return <div className={colClassName}>{children}</div>;
}
