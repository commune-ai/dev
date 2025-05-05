
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DeploymentList({ deployments }) {
  const [liveDeployments, setLiveDeployments] = useState(deployments);

  // Simulate new deployments coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const newDeployment = {
        id: Date.now(),
        username: ['dev_guru', 'code_wizard', 'tech_ninja', 'web_master', 'cloud_expert'][
          Math.floor(Math.random() * 5)
        ],
        projectName: [
          'Social Media App', 
          'Crypto Wallet', 
          'Weather Tracker', 
          'Video Streaming Service',
          'Chat Application'
        ][Math.floor(Math.random() * 5)],
        deployedAt: new Date().toISOString(),
        status: ['success', 'in_progress', 'failed'][Math.floor(Math.random() * 3)],
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        environment: ['production', 'staging', 'development'][Math.floor(Math.random() * 3)],
        duration: `${Math.floor(Math.random() * 5)}m ${Math.floor(Math.random() * 60)}s`,
      };
      
      setLiveDeployments(prev => [newDeployment, ...prev.slice(0, 9)]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (status) => {
    switch(status) {
      case 'success': return 'status-success';
      case 'in_progress': return 'status-in-progress';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  const getEnvironmentClass = (env) => {
    switch(env) {
      case 'production': return 'environment-production';
      case 'staging': return 'environment-staging';
      case 'development': return 'environment-development';
      default: return '';
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    return `${Math.floor(diffSeconds / 86400)} days ago`;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {liveDeployments.map((deployment) => (
        <div 
          key={deployment.id} 
          className="deploy-card bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-12 h-12 mr-4">
                <Image 
                  src={deployment.avatar} 
                  alt={deployment.username}
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  deployment.status === 'success' ? 'bg-green-500' : 
                  deployment.status === 'in_progress' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{deployment.projectName}</h3>
                <p className="text-gray-400">by @{deployment.username}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <span className={`status-badge ${getStatusClass(deployment.status)}`}>
                {deployment.status === 'success' ? 'Successful' : 
                 deployment.status === 'in_progress' ? 'In Progress' : 'Failed'}
              </span>
              <span className={`environment-badge ${getEnvironmentClass(deployment.environment)}`}>
                {deployment.environment}
              </span>
              <span className="text-gray-400 text-sm">{formatTime(deployment.deployedAt)}</span>
              <span className="text-gray-400 text-sm">Duration: {deployment.duration}</span>
            </div>
          </div>
          
          {deployment.status === 'in_progress' && (
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
