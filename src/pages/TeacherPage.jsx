import { useState, useEffect } from 'react';
import { socket } from '../socket';
import PollCreate from '../components/teacher/PollCreate';
import PollResults from '../components/shared/PollResults';
import WaitingScreen from '../components/shared/WaitingScreen';
import PollHistory from '../components/shared/PollHistory';
import Chat from '../components/shared/Chat';

function TeacherPage() {
  const [currentView, setCurrentView] = useState('create');
  const [currentPoll, setCurrentPoll] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [pollHistory, setPollHistory] = useState([]);

  useEffect(() => {
    if (socket.connected) {
      socket.emit('identify_user', 'teacher');
    } else {
      socket.on('connect', () => {
        socket.emit('identify_user', 'teacher');
      });
    }

    socket.on('poll_started', (poll) => {
      setCurrentPoll(poll);
      setCurrentView('results');
    });

    socket.on('poll_results', (poll) => {
      setCurrentPoll(poll);
    });

    socket.on('poll_ended', (poll) => {
      setCurrentPoll(poll);
      setTimeout(() => {
        setCurrentView('create');
        setCurrentPoll(null);
      }, 3000);
    });

    socket.on('participants_updated', (participantList) => {
      setParticipants(participantList);
    });

    socket.on('poll_history', (history) => {
      setPollHistory(history);
    });

    return () => {
      socket.off('poll_started');
      socket.off('poll_results');
      socket.off('poll_ended');
      socket.off('participants_updated');
      socket.off('poll_history');
      socket.off('connect');
    };
  }, []);

  const handleCreatePoll = (pollData) => {
    socket.emit('create_poll', pollData);
  };

  const handleEndPoll = () => {
    socket.emit('end_poll');
  };

  const handleKickParticipant = (participantName) => {
    socket.emit('kick_participant', participantName);
  };

  // const handleViewHistory = () => {
  //   socket.emit('get_poll_history');
  //   setCurrentView('history');
  // };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return <PollCreate onCreatePoll={handleCreatePoll} />;
      case 'results':
        return (
          <PollResults
            poll={currentPoll}
            participants={participants}
            onEndPoll={handleEndPoll}
            onKickParticipant={handleKickParticipant}
            userType="teacher"
          />
        );
      case 'history':
        return <PollHistory history={pollHistory} />;
      default:
        return <PollCreate onCreatePoll={handleCreatePoll} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {renderCurrentView()}
      </main>

      <Chat 
        userType="teacher" 
        userName="Teacher" 
        participants={participants}
        onKickParticipant={handleKickParticipant}
      />
    </div>
  );
}

export default TeacherPage;