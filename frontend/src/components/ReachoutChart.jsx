import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function ReachoutChart({ reachouts }) {
  const total = reachouts.length;
  const responded = reachouts.filter((r) => r.got_response).length;

  const data = [
    { label: 'Reached Out', count: total },
    { label: 'Got Response', count: responded },
  ];

  return (
    <div className="max-w-xs mx-auto">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="40%">
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
            <Cell fill="#60a5fa" />
            <Cell fill="#34d399" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReachoutChart;
