import ApplicationCard from './ApplicationCard';

function ApplicationList({ applications, onStatusChange, onDelete }) {
  if (applications.length === 0) {
    return <p className="text-gray-400 text-center py-8">No applications yet. Add your first one above.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ApplicationList;
