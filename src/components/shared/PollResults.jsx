function PollResults({ poll }) {
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="badge mb-6">
            <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
            <span>Intervue Poll</span>
          </div>
        </div>

        <div className="flex justify-end mb-12">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-medium hover:from-purple-600 hover:to-purple-700 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>View Poll history</span>
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Question</h2>
          <div className="bg-gray-700 text-white p-4 rounded-lg">
            <p className="text-lg font-medium">{poll.question}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8" 
             style={{ 
               width: '678px', 
               margin: '0 auto',
               borderRadius: '6px',
               border: '1.5px solid #e5e7eb',
               paddingTop: '26px',
               paddingRight: '21px',
               paddingBottom: '26px',
               paddingLeft: '21px'
             }}>
          <div className="space-y-2.5">
            {poll.options.map((option, index) => {
              const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(0) : 0;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900 font-medium">{option.text}</span>
                      <span className="text-gray-900 font-semibold">{percentage}%</span>
                    </div>
                    
                    <div className="relative w-full bg-gray-200 rounded" style={{ height: '55px', borderRadius: '6px' }}>
                      <div 
                        className="h-full rounded flex items-center justify-center transition-all duration-700 ease-out"
                        style={{ 
                          width: `${Math.max(percentage, 0)}%`,
                          background: '#6766D5',
                          borderRadius: '6px'
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 text-white rounded-full font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, #7765DA 0%, #5767D0 100%)',
              borderRadius: '50px'
            }}
          >
            + Ask a new question
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollResults;