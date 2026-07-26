// Small helper — avoids divide-by-zero and rounds to whole percent
function percent(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

function weeksSince(dateStr) {
  const days = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(days / 7));
}

function StatCards({ applications }) {
  const total = applications.length;
  const active = applications.filter((a) => ['submitted', 'callback', 'interviewing'].includes(a.status)).length;
  const offers = applications.filter((a) => a.status === 'offer').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;
  const responded = applications.filter((a) => a.status !== 'submitted').length;
  const referrals = applications.filter((a) => a.referral).length;

  const earliestDate = total > 0 ? applications.map((a) => a.applied_date).sort()[0] : null;
  const perWeek = earliestDate ? (total / weeksSince(earliestDate)).toFixed(1) : '0';

  const cards = [
    { label: 'Total Applications', value: total, icon: '📨', border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-700' },
    { label: 'Active Pipeline', value: active, icon: '⚡', border: 'border-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-700' },
    { label: 'Offers', value: offers, icon: '🏆', border: 'border-green-400', bg: 'bg-green-50', text: 'text-green-700' },
    { label: 'Rejected', value: rejected, icon: '💔', border: 'border-red-400', bg: 'bg-red-50', text: 'text-red-700' },
    { label: 'Response Rate', value: `${percent(responded, total)}%`, icon: '📈', border: 'border-purple-400', bg: 'bg-purple-50', text: 'text-purple-700' },
    { label: 'Offer Rate', value: `${percent(offers, total)}%`, icon: '🎯', border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    { label: 'Referral Rate', value: `${percent(referrals, total)}%`, icon: '🤝', border: 'border-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    { label: 'Apps / Week', value: perWeek, icon: '🔥', border: 'border-orange-400', bg: 'bg-orange-50', text: 'text-orange-700' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl p-4 text-center ${card.bg} border-b-4 ${card.border} hover:-translate-y-0.5 transition-transform`}
        >
          <p className="text-2xl mb-1">{card.icon}</p>
          <p className={`text-2xl font-extrabold ${card.text}`}>{card.value}</p>
          <p className="text-xs text-gray-500 font-medium">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
