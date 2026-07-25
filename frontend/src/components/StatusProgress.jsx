const STAGES = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'callback', label: 'Callback' },
  { key: 'interviewing', label: 'Interviewing' },
  { key: 'offer', label: 'Offer' },
];

function StatusProgress({ status }) {
  if (status === 'rejected') {
    return (
      <div className="text-sm font-medium text-red-500">✕ Rejected</div>
    );
  }

  const currentIndex = STAGES.findIndex((s) => s.key === status);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                i <= currentIndex ? 'bg-purple-500' : 'bg-gray-200'
              }`}
              title={stage.label}
            />
            {i < STAGES.length - 1 && (
              <div className={`w-6 h-0.5 ${i < currentIndex ? 'bg-purple-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">{STAGES[currentIndex]?.label}</p>
    </div>
  );
}

export const STAGE_KEYS = STAGES.map((s) => s.key);
export const STAGE_LABELS = Object.fromEntries(STAGES.map((s) => [s.key, s.label]));

export default StatusProgress;
