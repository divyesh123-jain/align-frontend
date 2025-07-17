import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="main-container flex items-center justify-center">
        <div className="w-full max-w-4xl p-10">
          <div className="text-center mb-12">
            <div className="badge mb-8">
              <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
              <span>Intervue Poll</span>
            </div>
            
            <div className="text-container mb-6">
              <h1 className="main-heading text-dark-gray">
                Welcome to the <span className="font-bold">Live Polling System</span>
              </h1>
            </div>
            
            <div className="text-container mb-12">
              <p className="sub-text text-lg">
                Please select the role that best describes you to begin using the live polling system
              </p>
            </div>
          </div>

          <div className="flex gap-6 mb-12 max-w-4xl mx-auto">
            <div 
              onClick={() => setSelectedRole('student')}
              className={`card flex-1 ${
                selectedRole === 'student' ? 'selected' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-dark-gray">
                    I'm a Student
                  </h3>
                  <p className="text-sm leading-relaxed text-medium-gray">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setSelectedRole('teacher')}
              className={`card flex-1 ${
                selectedRole === 'teacher' ? 'selected' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-dark-gray">
                    I'm a Teacher
                  </h3>
                  <div className="text-sm leading-relaxed">
                    <span className="text-secondary-purple">Submit answers</span>
                    <span className="text-medium-gray"> and view live poll results in real-time.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`btn-primary ${!selectedRole ? 'opacity-50' : ''}`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;