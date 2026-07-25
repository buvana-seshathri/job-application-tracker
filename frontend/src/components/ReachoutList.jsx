function ReachoutList({ reachouts, onToggleResponse, onDelete }) {
  if (reachouts.length === 0) {
    return <p className="text-gray-400 text-center py-8">No reachouts logged yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {reachouts.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800">{r.person_name}</p>
            <p className="text-sm text-gray-500">{r.company || 'No company listed'}</p>
            <p className="text-xs text-gray-400">Reached out {r.reached_out_date}</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!r.got_response}
                onChange={(e) => onToggleResponse(r.id, e.target.checked)}
              />
              Got response
            </label>

            <button onClick={() => onDelete(r.id)} className="text-gray-400 hover:text-red-500 text-sm">
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReachoutList;
