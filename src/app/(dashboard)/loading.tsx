export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5 animate-pulse">
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
            <div className="h-7 bg-slate-200 rounded w-3/4" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-5 bg-slate-200 rounded w-full" />
      </div>
    </div>
  );
}
