import { useState } from 'react';
import AddForm from './AddForm';
import FilterBar from './FilterBar';
import ApplicationList from './ApplicationList';

function ApplicationsPage({ applications, onAdd, onStatusChange, onDelete }) {
  const [filters, setFilters] = useState({ company: '', role: '', category: 'All', status: 'All' });

  const filtered = applications.filter((app) => {
    if (filters.company && !app.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    if (filters.role && !app.role.toLowerCase().includes(filters.role.toLowerCase())) return false;
    if (filters.category !== 'All' && app.category !== filters.category) return false;
    if (filters.status !== 'All' && app.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <AddForm onAdd={onAdd} />
      <FilterBar filters={filters} onChange={setFilters} />
      <p className="text-sm font-medium text-purple-600 bg-purple-50 rounded-full px-4 py-1.5 w-fit">
        📋 {filtered.length} of {applications.length} applications
      </p>
      <ApplicationList applications={filtered} onStatusChange={onStatusChange} onDelete={onDelete} />
    </div>
  );
}

export default ApplicationsPage;
