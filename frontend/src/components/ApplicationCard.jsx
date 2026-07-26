import StatusProgress, { STAGE_KEYS, STAGE_LABELS } from './StatusProgress';

function nextStage(status) {
  const i = STAGE_KEYS.indexOf(status);
  if (i === -1 || i === STAGE_KEYS.length - 1) return null; // already rejected or at offer
  return STAGE_KEYS[i + 1];
}

const borderByStatus = {
  submitted: 'border-l-blue-400',
  callback: 'border-l-purple-400',
  interviewing: 'border-l-yellow-400',
  offer: 'border-l-green-400',
  rejected: 'border-l-red-400',
};

function ApplicationCard({ app, onStatusChange, onDelete }) {
  const next = nextStage(app.status);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-4 border-l-4 ${borderByStatus[app.status]} flex items-center justify-between gap-4`}
    >
      <div>
        <p className="font-bold text-gray-800">{app.company}</p>
        <p className="text-sm text-gray-500">{app.role}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
            {app.category}
          </span>
          {!!app.referral && (
            <span className="text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">
              🤝 Referral
            </span>
          )}
          <span className="text-xs text-gray-400">Applied {app.applied_date}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <StatusProgress status={app.status} />

        {app.status === 'offer' && <span className="text-lg">🎉</span>}

        {next && (
          <button
            onClick={() => onStatusChange(app.id, next)}
            className="text-xs font-bold bg-purple-500 hover:bg-purple-600 text-white rounded-full px-3 py-1.5 shadow-sm transition-colors"
          >
            Advance to {STAGE_LABELS[next]} →
          </button>
        )}

        {app.status !== 'rejected' && app.status !== 'offer' && (
          <button
            onClick={() => onStatusChange(app.id, 'rejected')}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            Mark rejected
          </button>
        )}

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
