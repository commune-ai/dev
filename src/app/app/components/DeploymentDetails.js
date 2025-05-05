import { useState } from 'react';

export default function DeploymentDetails({ deployment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!deployment) return null;
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-750"
        onClick={toggleExpand}
      >
        <h3 className="text-xl font-semibold text-white">
          Deployment Details
          <span className={`ml-2 text-sm ${deployment.status === 'success' ? 'text-green-400' : deployment.status === 'in_progress' ? 'text-yellow-400' : 'text-red-400'}`}>
            ({deployment.status === 'success' ? 'Successful' : deployment.status === 'in_progress' ? 'In Progress' : 'Failed'})
          </span>
        </h3>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-gray-400 mb-2">Basic Information</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500">Project:</span>
                  <span className="text-white font-medium">{deployment.projectName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Deployed by:</span>
                  <span className="text-white font-medium">@{deployment.username}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Environment:</span>
                  <span className="text-white font-medium">{deployment.environment}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="text-white font-medium">{deployment.duration}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Deployed at:</span>
                  <span className="text-white font-medium">{formatDate(deployment.deployedAt)}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-400 mb-2">Deployment Logs</h4>
              <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300 h-48 overflow-y-auto">
                {deployment.status === 'success' ? (
                  <>
                    <p className="text-green-400">[INFO] Starting deployment process...</p>
                    <p className="text-gray-400">[INFO] Pulling latest changes from repository</p>
                    <p className="text-gray-400">[INFO] Installing dependencies...</p>
                    <p className="text-gray-400">[INFO] Running build process...</p>
                    <p className="text-gray-400">[INFO] Optimizing assets...</p>
                    <p className="text-gray-400">[INFO] Running tests...</p>
                    <p className="text-gray-400">[INFO] Tests completed successfully</p>
                    <p className="text-gray-400">[INFO] Deploying to {deployment.environment}...</p>
                    <p className="text-green-400">[SUCCESS] Deployment completed successfully!</p>
                    <p className="text-gray-400">[INFO] Cleaning up temporary files...</p>
                    <p className="text-gray-400">[INFO] Deployment process finished in {deployment.duration}</p>
                  </>
                ) : deployment.status === 'in_progress' ? (
                  <>
                    <p className="text-blue-400">[INFO] Starting deployment process...</p>
                    <p className="text-gray-400">[INFO] Pulling latest changes from repository</p>
                    <p className="text-gray-400">[INFO] Installing dependencies...</p>
                    <p className="text-yellow-400">[INFO] Running build process...</p>
                    <p className="text-yellow-400">[INFO] Build in progress...</p>
                  </>
                ) : (
                  <>
                    <p className="text-blue-400">[INFO] Starting deployment process...</p>
                    <p className="text-gray-400">[INFO] Pulling latest changes from repository</p>
                    <p className="text-gray-400">[INFO] Installing dependencies...</p>
                    <p className="text-gray-400">[INFO] Running build process...</p>
                    <p className="text-red-400">[ERROR] Build failed: Syntax error in module</p>
                    <p className="text-red-400">[ERROR] Cannot resolve dependency 'react-chartjs'</p>
                    <p className="text-red-400">[FAILED] Deployment failed after {deployment.duration}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-gray-400 mb-2">Actions</h4>
            <div className="flex space-x-3">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition duration-300">
                View Full Logs
              </button>
              {deployment.status === 'failed' && (
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition duration-300">
                  Retry Deployment
                </button>
              )}
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition duration-300">
                Compare with Previous
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
