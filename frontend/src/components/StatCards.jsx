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
    { label: 'Total Applications', value: total, color: 'bg-blue-100 text-blue-700' },
    { label: 'Active Pipeline', value: active, color: 'bg-indigo-100 text-indigo-700' },
    { label: 'Offers', value: offers, color: 'bg-green-100 text-green-700' },
    { label: 'Rejected', value: rejected, color: 'bg-red-100 text-red-700' },
    { label: 'Response Rate', value: `${percent(responded, total)}%`, color: 'bg-purple-100 text-purple-700' },
    { label: 'Offer Rate', value: `${percent(offers, total)}%`, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Referral Rate', value: `${percent(referrals, total)}%`, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Applications / Week', value: perWeek, color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-2xl p-4 text-center ${card.color}`}>
          <p className="text-2xl font-bold">{card.value}</p>
          <p className="text-sm">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
