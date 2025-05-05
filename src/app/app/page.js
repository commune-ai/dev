
'use client';

import { useState, useEffect } from 'react';
import DeploymentList from './components/DeploymentList';
import Header from './components/Header';
import Footer from './components/Footer';
import DeploymentStats from './components/DeploymentStats';

export default function Home() {
  const [deployments, setDeployments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching deployment data
    const fetchDeployments = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setDeployments([
          {
            id: 1,
            username: 'sarah_dev',
            projectName: 'E-commerce Platform',
            deployedAt: new Date(Date.now() - 120000).toISOString(),
            status: 'success',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            environment: 'production',
            duration: '1m 45s',
          },
          {
            id: 2,
            username: 'crypto_wizard',
            projectName: 'Blockchain Explorer',
            deployedAt: new Date(Date.now() - 300000).toISOString(),
            status: 'success',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            environment: 'staging',
            duration: '2m 12s',
          },
          {
            id: 3,
            username: 'dev_ninja',
            projectName: 'AI Image Generator',
            deployedAt: new Date(Date.now() - 600000).toISOString(),
            status: 'in_progress',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            environment: 'development',
            duration: '3m 10s',
          },
          {
            id: 4,
            username: 'code_master',
            projectName: 'Task Management App',
            deployedAt: new Date(Date.now() - 1200000).toISOString(),
            status: 'failed',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
            environment: 'production',
            duration: '0m 58s',
          },
          {
            id: 5,
            username: 'web3_enthusiast',
            projectName: 'NFT Marketplace',
            deployedAt: new Date(Date.now() - 1800000).toISOString(),
            status: 'success',
            avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
            environment: 'production',
            duration: '4m 22s',
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchDeployments();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Live Deployment Dashboard
        </h1>
        
        <DeploymentStats deployments={deployments} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">Recent Deployments</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DeploymentList deployments={deployments} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
