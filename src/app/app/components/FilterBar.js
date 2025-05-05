import { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    status: 'all',
    environment: 'all'
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex items-center">
        <span className="text-gray-400 mr-2">Status:</span>
        <select
          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="success">Successful</option>
          <option value="in_progress">In Progress</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <span className="text-gray-400 mr-2">Environment:</span>
        <select
          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.environment}
          onChange={(e) => handleFilterChange('environment', e.target.value)}
        >
          <option value="all">All Environments</option>
          <option value="production">Production</option>
          <option value="staging">Staging</option>
          <option value="development">Development</option>
        </select>
      </div>
      
      <div className="flex items-center ml-auto">
        <span className="text-gray-400 mr-2">Sort by:</span>
        <select
          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          defaultValue="newest"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
  );
}
