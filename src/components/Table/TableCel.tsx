import cn from "classnames";

type TableCellProps = {
  title: string;
  value: string;
  className?: string;
};

export function TableCell({ title, value, className }: TableCellProps) {
  const wrapperCn = cn(className);

  return (
    <div className={wrapperCn}>
      <p className="text-lg mb-1">{title}</p>
      <p className="text-slate-600">{value}</p>
    </div>
  );
}
