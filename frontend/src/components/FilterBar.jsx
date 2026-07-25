const CATEGORIES = [
  ' ',
  'SWE',
  'ML/AI',
  'DS',
  'DA',
  'Cyber',
  'Cloud',
  'DevOps',
  'QA',
  'PM',
  'UX/UI',
  'Mktg',
  'Sales',
  'Fin',
  'Acct',
  'HR',
  'Ops',
  'SCM',
  'Consult',
  'CS',
  'Health',
  'Edu',
  'Research',
  'Legal',
  'Mfg',
  'Constr',
  'Gov',
  'Hospitality',
  'Retail',
  'Other'
];
const STATUSES = ['All', 'submitted', 'callback', 'interviewing', 'offer', 'rejected'];

function FilterBar({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap gap-3">
      <input
        name="company"
        placeholder="Filter by company..."
        value={filters.company}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-[140px]"
      />
      <input
        name="role"
        placeholder="Filter by role..."
        value={filters.role}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-[140px]"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
