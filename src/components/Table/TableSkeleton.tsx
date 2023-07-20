export function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="grid grid-cols-1 gap-y-2 animate-pulse w-72">
      {Array.from({ length: rows }).map((_, i) => (
        <div className={`h-${i % 2 === 0 ? 4 : 6} bg-slate-200 rounded`} />
      ))}
    </div>
  );
}
