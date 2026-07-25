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
        <div className="rounded-2xl p-4 text-center bg-blue-100 text-blue-700">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm">Reached Out</p>
        </div>
        <div className="rounded-2xl p-4 text-center bg-green-100 text-green-700">
          <p className="text-2xl font-bold">{responded}</p>
          <p className="text-sm">Got Response</p>
        </div>
        <div className="rounded-2xl p-4 text-center bg-purple-100 text-purple-700">
          <p className="text-2xl font-bold">{responseRate}%</p>
          <p className="text-sm">Response Rate</p>
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
