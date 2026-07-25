import StatusProgress, { STAGE_KEYS, STAGE_LABELS } from './StatusProgress';

function nextStage(status) {
  const i = STAGE_KEYS.indexOf(status);
  if (i === -1 || i === STAGE_KEYS.length - 1) return null; // already rejected or at offer
  return STAGE_KEYS[i + 1];
}

function ApplicationCard({ app, onStatusChange, onDelete }) {
  const next = nextStage(app.status);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-800">{app.company}</p>
        <p className="text-sm text-gray-500">
          {app.role} · {app.category} {app.referral ? '· Referral' : ''}
        </p>
        <p className="text-xs text-gray-400">Applied {app.applied_date}</p>
      </div>

      <div className="flex items-center gap-4">
        <StatusProgress status={app.status} />

        {app.status === 'offer' && <span className="text-lg">🎉</span>}

        {next && (
          <button
            onClick={() => onStatusChange(app.id, next)}
            className="text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-3 py-1"
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
