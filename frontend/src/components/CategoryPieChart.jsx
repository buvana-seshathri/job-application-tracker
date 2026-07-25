import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#a78bfa', '#60a5fa', '#fbbf24', '#34d399', '#f87171'];

function CategoryPieChart({ applications }) {
  // Turn [{category: 'SDE'}, {category: 'SDE'}, {category: 'ML'}] into
  // [{name: 'SDE', value: 2}, {name: 'ML', value: 1}]
  const counts = {};
  applications.forEach((app) => {
    counts[app.category] = (counts[app.category] || 0) + 1;
  });
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return <p className="text-gray-400 text-center py-8">No data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;
