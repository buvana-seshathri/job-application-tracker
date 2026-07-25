import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const STATUS_ORDER = ['submitted', 'callback', 'interviewing', 'offer', 'rejected'];
const STATUS_COLORS = {
  submitted: '#60a5fa',
  callback: '#a78bfa',
  interviewing: '#fbbf24',
  offer: '#34d399',
  rejected: '#f87171',
};

function StatusBarChart({ applications }) {
  const data = STATUS_ORDER.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="status" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.status} fill={STATUS_COLORS[d.status]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatusBarChart;
