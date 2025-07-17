function PollHistory({ pollHistory, onBack }) {
  if (pollHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Poll History</h1>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back to Current Poll
              </button>
            )}
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Poll History Yet</h2>
            <p className="text-gray-600">
              Once you create and complete polls, they will appear here for future reference.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Poll History</h1>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Back to Current Poll
            </button>
          )}
        </div>
        
        <div className="space-y-8">
          {pollHistory.map((poll, pollIndex) => (
            <div key={pollIndex} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Question {pollIndex + 1}
                </h2>
                <div className="text-sm text-gray-500">
                  {new Date(poll.createdAt || Date.now()).toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 bg-gray-600 text-white rounded-lg mb-6">
                <p className="text-lg">{poll.question}</p>
              </div>
              
              <div className="space-y-4">
                {poll.options.map((option, index) => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                  const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(0) : 0;
                  
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-sm mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-800 font-medium">{option.text}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600 font-medium">{percentage}%</span>
                            <span className="text-sm text-gray-500">({option.votes} votes)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8">
                          <div 
                            className="bg-violet-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          >
                            {option.votes > 0 && option.votes}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Responses: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}</span>
                  <span>Duration: {poll.duration || 60} seconds</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PollHistory; 