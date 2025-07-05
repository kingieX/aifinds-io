export default function ToolCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-40 bg-muted" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="h-3 w-1/3 bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
        <div className="h-3 w-4/6 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded mt-4" />
      </div>
    </div>
  );
}
