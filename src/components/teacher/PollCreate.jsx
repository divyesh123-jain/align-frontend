import { useState } from 'react';

function PollCreate({ onCreatePoll }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [duration, setDuration] = useState(60);

  const durationOptions = [
    { label: '30 seconds', value: 30 },
    { label: '60 seconds', value: 60 },
    { label: '120 seconds', value: 120 },
    { label: '300 seconds', value: 300 }
  ];

  const handleAddOption = () => {
    if(options.length < 5) setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index, isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers([...correctAnswers, index]);
    } else {
      setCorrectAnswers(correctAnswers.filter(i => i !== index));
    }
  };

  const handleCreateClick = () => {
    if (question.trim() && options.every(o => o.trim()) && correctAnswers.length > 0) {
      onCreatePoll({ 
        question, 
        options: options.map(text => ({ text, votes: 0 })), 
        correctAnswers,
        duration
      });
    } else {
      alert("Please fill out the question, all option fields, and mark at least one correct answer.");
    }
  };

  return (
    <div className="min-h-screen bg-light-gray py-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8" style={{ maxWidth: '759px' }}>
          <div className="badge mb-4">
            <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
            <span>Intervue Poll</span>
          </div>
          <h1 className="poll-create-heading mb-3">
            Let's Get Started
          </h1>
          <p className="poll-create-subheading">
            you'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
          </p>
        </div>

        <div className="">
          <div className="">
            <div className="flex items-start justify-between mb-8" style={{ maxWidth: '865px' }}>
              <div className="flex-1 mr-8">
                <label className="block text-dark-gray font-semibold mb-3 text-lg">Enter your question</label>
                <textarea
                  placeholder="Rahul Bajaj"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="poll-textarea w-full"
                  rows="4"
                  maxLength="100"
                />
                <div className="text-right text-sm text-medium-gray mt-2">
                  {question.length}/100
                </div>
              </div>
              <div className="flex items-center ">
                <div className="timer-dropdown">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="timer-select"
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="timer-dropdown-arrow">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div style={{ maxWidth: '507px' }}>
                <h3 className="text-lg font-semibold text-dark-gray mb-6">Edit Options</h3>
                <div className="space-y-4">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="option-number-badge">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        placeholder="Rahul Bajaj"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="option-input flex-1"
                      />
                    </div>
                  ))}
                  <button onClick={handleAddOption} className="poll-create-add-option-btn">
                    <span>+ Add More option</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-gray mb-6">Is it Correct?</h3>
                <div className="space-y-4">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center" style={{height: '50px'}}>
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={correctAnswers.includes(index)}
                            onChange={() => handleCorrectAnswerChange(index, true)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-dark-gray">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={!correctAnswers.includes(index)}
                            onChange={() => handleCorrectAnswerChange(index, false)}
                            className="custom-radio"
                          />
                          <span className="text-sm text-dark-gray">No</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="poll-create-footer px-8 py-4">
            <div className="flex justify-end">
              <button onClick={handleCreateClick} className="poll-create-ask-btn">
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollCreate;