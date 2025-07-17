import { useState } from 'react';

function NameEntry({ onJoin }) {
  const [name, setName] = useState('');

  const handleJoinClick = () => {
    if (name.trim()) onJoin(name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="">
        <div className="text-center mb-8">
          <div className="badge mb-6">
            <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
            <span className="font-bold">Intervue Poll</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Get Started
          </h1>
          
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            If you're a student, you'll be able to <span className="font-bold text-gray-700">submit your answers</span>, <span className="font-bold text-gray-700">participate in live polls</span>, and <span className="font-bold text-gray-700">see how your responses compare with your classmates</span>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-center">
              Enter your Name
            </label>
            <input
              type="text"
              placeholder="Rahul Bajaj"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinClick()}
              className="w-full px-6 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-center text-lg"
            />
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={handleJoinClick} 
              disabled={!name.trim()}
              className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                name.trim()
                  ? 'bg-violet-600 text-white hover:bg-violet-700 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameEntry;