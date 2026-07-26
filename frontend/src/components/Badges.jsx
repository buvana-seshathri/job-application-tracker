const BADGES = [
  { id: 'first_app', label: 'First Application', emoji: '🚀', check: (a) => a.length >= 1 },
  { id: 'five_apps', label: '5 Applications', emoji: '📨', check: (a) => a.length >= 5 },
  { id: 'ten_apps', label: '10 Applications', emoji: '💪', check: (a) => a.length >= 10 },
  {
    id: 'first_callback',
    label: 'First Callback',
    emoji: '📞',
    check: (a) => a.some((app) => ['callback', 'interviewing', 'offer'].includes(app.status)),
  },
  { id: 'first_offer', label: 'First Offer', emoji: '🏆', check: (a) => a.some((app) => app.status === 'offer') },
  { id: 'networker', label: '10 Reachouts', emoji: '🤝', check: (_a, r) => r.length >= 10 },
];

function Badges({ applications, reachouts }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <p className="text-sm font-medium text-gray-600 mb-4">Achievements</p>
      <div className="flex flex-wrap gap-5">
        {BADGES.map((badge) => {
          const earned = badge.check(applications, reachouts);
          return (
            <div key={badge.id} className="flex flex-col items-center w-20">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 ${
                  earned
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-200 shadow-md'
                    : 'bg-gray-100 border-gray-200 grayscale opacity-50'
                }`}
              >
                {badge.emoji}
              </div>
              <p className={`text-xs text-center mt-2 ${earned ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                {badge.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Badges;
