import StatCards from './StatCards';
import CategoryPieChart from './CategoryPieChart';
import StatusBarChart from './StatusBarChart';
import ActivityHeatmap from './ActivityHeatmap';

function Dashboard({ applications }) {
  return (
    <div className="flex flex-col gap-4">
      <StatCards applications={applications} />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Applications by Category</p>
          <CategoryPieChart applications={applications} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Pipeline by Status</p>
          <StatusBarChart applications={applications} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <p className="text-sm font-medium text-gray-600 mb-2">Activity (last 4 weeks)</p>
        <ActivityHeatmap applications={applications} />
      </div>
    </div>
  );
}

export default Dashboard;
