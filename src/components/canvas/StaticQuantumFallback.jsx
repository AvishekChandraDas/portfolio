import React from 'react';

const StaticQuantumFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-white relative">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full mx-auto animate-pulse"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-4 shadow-lg shadow-purple-500/30 animate-bounce"></div>
          <p className="text-lg font-semibold mb-2">Quantum Computing</p>
          <p className="text-sm opacity-70 mb-4">Advanced 3D Visualization</p>
          
          {/* Simple animated elements */}
          <div className="flex justify-center space-x-4 mt-6">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticQuantumFallback;
