
'use client';

export default function DeploymentStats({ deployments }) {
  // Calculate stats
  const totalDeployments = deployments.length;
  const successfulDeployments = deployments.filter(d => d.status === 'success').length;
  const failedDeployments = deployments.filter(d => d.status === 'failed').length;
  const inProgressDeployments = deployments.filter(d => d.status === 'in_progress').length;
  
  const successRate = totalDeployments > 0 
    ? Math.round((successfulDeployments / totalDeployments) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="stat-card">
        <h3 className="text-lg text-gray-400 mb-2">Total Deployments</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">{totalDeployments}</span>
          <span className="text-green-400 ml-2 text-sm">+12% today</span>
        </div>
        <div className="mt-4 h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
      
      <div className="stat-card">
        <h3 className="text-lg text-gray-400 mb-2">Success Rate</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">{successRate}%</span>
          <span className={`ml-2 text-sm ${successRate >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
            {successRate >= 80 ? 'Excellent' : 'Needs improvement'}
          </span>
        </div>
        <div className="mt-4 h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-green-500 rounded-full" style={{ width: `${successRate}%` }}></div>
        </div>
      </div>
      
      <div className="stat-card">
        <h3 className="text-lg text-gray-400 mb-2">Active Deployments</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">{inProgressDeployments}</span>
          <span className="text-blue-400 ml-2 text-sm">In progress</span>
        </div>
        <div className="mt-4 h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-yellow-500 rounded-full animate-pulse" style={{ width: `${(inProgressDeployments / totalDeployments) * 100}%` }}></div>
        </div>
      </div>
      
      <div className="stat-card">
        <h3 className="text-lg text-gray-400 mb-2">Failed Deployments</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">{failedDeployments}</span>
          <span className="text-red-400 ml-2 text-sm">Needs attention</span>
        </div>
        <div className="mt-4 h-2 bg-gray-700 rounded-full">
          <div className="h-2 bg-red-500 rounded-full" style={{ width: `${(failedDeployments / totalDeployments) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}
