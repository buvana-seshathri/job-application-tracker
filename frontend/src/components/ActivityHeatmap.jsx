// Builds the last 28 days (7 columns x 4 rows) as an array of {date, count}
function getLast28Days(applications) {
  const counts = {};
  applications.forEach((app) => {
    counts[app.applied_date] = (counts[app.applied_date] || 0) + 1;
  });

  const days = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: counts[key] || 0 });
  }
  return days;
}

function colorFor(count) {
  if (count === 0) return 'bg-gray-100';
  if (count === 1) return 'bg-purple-200';
  if (count === 2) return 'bg-purple-300';
  if (count === 3) return 'bg-purple-400';
  if (count === 4) return 'bg-purple-500';
  if (count === 5) return 'bg-purple-600';
  return 'bg-purple-700';
}

function ActivityHeatmap({ applications }) {
  const days = getLast28Days(applications);

  return (
    <div className="grid grid-cols-7 gap-1 w-fit">
      {days.map((day) => (
        <div
          key={day.date}
          title={`${day.date}: ${day.count} application(s)`}
          className={`w-5 h-5 rounded ${colorFor(day.count)}`}
        />
      ))}
    </div>
  );
}

export default ActivityHeatmap;
