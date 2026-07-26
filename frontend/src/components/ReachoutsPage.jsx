import ReachoutForm from './ReachoutForm';
import ReachoutChart from './ReachoutChart';
import ReachoutList from './ReachoutList';

function ReachoutsPage({ reachouts, onAdd, onToggleResponse, onDelete }) {
  const total = reachouts.length;
  const responded = reachouts.filter((r) => r.got_response).length;
  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);

  return (
    <div className="flex flex-col gap-4">
      <ReachoutForm onAdd={onAdd} />

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 text-center bg-blue-50 border-b-4 border-blue-400 hover:-translate-y-0.5 transition-transform">
          <p className="text-2xl mb-1">📤</p>
          <p className="text-2xl font-extrabold text-blue-700">{total}</p>
          <p className="text-xs text-gray-500 font-medium">Reached Out</p>
        </div>
        <div className="rounded-2xl p-4 text-center bg-green-50 border-b-4 border-green-400 hover:-translate-y-0.5 transition-transform">
          <p className="text-2xl mb-1">💬</p>
          <p className="text-2xl font-extrabold text-green-700">{responded}</p>
          <p className="text-xs text-gray-500 font-medium">Got Response</p>
        </div>
        <div className="rounded-2xl p-4 text-center bg-purple-50 border-b-4 border-purple-400 hover:-translate-y-0.5 transition-transform">
          <p className="text-2xl mb-1">📈</p>
          <p className="text-2xl font-extrabold text-purple-700">{responseRate}%</p>
          <p className="text-xs text-gray-500 font-medium">Response Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <ReachoutChart reachouts={reachouts} />
      </div>

      <ReachoutList reachouts={reachouts} onToggleResponse={onToggleResponse} onDelete={onDelete} />
    </div>
  );
}

export default ReachoutsPage;
