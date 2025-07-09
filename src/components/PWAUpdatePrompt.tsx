import React, { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdatePrompt: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowUpdatePrompt(false);
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    setNeedRefresh(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <RefreshCw className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm">Atualização Disponível</h3>
              <p className="text-blue-700 text-xs">Nova versão do app disponível</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleDismiss}
            className="flex-1 px-3 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
          >
            Depois
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;