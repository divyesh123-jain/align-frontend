import { useState, useEffect } from 'react';
import Timer from '../shared/Timer';

function PollVote({ poll, onVote }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeExpired, setTimeExpired] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onVote(selectedOption);
    }
  };

  const handleTimerEnd = () => {
    setTimeExpired(true);
    onVote(selectedOption !== null ? selectedOption : -1);
  };


  useEffect(() => {
    if (timeExpired && selectedOption === null) {
      const timer = setTimeout(() => {
        onVote(-1); // Submit as "no answer"
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeExpired, selectedOption, onVote]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl">
        <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Live Poll</h2>
              <Timer 
                initialSeconds={poll.duration || 60} 
                onTimerEnd={handleTimerEnd}
              />
            </div>
          
          <div className="p-4 bg-gray-600 text-white rounded-lg mb-6">
            <p className="text-lg">{poll.question}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {poll.options.map((option, index) => (
            <div
              key={index}
              onClick={() => !timeExpired && setSelectedOption(index)}
              className={`flex items-center p-4 border-2 rounded-lg transition-all duration-200 ${
                timeExpired 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'
              } ${
                selectedOption === index
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 hover:border-violet-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                selectedOption === index
                  ? 'border-violet-500 bg-violet-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-800 font-medium">
                {typeof option === 'string' ? option : option.text}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || timeExpired}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
              selectedOption !== null && !timeExpired
                ? 'bg-violet-600 text-white hover:bg-violet-700 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {timeExpired ? 'Time Expired' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollVote; 