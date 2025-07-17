import { useState, useEffect } from 'react';

function WaitingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="badge mb-8">
          <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
          <span>Intervue Poll</span>
        </div>
        
        <div className="mb-6">
          <div className="w-12 h-12 mx-auto border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Waiting for teacher{dots}
        </h1>
        
        <p className="text-gray-600 max-w-md mx-auto">
          You'll be able to answer questions as soon as the teacher starts a poll. 
          Stay tuned for the next question!
        </p>
      </div>
    </div>
  );
}

export default WaitingScreen;