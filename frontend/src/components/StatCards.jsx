const cards = [
  { key: 'callback', label: 'Callback', color: 'bg-purple-100 text-purple-700' },
  { key: 'interviewing', label: 'Interviewing', color: 'bg-yellow-100 text-yellow-700' },
  { key: 'offer', label: 'Offers', color: 'bg-green-100 text-green-700' },
];

function StatCards({ applications }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="rounded-2xl p-4 text-center bg-blue-100 text-blue-700">
        <p className="text-2xl font-bold">{applications.length}</p>
        <p className="text-sm">Applied</p>
      </div>
      {cards.map((card) => {
        const count = applications.filter((a) => a.status === card.key).length;
        return (
          <div key={card.key} className={`rounded-2xl p-4 text-center ${card.color}`}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-sm">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StatCards;
