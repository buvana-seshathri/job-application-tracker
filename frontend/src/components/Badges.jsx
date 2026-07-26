const DAILY_WARMUP_GOAL = 5;
const DAILY_GRIND_GOAL = 10;
const STREAK_GOAL = 3; // consecutive days hitting the warm-up goal

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function countOnDate(applications, dateStr) {
  return applications.filter((a) => a.applied_date === dateStr).length;
}

// Walks backward from today counting consecutive days that hit `dailyGoal`.
// Stops at the first day that misses it — so this resets naturally if you skip a day.
function currentStreak(applications, dailyGoal) {
  let streak = 0;
  for (let i = 0; ; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    if (countOnDate(applications, dateStr) >= dailyGoal) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

const BADGES = [
  { id: 'first_app', label: 'First Application', emoji: '🚀', check: (a) => a.length >= 1 },
  {
    id: 'daily_warmup',
    label: `${DAILY_WARMUP_GOAL} Today`,
    emoji: '📨',
    check: (a) => countOnDate(a, todayStr()) >= DAILY_WARMUP_GOAL,
  },
  {
    id: 'daily_grind',
    label: `${DAILY_GRIND_GOAL} Today`,
    emoji: '💪',
    check: (a) => countOnDate(a, todayStr()) >= DAILY_GRIND_GOAL,
  },
  {
    id: 'streak',
    label: `${STREAK_GOAL}-Day Streak`,
    emoji: '🔥',
    check: (a) => currentStreak(a, DAILY_WARMUP_GOAL) >= STREAK_GOAL,
  },
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
