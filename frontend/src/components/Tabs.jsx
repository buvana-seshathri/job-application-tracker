const TABS = [
  { key: 'dashboard', label: '📊 Dashboard' },
  { key: 'applications', label: '📋 Applications' },
  { key: 'reachouts', label: '🔗 Networking' },
];

function Tabs({ active, onChange }) {
  return (
    <div className="flex gap-2 bg-white rounded-2xl shadow-sm p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            active === tab.key
              ? 'bg-purple-500 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
