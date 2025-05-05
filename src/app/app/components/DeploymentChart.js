'use client';

import { useEffect, useRef } from 'react';

export default function DeploymentChart({ deployments }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !deployments?.length) return;
    
    // This is a placeholder for chart rendering
    // In a real implementation, you would use Chart.js or another library
    const ctx = canvasRef.current.getContext('2d');
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i < 5; i++) {
      const y = 30 + i * (height - 60) / 4;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }
    
    // Calculate data points
    const successCount = deployments.filter(d => d.status === 'success').length;
    const failedCount = deployments.filter(d => d.status === 'failed').length;
    const inProgressCount = deployments.filter(d => d.status === 'in_progress').length;
    
    const total = successCount + failedCount + inProgressCount;
    const successRatio = total > 0 ? successCount / total : 0;
    const failedRatio = total > 0 ? failedCount / total : 0;
    const inProgressRatio = total > 0 ? inProgressCount / total : 0;
    
    // Draw bars
    const barWidth = 60;
    const spacing = 40;
    const startX = (width - (barWidth * 3 + spacing * 2)) / 2;
    
    // Success bar
    ctx.fillStyle = '#10B981';
    const successHeight = (height - 60) * successRatio;
    ctx.fillRect(startX, height - 30 - successHeight, barWidth, successHeight);
    
    // In Progress bar
    ctx.fillStyle = '#F59E0B';
    const inProgressHeight = (height - 60) * inProgressRatio;
    ctx.fillRect(startX + barWidth + spacing, height - 30 - inProgressHeight, barWidth, inProgressHeight);
    
    // Failed bar
    ctx.fillStyle = '#EF4444';
    const failedHeight = (height - 60) * failedRatio;
    ctx.fillRect(startX + (barWidth + spacing) * 2, height - 30 - failedHeight, barWidth, failedHeight);
    
    // Draw labels
    ctx.fillStyle = '#D1D5DB';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    ctx.fillText('Success', startX + barWidth / 2, height - 10);
    ctx.fillText('In Progress', startX + barWidth + spacing + barWidth / 2, height - 10);
    ctx.fillText('Failed', startX + (barWidth + spacing) * 2 + barWidth / 2, height - 10);
    
    // Draw values
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px sans-serif';
    
    ctx.fillText(successCount, startX + barWidth / 2, height - 40 - successHeight);
    ctx.fillText(inProgressCount, startX + barWidth + spacing + barWidth / 2, height - 40 - inProgressHeight);
    ctx.fillText(failedCount, startX + (barWidth + spacing) * 2 + barWidth / 2, height - 40 - failedHeight);
    
  }, [deployments]);
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
      <h3 className="text-lg text-white font-semibold mb-4">Deployment Statistics</h3>
      <canvas 
        ref={canvasRef} 
        width="500" 
        height="300"
        className="w-full h-64"
      ></canvas>
      <div className="flex justify-center mt-4 text-sm text-gray-400">
        <span className="flex items-center mr-4">
          <span className="h-3 w-3 bg-green-500 rounded-full mr-1"></span>
          Success
        </span>
        <span className="flex items-center mr-4">
          <span className="h-3 w-3 bg-yellow-500 rounded-full mr-1"></span>
          In Progress
        </span>
        <span className="flex items-center">
          <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
          Failed
        </span>
      </div>
    </div>
  );
}
