const statusStyles = {
  submitted: 'bg-blue-100 text-blue-700',
  callback: 'bg-purple-100 text-purple-700',
  interviewing: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

function ApplicationCard({ app, onStatusChange, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-800">{app.company}</p>
        <p className="text-sm text-gray-500">
          {app.role} · {app.category} {app.referral ? '· Referral' : ''}
        </p>
        <p className="text-xs text-gray-400">Applied {app.applied_date}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[app.status]}`}>
          {app.status}
        </span>

        <select
          value={app.status}
          onChange={(e) => onStatusChange(app.id, e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1"
        >
          {Object.keys(statusStyles).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={() => onDelete(app.id)}
          className="text-gray-400 hover:text-red-500 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
